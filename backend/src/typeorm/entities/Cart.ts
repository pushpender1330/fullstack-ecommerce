import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { CartItem } from "./CartItem";
import { User } from "./User";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: 0})
    total: number;

    @OneToMany(() => CartItem,cartItem => cartItem.cart,{cascade: true})
    cartItems: CartItem[]

    @OneToOne(()=>User,user => user.cart,{onDelete:'CASCADE'})
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
