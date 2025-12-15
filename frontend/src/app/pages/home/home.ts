import { Component, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { productType } from '../../models/product';
import { Products } from '../../service/products';
import { Cart } from '../../service/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  constructor(private productService: Products, private cartService: Cart,private toastr: ToastrService){
  }

  ngOnInit(){
    this.getProducts();
  }

  products = signal<productType[]>([])

  getProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data?.products);
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message)
      }
    })
  }

  addToCart(id: string){
    this.cartService.addToCart(id).subscribe({
      next: (data) => {
        this.getProducts();
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message)
      }
    });
  }

  incQuantity(id: string){
    this.cartService.incQuantity(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message)
      }
    });
  }

  decQuantity(id: string){
    this.cartService.decQuantity(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (err)=>{
        this.toastr.error(err?.error?.message)
      }
    });
  }

}
