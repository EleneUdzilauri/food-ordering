import { Product } from "./product.model";

export interface Cart {
    items: Array<CartItem>;
}

export interface CartItem {
    product: Product;
    name: string;
    price: number;
    quantity: number;
    id: number;
}