import { ConflictException, forwardRef, Get, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Cart } from "src/typeorm/entities/Cart";
import { CartItem } from "src/typeorm/entities/CartItem";
import { Product } from "src/typeorm/entities/Product";
import { Repository } from "typeorm";
import { AddToCartType } from "./interfaces/type";
import { ProductService } from "../products/products.service";
import { User } from "src/typeorm/entities/User";

@Injectable()
export class CartServices {

    constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>,
        @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
        @Inject(forwardRef(() => ProductService)) private productService: ProductService
    ) { }

    async createCart({ userID }: { userID: string }) {
        let userCart = this.cartRepo.create({
            user: {
                id: userID
            },
            total: 0,
            cartItems: []
        })
        return this.cartRepo.save(userCart);
    }

    async saveCart({ cart }: {
        cart: Cart
    }) {
        return this.cartRepo.save(cart);
    }

    async getCartByUserId({ userID }: { userID: string }) {
        return this.cartRepo.findOne({
            where: {
                user: {
                    id: userID
                }
            },
            relations: ['user', 'cartItems', 'cartItems.product']
        });
    }

    async saveProductInCartItem(cartItem: CartItem) {
        return this.cartItemRepo.save(cartItem);
    }

    async clearCart({cartId}){
        try{

            await this.cartItemRepo.delete({ 
                cart:{
                    id: cartId
                }
             });
        }
        catch(err){
            throw err;
        }
    }

    async createNewCartItem({
        cart,
        product
    }: {
        cart: Cart,
        product: Product
    }) {
        const newCartItem = this.cartItemRepo.create({
            cart,
            product,
            quantity: 1
        })

        return this.cartItemRepo.save(newCartItem);
    }

    async addToCart(body: AddToCartType, userPayload: any) {
        try {
            const userID = userPayload.userId;
            const { productId } = body;

            let userCart = await this.getCartByUserId({
                userID
            })

            if (!userCart) {
                userCart = await this.createCart({
                    userID
                })
            }

            const product = await this.productService.findProductById(productId);

            if (!product) {
                throw new NotFoundException('Product not found');
            }

            const cartItems = userCart?.cartItems || [];
            const existingProduct = cartItems.find(item => item.product.id === productId);

            if (existingProduct) {
                throw new ConflictException('Item already exists in cart');
            }
            else {
                const cartItem = await this.createNewCartItem({
                    cart: userCart,
                    product,
                })

                userCart.cartItems = [...cartItems, cartItem]
            }

            let total = userCart?.cartItems?.reduce((sum, item) => {
                return sum + (item.product.price * item.quantity);
            }, 0)

            userCart.total = total;
            await this.saveCart({ cart: userCart });

            return {
                message: "item added successfully",
            }
        }
        catch (err) {
            if (err.status) {
                throw err;
            }
            console.log(err)
            throw new InternalServerErrorException();
        }
    }

    async getUserCartDetails(userID: string) {
        try {
            if (!userID) {
                throw new UnauthorizedException('User not found');
            }
            const cartDetail = await this.cartRepo.findOne({
                where: {
                    user: {
                        id: userID
                    }
                },
                relations: ['cartItems', 'cartItems.product']
            });
            return cartDetail;
        }
        catch (err) {
            if (err?.status) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    async increaseProductQuantity({
        productId,
        userId
    }: {
        productId: string,
        userId: string
    }) {
        try {
            const item = await this.cartItemRepo.findOne({
                where: {
                    product: {
                        id: productId
                    }
                }
            })

            if (!item) {
                throw new NotFoundException('item not exist in cart');
            }

            await this.cartItemRepo.increment({
                id: item.id
            },
                "quantity", 1)

            await this.updateCartTotal({userId});

            return {
                message: "Quantity increased"
            }

        }
        catch (err) {
            if (err.status) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

    async updateCartTotal({
        userId
    }: {
        userId: string
    }) {
        try {
            let cardDetail = await this.getUserCartDetails(userId);

            if (!cardDetail) {
                throw new NotFoundException('Cart Not found');
            }


            let total = cardDetail?.cartItems?.reduce((sum, curr) => {
                return sum + (curr.product.price * curr.quantity)
            }, 0)
            cardDetail.total = total;

            await this.saveCart({ cart: cardDetail });

            return;
        }
        catch (err) {
            throw err;
        }
    }

    async removeProductFromCart({
        userId,
        cartItemId
    }: {
        userId: string,
        cartItemId: string
    }) {
        try {
            const item = await this.cartItemRepo.findOne({
                where: {
                    id: cartItemId
                }
            })

            if (!item) {
                throw new NotFoundException('Invalid cart item')
            }
            await this.cartItemRepo.remove(item);

            await this.updateCartTotal({userId});

            return {
                message: "item item removed"
            }
        }
        catch (err) {
            throw err;
        }
    }

    async decreaseProductQuantity({
        productId,
        userId
    }: {
        productId: string,
        userId: string
    }) {
        try {
            const item = await this.cartItemRepo.findOne({
                where: {
                    product: {
                        id: productId
                    }
                }
            })


            if (!item) {
                throw new NotFoundException('item not exist in cart');
            }

            if (item.quantity <= 1) {
                await this.cartItemRepo.remove(item)
            }
            else {
                await this.cartItemRepo.decrement({
                    id: item.id
                }, "quantity", 1)
            }

            await this.updateCartTotal({userId});

            return {
                message: "Quantity increased",
            }

        }
        catch (err) {
            if (err.status) {
                throw err;
            }
            throw new InternalServerErrorException();
        }
    }

}