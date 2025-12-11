import { Component, signal } from '@angular/core';
import { ProductCard } from "../../components/product-card/product-card";
import { productType } from '../../models/product';
import { Products } from '../../service/products';
import { Cart } from '../../service/cart';

@Component({
  selector: 'app-home',
  imports: [ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  
  constructor(private productService: Products, private cartService: Cart){
  }

  ngOnInit(){
    this.getProducts();
  }

  products = signal<productType[]>([])

  getProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products.set(data?.products);
      }
    })
  }

  addToCart(id: string){
    this.cartService.addToCart(id).subscribe({
      next: (data) => {
        this.getProducts();

      }
    });
  }

  incQuantity(id: string){
    this.cartService.incQuantity(id).subscribe({
      next: () => {
        this.getProducts();
      }
    });
  }

  decQuantity(id: string){
    this.cartService.decQuantity(id).subscribe({
      next: () => {
        this.getProducts();
      }
    });
  }

}
