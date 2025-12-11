import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ManyToOne } from "typeorm/browser";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productName: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: number;
    
    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems: CartItem[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}