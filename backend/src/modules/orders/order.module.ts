import { Controller, Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { Order } from "src/typeorm/entities/Order";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartModule } from "../cart/cart.module";
import { OrderItem } from "src/typeorm/entities/OrderItem";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports:[TypeOrmModule.forFeature([Order,OrderItem]),CartModule,AuthModule],
    controllers:[OrderController],
    providers: [OrderService]
})
export class OrderModule{}