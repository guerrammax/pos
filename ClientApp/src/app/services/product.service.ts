import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { shareReplay, flatMap, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl: string ="/api/product/getproducts";
  private productUrl: string ="/api/product/addproduct";
  private deleteUrl: string ="/api/product/deletproducts";
  private updateUrl: string ="/api/product/updateproducts";
  private product$: Observable<Product[]>;

  constructor(
              private http: HttpClient
  )
  {

  }

  getProducts() : Observable<Product[]>
  {
    if (!this.product$)
    {
      this.product$ = this.http.get<Product[]>(this.baseUrl)
        .pipe(shareReplay());  
    }
     return this.product$;
  }

  getProductById(id:number) : Observable<Product>
  {
    return this.getProducts()
      .pipe(flatMap(result => result), first(product => product.productId==id));
  }

  insertProduct(newProduct: Product): Observable<Product>
  {
    return this.http.post<Product>(this.productUrl, newProduct);
  }

  updateProduct(id:number,editProdutc:Product):Observable<Product>
  {
    return this.http.put<Product>(this.updateUrl + id, editProdutc);
  }
  
  deleteProduct(id:number): Observable<any>
  {
    return this.http.delete(this.deleteUrl+id);
  }

  //Clear Cache
  clearCache()
  {
    this.product$ = null;
  }

}
