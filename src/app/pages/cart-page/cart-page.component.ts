import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

interface IProduct {
  image: '';
  title: '';
  category: '';
  description: '';
  price: 0;
  id: 0;
  qty: 1;
}
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent implements OnInit {
  cart: IProduct[] = [];

  total: any = 0;
  constructor() {}
  ngOnInit(): void {
    const cart = localStorage.getItem('cart') || '';
    const paresedData = JSON.parse(cart);
    if (paresedData) {
      this.cart = paresedData;
      this.getcarttotal();
    }
  }
  addamount(index: number) {
    if (index < 0 || index >= this.cart.length) {
      console.error('Invalid index');
      return;
    }

    this.cart[index].qty++;
    this.getcarttotal();
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  minusamount(index: number) {
    if (index < 0 || index >= this.cart.length) {
      console.error('Invalid index');
      return;
    }

    if (this.cart[index].qty > 0) {
      this.cart[index].qty--;
      this.getcarttotal();
      localStorage.setItem('cart', JSON.stringify(this.cart));
    } else {
      console.warn('Quantity cannot be less than zero.');
    }
  }
  delamount(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getcarttotal();
  }
  clearcart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.getcarttotal();
  }
  getcarttotal() {
    this.total = 0;
    for (let x in this.cart) {
      this.total += Math.ceil(this.cart[x].price * this.cart[x].qty);
    }
  }
}
