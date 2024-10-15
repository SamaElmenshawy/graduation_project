import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../component/card/card.component';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../services/home.service';
interface Iproduct{
  image:string
  title:string
  price:number
  id:number
}
interface Icategory{
  id: number;
  title: string;
  price: number;
  image: string;
}
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CardComponent,CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
products:Iproduct[]=[]
category: Icategory[]=[];


constructor(private homeService:HomeService){}


ngOnInit(): void {
  this.getdata()
  this.getcategory();

}

async getdata()
{   const res = await this.homeService.GetAllProducts(6);
  console.log(res)
  this.products = res;

}

async getcategory() {
  const res = await this.homeService.getallcategory(6);
  console.log(res);
  this.category = res;
}

filtercategory(event:any){
  let value= event.target.value;  //target -> to define the item chooses
  if(value == "all")
  {
    this.getdata();
  }else{
  this.getproductcategory(value)
  }

}

 async getproductcategory(keyword:string){
  const res = await this.homeService.getproductbycategory(keyword);
  console.log(res)
  this.products = res;
}
}






