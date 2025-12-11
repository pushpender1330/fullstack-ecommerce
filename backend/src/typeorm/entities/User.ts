import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column()
    password: string

    @Column({unique: true})
    phoneNumber: string

    @Column()
    address: string

    @OneToOne(()=>Cart,cart => cart.user)
    cart: Cart;

    @Column({default: 'USER'})
    role: 'USER' | 'ADMIN';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}