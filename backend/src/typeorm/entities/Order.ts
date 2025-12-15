import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@Entity()
export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>OrderItem,orderItem=>orderItem.order)
    orderItem: OrderItem[];

    @ManyToOne(()=> User,user=>user.orders,{onDelete: 'CASCADE'})
    user: User;

    @Column({default: 0})
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}