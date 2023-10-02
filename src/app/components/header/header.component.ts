import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, cur) => prev + cur, 0)
  }

  constructor(private cartService: CartService) {

  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cart.items.forEach((item) => {
      this.onRemoveFromCart(item.product.id)
    })
  }

  onRemoveFromCart(itemId: number): void {
    console.log(this.itemsQuantity);
    
    this.cartService.removeItemFromCart(itemId)
      .subscribe(() => {
        this.cart.items = this.cart.items.filter((i) => {
          if (i.product.id === itemId) {
            this.itemsQuantity -= i.quantity
          }

          return i.product.id !== itemId
        })
      })
  }
}
