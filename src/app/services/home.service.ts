import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  api="https://fakestoreapi.com/products";

  async GetAllProducts(limit:number){
    console.log();
    try{
      const res= await axios.get(this.api)
      return res.data;

    }catch(e){
      console.log(e);

    }
  }

  apicat='https://fakestoreapi.com/products/categories';

  async getallcategory(limit: number) {
    console.log(limit);
    try {
      const res = await axios.get(this.apicat);
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  apiuni='https://fakestoreapi.com/products/category/';

  async getproductbycategory(keyword:string) {
    
    try {
      const res = await axios.get(this.apiuni+keyword); //filiter by the word i will push
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
}


