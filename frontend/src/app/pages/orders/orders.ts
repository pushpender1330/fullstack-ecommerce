import { Component, signal } from '@angular/core';
import { Orders as orderService } from '../../service/orders';
import { orderType } from '../../models/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  imports: [],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {

  constructor(private orderService: orderService,private toastr:ToastrService){}

  ordersList = signal<orderType | null>(null)

  getOrders(){
    this.orderService.getOrders().subscribe({
      next: (data)=>{
        this.ordersList.set(data);
      },
      error:(err)=>{
        this.toastr.error(err?.error?.message);
      }
    })
  }

  ngOnInit(){
    this.getOrders();
  }

}
