import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import queryString from 'query-string';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { CartItem } from '../models/cart.model';

const STORE_BASE_URL = 'https://restaurant.webwide.ge/api'

interface BasketItem {
  quantity: number,
  price: number,
  productId: number,
}


@Injectable({
  providedIn: 'root'
})
export class StoreService{

  constructor(private httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort='desc'): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/Products/GetAll`
    )
  }

  getAllCategories(): Observable<Array<Category>> {
    return this.httpClient.get<Array<Category>>(
      `${STORE_BASE_URL}/Categories/GetAll`
    )
  }

  getAllFiltered(categoryValues: {}): Observable<Array<Product>> {

    
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/Products/GetFiltered?${queryString.stringify(categoryValues)}`
    )
  }

  getFilteredByCategory(categoryId: number): Observable<Array<Product>> {

    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/Products/GetFiltered?categoryId=${categoryId}`
    )
  }


  addToBasket(item: BasketItem): Observable<BasketItem> {
    return this.httpClient.post<BasketItem>(
      `${STORE_BASE_URL}/Baskets/AddToBasket`, item
    )
  }

  getCartItems(): Observable<Array<CartItem>> {
    return this.httpClient.get<Array<CartItem>>(
      `${STORE_BASE_URL}/Baskets/GetAll`
    )
  }

}
