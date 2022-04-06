import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit, OnDestroy{

  products: IProduct[] = [];

  pageTitle: string = 'Product List';
  showImage: boolean = false;
  errorMessage: string = '';
  sub!: Subscription;

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
   this.sub = this.productService.getProducts().subscribe({
     next: products => {
       this.products = products;
       this.filteredProducts = this.products;
     },
     error: err => this.errorMessage = err
   })
   }

   ngOnDestroy(): void {
     this.sub.unsubscribe()
   }

   toggleImage(): void{
    this.showImage = ! this.showImage
   }

   onNotify(message: Event){
      this.pageTitle = 'Product List:' + message
   }



}
