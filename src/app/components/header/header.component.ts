import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CartModelServer } from "../../models/cart.model";
import { ProductService } from "src/app/services/product.service";
//import { CartComponent } from "../cart/cart.component";
//import {CartComponent} from "../cart/cart.component"
@Component({
  selector: "mg-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  cartData = [];
  wishData = [];
  cartTotal = 0;
  productss: import("./../../models/product.model").serverResponse;
  //import { CartComponent } from './../cart/cart.component';
  //import { from } from "rxjs";

  constructor(
    public cartService: CartService,
    private productService: ProductService //  public cartComponent: CartComponent
  ) {}

  ngOnInit() {
    console.log("tokennn", localStorage.getItem("token"));
    this.cartData = JSON.parse(localStorage.getItem("cart")) || [];
    // localStorage.setItem("cart",this.cartData);
    this.wishData = JSON.parse(localStorage.getItem("wish")) || [];

    //  this.cartData = [...this.cartData];
    console.log("xx", this.cartData.length);
    // this.cartService.cartTotal$.subscribe((total) => {
    //   this.cartTotal = total;
    // });
    // this.cartService.cartDataObs$.subscribe((data) => (this.cartData = data));
    if (this.cartData.length >= 1) {
      console.log("total", this.cartTotal);
      this.cartData.map((pr) => {
        this.cartTotal += pr.quantity * pr.price;
      });
    }
  }
  isValid() {
    if (localStorage.getItem("token") !== null) {
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    //  localStorage.clear();
  }
  DeleteProductFromCart(id) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm("Are you sure you want to delete the item?")) {
      let cart = JSON.parse(localStorage.getItem("cart"));
      console.log("before", cart);

      let filterdCart = cart.filter((product) => product.id !== id);
      console.log("after", filterdCart);
      this.cartData = [...filterdCart];
      localStorage.setItem("cart", JSON.stringify(filterdCart));
    }
  }
}
