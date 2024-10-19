import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
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
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  @Input() firstname = '';
  @Input() lastname = '';
  @Input() phone: string = '';
  @Input() email = '';
  @Input() address = '';
  selectedCity = '';
  house = '';
  postalCode = '';
  zip = '';
  saveAddress = false;

  check: any[] = [];
  cart: IProduct[] = [];
  message: string = '';

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
  getcarttotal() {
    this.total = 0;
    for (let x in this.cart) {
      this.total += Math.ceil(this.cart[x].price * this.cart[x].qty);
    }
  }
  submit() {
    if (
      this.firstname &&
      this.lastname &&
      this.phone &&
      this.email &&
      this.address &&
      this.selectedCity
    ) {
      this.check = [
        {
          firstname: this.firstname,
          lastname: this.lastname,
          phone: this.phone,
          email: this.email,
          address: this.address,
          city: this.selectedCity,
          house: this.house,
          postalCode: this.postalCode,
          zip: this.zip,
          saveAddress: this.saveAddress,
          totals: this.total,
        },
      ];

      localStorage.setItem('checkoutData', JSON.stringify(this.check));
      this.message = 'Checkout data saved successfully!'; // Success message
    } else {
      this.message = 'Please fill all required fields.'; // Error message
    }
  }
}
