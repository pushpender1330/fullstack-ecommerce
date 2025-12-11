import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Entity()
export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @ManyToOne(()=>Product,product => product.cartItems,{onDelete:'CASCADE'})
    product: Product;

    @ManyToOne(()=>Cart,cart => cart.cartItems,{onDelete:'CASCADE'})
    cart:Cart;

    @Column({default: 1})
    quantity: number;
}