import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  api='https://fakestoreapi.com/products';

  async getProduct(id: string) {
    try {
      const res = await axios.get(`${this.api}/${id}`);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  


}
