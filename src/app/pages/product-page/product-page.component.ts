import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface IProduct {
  image: string;
  title: string;
  category: string;
  description: string;
  price: number;
  id: number;
  qty: number;
}

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

  id = '';
  product: IProduct = {
    image: '',
    title: '',
    category: '',
    description: '',
    price: 0,
    id: 0,
    qty: 1,
  };

  constructor(
    private ProductService:ProductService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '1';
    this.getData();
  }

  async getData() {
    const data = await this.ProductService.getProduct(this.id);
    this.product = data;
  }
  
  addToCart() {
    const cart = localStorage.getItem('cart') || '';
    const addedProduct = this.product;
    addedProduct.qty = 1;
    if (cart) {
      const parsedCart = JSON.parse(cart);
      // Check if the product exists in the cart
      const product = parsedCart.findIndex(
        (e: any) => e.id === addedProduct.id
      );
      if (product !== -1) {
        parsedCart[product].qty += 1;
      } else {
        parsedCart.push(addedProduct);
      }

      localStorage.setItem('cart', JSON.stringify(parsedCart));
    } else {
      const createCart = [];
      createCart.push(addedProduct);
      localStorage.setItem('cart', JSON.stringify(createCart));
    }
  }
}
