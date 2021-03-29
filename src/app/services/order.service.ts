import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class OrderService {
  products: ProductResponseModel[] = [];
  ServerURL = environment.serverURL;

  constructor(private http: HttpClient) {}

  getSingleOrder(cartItems: any) {
    let body = {
      cartItems,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    };
    return this.http.post(`${this.ServerURL}order`, body, httpOptions);
  }
}

interface ProductResponseModel {
  id: Number;
  title: String;
  description: String;
  price: Number;
  quantityOrdered: Number;
  image: String;
}
