import { inject, Injectable, signal } from '@angular/core';
import { addProductType, productType } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Products {

  baseUrl = 'http://localhost:3000'

  http = inject(HttpClient);

  getAllProducts(){
    return this.http.get<{
      products:productType[],
      message: string
    }>(`${this.baseUrl}/products`);
  }

  addProducts(product: addProductType){
    return this.http.post<{message: string}>(`${this.baseUrl}/products`,product);
  }

}
