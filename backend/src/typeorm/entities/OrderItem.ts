import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Order,order=>order.orderItem,{onDelete:'CASCADE'})
    order: Order;

    @ManyToOne(()=>Product,product=> product.orderItems,{onDelete:'CASCADE'})
    product: Product;

    @Column()
    quantity : number;
}