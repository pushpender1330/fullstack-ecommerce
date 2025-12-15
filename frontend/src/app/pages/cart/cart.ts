import { Component, inject, OnDestroy, signal } from '@angular/core';
import { CartItem } from "../../components/cart-item/cart-item";
import { Products } from '../../service/products';
import { RouterLink } from "@angular/router";
import { Modal } from "../../components/modal/modal";
import { ModalService } from '../../service/modal-service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cart as CartService } from '../../service/cart';
import { cartItemType, productType } from '../../models/product';
import { Orders as OrderService } from '../../service/orders';

@Component({
  selector: 'app-cart',
  imports: [CartItem, RouterLink,Modal],
  providers:[ModalService],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnDestroy {
  constructor(private productService: Products, private cartService: CartService,private orderService: OrderService){}
  modalService = new ModalService()


  cartProducts = signal<cartItemType[]>([])
  total = signal<number>(0);
  cartId = signal<string | null>(null);

  

  placeOrder(){
    this.orderService.placeOrder().subscribe({
      next: data => {
        // this.orderPlaced.set(true);
        this.modalService.openModal();
        this.getCartProducts()
      },
      error: err => {

      }
    })
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
    this.modalService.closeModal();
  }
  openModal(){
    this.modalService.openModal();
  }


  ngOnDestroy(){
    // this.modalService.closeModal();
  }
}
