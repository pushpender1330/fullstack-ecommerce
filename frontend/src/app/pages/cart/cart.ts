import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CartItem } from "../../components/cart-item/cart-item";
import { Products } from '../../service/products';
import { RouterLink } from "@angular/router";
import { Modal } from "../../components/modal/modal";
import { ModalService } from '../../service/modal-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cart as CartService } from '../../service/cart';
import { cartItemType, productType } from '../../models/product';

@Component({
  selector: 'app-cart',
  imports: [CartItem, RouterLink,Modal,FormsModule,ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnDestroy {
  constructor(private productService: Products, private cartService: CartService){}
  modalService = inject(ModalService)

  userDetailForm = new FormGroup({
    name: new FormControl<string>('',{validators:[Validators.required],nonNullable:true}),
    address: new FormControl<string>('',{validators:[Validators.required, Validators.minLength(8)],nonNullable: true}),
    contactNumber: new FormControl<string>('',{nonNullable:true,validators:[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('\[0-9]+')]})
  })

  orderPlaced = signal(false);
  cartProducts = signal<cartItemType[]>([])
  total = signal<number>(0);
  cartId = signal<string | null>(null);

  

  placeOrder(){
    if(this.userDetailForm.invalid){
      this.userDetailForm.markAllAsTouched();
      return;
    }
    const currentValues = this.userDetailForm.getRawValue();
    this.orderPlaced.set(true);
    this.cartService.clearCart();
  }

  resetForm(){
    this.orderPlaced.set(false);
    this.userDetailForm.reset();
  }

  getCartProducts(){
    return this.cartService.getProductsInCart().subscribe({
      next:(data)=>{
        this.cartProducts.set(data?.cartItems || []);
        this.total.set(data?.total);
        this.cartId.set(data?.id);
      }
    });
  }

  ngOnInit(){
    this.getCartProducts();
  }

  incQuantity(id: string){
    this.cartService.incQuantity(id).subscribe({
      next: () => {
        this.getCartProducts();
      }
    });
  }

  decQuantity(id: string){
    this.cartService.decQuantity(id).subscribe({
      next: () => {
        this.getCartProducts();
      }
    });
  }

  removeProductFromCart(cartId: string){
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.getCartProducts();
      }
    });
  }

  isModalOpen(){
    return this.modalService.modalOpen();
  }
  closeModal(){
    this.resetForm();
    this.modalService.closeModal();
  }
  openModal(){
    this.modalService.openModal();
  }

  ngOnDestroy(){
    this.modalService.closeModal();
  }
}
