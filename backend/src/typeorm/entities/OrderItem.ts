import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";
import { User } from "./User";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Order,order=>order.orderItem)
    order: Order;

    @ManyToOne(()=>User)
    user: User;

    @Column()
    quantity : number;

    @OneToOne(()=>Product)
    product: Product;
}