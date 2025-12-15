import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/typeorm/entities/Order";
import { Repository } from "typeorm";
import { CartServices } from "../cart/cart.service";
import { OrderItem } from "src/typeorm/entities/OrderItem";

@Injectable()
export class OrderService{
    constructor(@InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private cartService: CartServices){}

    async getUserOrder(user: any){
        try{
            if(!user){
                throw new UnauthorizedException('invalid request')
            }
            const {userId} = user;

            const order = await this.orderRepo.find({
                where: {
                    user : {
                        id: userId
                    }
                },
                relations: ['orderItem','orderItem.product']
            })

            return {
                order
            }


        }
        catch(err){
            throw err;
        }
    }

    async placeNewOrder(user: any){
        try{
            if(!user){
                throw new UnauthorizedException('invalid request')
            }
            const {userId} = user;

            const cart = await this.cartService.getCartByUserId({userID : userId});

            if (!cart || cart.cartItems.length === 0) {
                throw new BadRequestException('Cart is empty');
            }

            const newOrder = this.orderRepo.create({
                user:{
                    id: userId
                },
                orderItem: [],
                total : cart.total
            })

            const order = await this.orderRepo.save(newOrder);

            const cartItems = cart.cartItems.map(item => {
                return {
                    order,
                    product: item.product,
                    quantity: item.quantity
                }
            })

            const cartItem = await this.orderItemRepo.save(cartItems);

            await this.cartService.clearCart({cartId: cart.id})

            return {
                message: "order placed"
            }
            

        }
        catch(err){
            throw err;
        }
    }
}