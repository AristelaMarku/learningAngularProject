import { Component, OnInit } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit{

  products: IProduct[] = [];

  pageTitle: string = 'Product List';
  showImage: boolean = false;

   constructor(private productService: ProductService){

   }

  //  listFilter: string = 'card';
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];

   performFilter(filterBy: string): IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct)=>
      product.productName.toLocaleLowerCase().includes(filterBy)
    )
  }

   ngOnInit(): void {
   console.log('OnInit methed')
   this.products = this.productService.getProducts()
   this.filteredProducts = this.products
   }

   toggleImage(): void{
    this.showImage = ! this.showImage
   }

   onNotify(message: Event){
      this.pageTitle = 'Product List:' + message
   }



}
