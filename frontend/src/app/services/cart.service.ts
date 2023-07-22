import { CartItem } from './../shared/models/cartItem';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from './../shared/models/cart';
import { Food } from '../shared/models/food';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class CartService {
  private cart:Cart = this.getCartFromLocalStore();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() { }

  addToCart(food:Food):void{
    let cartItem = this.cart.items
    .find(item => item.food.id == food.id);
    if(cartItem){
      return;
    }
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStore();
  }

  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    this.setCartToLocalStore();
  }

  changeQuantity(foodId: string, quantity: number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;

    this.setCartToLocalStore();
  }

  clearCart(){
    this.cart = new Cart();

    this.setCartToLocalStore();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStore():void{
    this.cart.totalPrice = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);

    this.cart.totalCount = this.cart.items
    .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0 );

    const cartJson = JSON.stringify(this.cart);
    localStorage.setValue('Cart', cartJson);

    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStore():Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }


}
