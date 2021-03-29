import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ProductModelServer, serverResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllProducts(limitOfResults=10): Observable<serverResponse> {
    return this.http.get<serverResponse>(this.url + 'home/product', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }

  getBagsCatagory(limitOfResults=10) : Observable<serverResponse>{
    return this.http.get<serverResponse>(this.url + 'home/product/bags', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }

  getShoesCatagory(limitOfResults=10):Observable<serverResponse>{
    return this.http.get<serverResponse>(this.url + 'home/product/shoes', {
      params: {
        limit: limitOfResults.toString()
      }
    });

  }

  getAccessoriesCatagory(limitOfResults=10) : Observable<serverResponse>{
    return this.http.get<serverResponse>(this.url + 'home/product/accessories', {
      params: {
        limit: limitOfResults.toString()
      }
    });
  }


  // getSingleProduct(id: Number): Observable<ProductModelServer> {
  //   console.log('prod id'+id)
  //   return this.http.get<ProductModelServer>(this.url + 'home/product/' + id);
    
  // }

  getSingleProduct(id){
    console.log(id);
    return this.http.get<any>(this.url + 'home/product/' + id);
  }

  getProductsFromCategory(catName: String): Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.url + 'product/category/' + catName);
  }

}
