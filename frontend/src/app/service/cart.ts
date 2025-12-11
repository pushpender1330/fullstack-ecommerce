import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { cartItemType, cartType, productType } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  baseUrl = 'http://localhost:3000/cart'
  http = inject(HttpClient);

  addToCart(id: string) {
    return this.http.post(`${this.baseUrl}/add-to-cart`,{
      productId: id
    })
  }

  clearCart(){
    
  }

  incQuantity(id: string) {
    return this.http.patch(`${this.baseUrl}/inc-quantity/${id}`,{})
  }

  decQuantity(id: string) {
    return this.http.patch(`${this.baseUrl}/dec-quantity/${id}`,{})
  }

  removeFromCart(cartId: string){
    return this.http.delete(`${this.baseUrl}/delete-product/${cartId}`);
  }

  getProductsInCart(){
    return this.http.get<cartType>(`${this.baseUrl}/get-cart-items`);
  }

  getTotalPrice(){

  }
  
}
