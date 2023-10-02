import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

interface CartItem {
  price: number,
  product: Product,
  quantity: number
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})

export class CartComponent {

  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'test',
    price: 150,
    quantity: 1,
    id: 1,
  },{
    product: 'https://via.placeholder.com/150',
    name: 'test2',
    price: 150,
    quantity: 3,
    id: 1,
  }]};

  dataSource: Array<CartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  cartItemsSubscription: Subscription | undefined;
  removeItemFromCartSubscription: Subscription | undefined;
  addQuantitySubscription: Subscription | undefined;
  removeQuantitySubscription: Subscription | undefined;

  constructor(private cartService: CartService ) {

  }

  ngOnInit(): void {
    // this.cartService.cart.subscribe((_cart: Cart) => {
    //   this.cart = _cart;
    //   this.dataSource = this.cart.items
    // })
    this.getCartItems();

  }

  getTotal(items: Array<CartItem>): number {
    // return this.cartService.getTotal(items)
    return 1
  }

  onClearCart(): void {
    // this.cartService.clearCart()
  }

  onRemoveFromCart(itemId: number): void {
    // this.cartService.removeFromCart(item)
    this.removeItemFromCartSubscription = this.cartService.removeItemFromCart(itemId)
    .subscribe(() => {
      this.getCartItems()
    })
  

  }

  onAddQuantity(item: CartItem): void {
    // this.cartService.addToCart(item)
    this.addQuantitySubscription = 
    this.cartService.increaseCartItemQuantity(
      {
        price: item.price, productId: item.product.id, quantity: item.quantity+1
      }
    )
    .subscribe(() => {
      this.getCartItems()
    })
    
  }

  onRemoveQuantity(item: CartItem): void {
    const nextQuantity = item.quantity-1;

    if(nextQuantity === 0) {
      this.onRemoveFromCart(item.product.id)
    }else {

      this.removeQuantitySubscription = 
      this.cartService.decreaseCartItemQuantity(
        {
          price: item.price, productId: item.product.id, quantity: nextQuantity
        }
      )
      .subscribe(() => {
        this.getCartItems()
      })
    }

  }

  getCartItems(): void {
    this.cartItemsSubscription = this.cartService.getCartItems()
      .subscribe((_cartItems) => {
        this.cart.items = _cartItems
        this.cartService.cart.next({ items: _cartItems })
      })
  }

}
