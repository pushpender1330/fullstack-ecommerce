import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { orderType } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class Orders {
  baseUrl = 'http://localhost:3000/orders'
  http = inject(HttpClient)

  getOrders(){
    return this.http.get<orderType>(this.baseUrl)
  }

  placeOrder(){
    return this.http.post(`${this.baseUrl}/place-order`,null)
  }
  
}
