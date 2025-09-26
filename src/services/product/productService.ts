import productsJson from "@/../public/data/products.json"
import type { Product } from "./product";

export function getProducts(): Product[] {
    return productsJson;
}

export function getProductById(id: number): Product | undefined {
    return productsJson.find(p => p.id === id);
}
