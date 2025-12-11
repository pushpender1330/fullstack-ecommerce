import { forwardRef, Module } from "@nestjs/common";
import { CartServices } from "./cart.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/entities/Cart";
import { CartController } from "./cart.controller";
import { CartItem } from "src/typeorm/entities/CartItem";
import { ProductsModule } from "../products/products.module";

@Module({
    imports:[TypeOrmModule.forFeature([Cart,CartItem]),forwardRef(()=>ProductsModule)],
    controllers:[CartController],
    providers:[CartServices],
    exports:[CartServices]
})
export class CartModule{}