import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

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

  getAllFiltered(categoryValues: {}[]): Observable<Array<Product>> {

    const getFilteredEndpoint = () => {
     
      let result: Array<any> = [];
      let res = '';
      if(categoryValues.length === 1) {
        categoryValues.map((categoryValues) => {
          for (const [key, value] of Object.entries(categoryValues)) {
            res = `${key}=${value}`;
          }
        })
        
        return res
      }else {
        categoryValues.map((arr, i) => {
          for (const [key, value] of Object.entries(arr)) {
            if(i === 0) {
              result.push(`${key}=${value}`)
            }else {
              result.push(`&${key}=${value}`)

            }
          }
        })
        return result.join('')
      }
    }

    
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/Products/GetFiltered?${getFilteredEndpoint()}`
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

}
