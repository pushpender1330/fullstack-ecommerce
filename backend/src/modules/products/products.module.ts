import { forwardRef, Module } from "@nestjs/common";
import { ProductService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/typeorm/entities/Product";
import { CartModule } from "../cart/cart.module";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([Product]),forwardRef(()=>CartModule),AuthModule],
    controllers:[ProductsController],
    providers:[ProductService],
    exports:[ProductService]
})
export class ProductsModule{}