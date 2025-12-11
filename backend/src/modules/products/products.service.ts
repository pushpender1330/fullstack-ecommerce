import { forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/typeorm/entities/Product";
import { Repository } from "typeorm";
import { ProductType } from "./interfaces/type";
import { CartServices } from "../cart/cart.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @Inject(forwardRef(()=> CartServices)) private cartService: CartServices
    ){}

    async getAllProducts(){
        try{
            const products = await this.productRepo.find({
                select: {
                    id: true,
                    productName: true,
                    description: true,
                    image : true,
                    price: true,
                }
            })
            return {
                products,
                message: "success"
            };
        }
        catch(err){
            throw new InternalServerErrorException();
        }
    }

    async getUserProducts(userID: string|null){
        try{
            let products = await this.productRepo.find({
                select: {
                    id: true,
                    productName: true,
                    description: true,
                    image : true,
                    price: true,
                }
            })

            if(!userID){
                return {
                    products,
                    message: "success",
                };
            }

            const cart = await this.cartService.getCartByUserId({userID});
            const cartItems = cart?.cartItems || [];




            products = products?.map(product => {
                let isExist = cartItems?.find(item => item.product.id === product.id);
                if(isExist){
                    return {
                        ...product,
                        inCart: true,
                        quantity: isExist.quantity
                    }
                }
                return {...product, inCart: false,quantity:0}
            })

            return {
                products,
                message: "success",
                userID,
                cart
            };
        }
        catch(err){
            throw new InternalServerErrorException();
        }
    }

    async addProduct(product : ProductType){
        try{
            const newProduct = this.productRepo.create(product);
            await this.productRepo.save(newProduct)
            return {
                message : "product added successfully"
            }
        }
        catch(err){
            throw new InternalServerErrorException();
        }
    }

    async findProductById(productId: string){
        return this.productRepo.findOne({
            where:{
                id: productId
            }
        })
    }

}