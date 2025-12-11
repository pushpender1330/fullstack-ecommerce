import { IsNotEmpty, IsString } from "class-validator";

export class addToCartDTO {
    @IsNotEmpty()
    @IsString()
    productId: string;
}
