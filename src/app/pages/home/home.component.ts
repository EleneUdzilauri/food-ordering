import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROW_HEIGHT: { [id: number]: number} = { 1: 400, 3: 335, 4: 350 }

interface BasketItem {
  quantity: number,
  price: number,
  productId: number,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy  {
  cols = 3;
  rowHeight = ROW_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscription: Subscription | undefined;
  cartItemSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.storeService.getCartItems()
  }

  onResize(event: any) {
    // this.cols = (event.target.innerWidth <= 700) ? 1 : 3;
    if(event.target.innerWidth <= 700){
      this.cols = 1
    }else if(event.target.innerWidth >= 700 && event.target.innerWidth <= 1000){
      this.cols = 2
    }else{
      this.cols = 3
    }
  }

  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort)
      .subscribe((_products) => {
        this.products = _products
      })
  }

  // generateFilteredProducts(filteredProducts: Array<Product>) {
  //   this.products = filteredProducts;
  // }

  onFilteredProducts(products: Array<Product>): void {
    this.products=products
  }


  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  };

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  };

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product,
      name: product.name,
      price: product.price,
      quantity: 1,
      id: product.id,
    })

    this.cartItemSubscription = this.storeService.addToBasket({
      quantity: 1, price: product.price, productId: product.id
    }).subscribe((_) => {
    })
  };


  ngOnDestroy(): void {
      if(this.productsSubscription){
        this.productsSubscription.unsubscribe()
      }
  }
}
