import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { AdminGuard } from "src/guards/admin.guard";
import { ProductService } from "./products.service";
import { createProductDTO } from "./dto/product.dto";
import { SoftAuthGuard } from "src/guards/softauth.guard";

@Controller('products')
export class ProductsController{

    constructor(
      private productService: ProductService
    ){}


    @UseGuards(AuthGuard,AdminGuard)
    @Post()
    addProduct(@Body() product: createProductDTO){
      return this.productService.addProduct(product);  
    }

    @UseGuards(SoftAuthGuard)
    @Get()
    getUserProducts(@Req() req: any){
      if(!req?.user){
        return this.productService.getUserProducts(null);

      }
        return this.productService.getUserProducts(req?.user?.userId);
    }

}