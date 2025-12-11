import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth.guard";
import { addToCartDTO } from "./dto/cart.dto";
import { CartServices } from "./cart.service";

@UseGuards(AuthGuard)
@Controller('cart')
export class CartController{

    constructor(private cartService : CartServices
    ){}

    @Post('add-to-cart')
    addToCart(@Body() addToCartBody: addToCartDTO,@Req() req:any){
      return this.cartService.addToCart(addToCartBody,req.user)
    }

    @Get('get-cart-items')
    getCart(@Req() req: any){
        return this.cartService.getUserCartDetails(req?.user?.userId);
    }

    @Patch('inc-quantity/:productId')
    increaseQuantity(@Req() req: any,@Param('productId') productId: string){
        return this.cartService.increaseProductQuantity({userId : req?.user?.userId, productId})
    }

    @Patch('dec-quantity/:productId')
    decreaseQuantity(@Req() req: any,@Param('productId') productId: string){
        return this.cartService.decreaseProductQuantity({userId : req?.user?.userId, productId})
    }

    @Delete('delete-product/:cartItemId')
    deleteCartItem(@Param('cartItemId') cartItemId: string,@Req() req: any){
        return this.cartService.removeProductFromCart({userId : req?.user?.userId,cartItemId});
    }
}