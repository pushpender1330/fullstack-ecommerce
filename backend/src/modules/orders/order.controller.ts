import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { OrderService } from "./order.service";

@Controller('orders')
@UseGuards(AuthGuard)
export class OrderController{

    constructor(private orderService: OrderService){}

    @Get()
    getUserOrders(@Req() req:any){
        return this.orderService.getUserOrder(req?.user);
    }

    @Post('place-order')
    placeOrder(@Req() req:any){
        return this.orderService.placeNewOrder(req?.user);
    }
    
}