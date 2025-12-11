import { Component, input, output } from '@angular/core';
import { productType } from '../../models/product';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.html',
  styleUrl: './cart-item.scss',
})
export class CartItem {
  productDetail = input.required<productType>();
  quantity = input.required<number>();
  cartId = input.required<string>();

  incQuantity = output<string>();
  decQuantity = output<string>();
  removeProductFromCart = output<string>();

  incQuantityEvent(){
    this.incQuantity.emit(this.productDetail().id);
  }

  decQuantityEvent(){
    this.decQuantity.emit(this.productDetail().id);
  }

  removeProduct(){
    this.removeProductFromCart.emit(this.cartId());
  }

}
