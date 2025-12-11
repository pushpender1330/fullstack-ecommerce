import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>OrderItem,orderItem=>orderItem.order)
    orderItem: OrderItem;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}