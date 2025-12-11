import { Component, input, output } from '@angular/core';
import { productType } from '../../models/product';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  productDetail = input.required<productType>();

  addToCart = output<string>();

  decQuantity = output<string>();
  incQuantity = output<string>();

  addToCartClicked(id: string){
    this.addToCart.emit(id);
  }

  incProductQuantity(id: string){
    this.incQuantity.emit(id);
  }

  decProductQuantity(id: string){
    this.decQuantity.emit(id);
  }

}
