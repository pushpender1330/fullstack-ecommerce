export interface productType {
    id : string,
    productName : string,
    description : string,
    image : string,
    price: number,
    inCart: boolean,
    quantity:number,
}


export interface addProductType {
    productName : string,
    description : string,
    image : string,
    price: number,
}


export interface cartItemType {
        id: string,
        product:productType,
        quantity: number
    }


export interface cartType {
      id: string,
      total: number,
      cartItems: cartItemType[]
    }

export interface orderItemType{
    id: string;
    product: productType;
    quantity: number;
}

export interface orderType {
    order: {
        id: string;
        orderItem : orderItemType[];
        total: number;
    }[]
}