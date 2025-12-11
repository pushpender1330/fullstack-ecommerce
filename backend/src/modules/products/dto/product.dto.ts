import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class createProductDTO {
    @IsNotEmpty()
    @IsString()
    productName: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    @IsUrl()
    image: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}
