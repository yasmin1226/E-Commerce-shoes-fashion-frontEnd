import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Observable } from "rxjs";
import { CartModelServer } from "../../models/cart.model";
import { logging } from "protractor";

@Component({
  selector: "mg-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
  // cartData: CartModelServer;
  // cartTotal: number;
  // subTotal: number;

  // constructor(public cartService: CartService) {
  // }

  // ngOnInit() {
  //    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
  //    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  // }
  //cartData:CartModelServer;
  cartData: any = [];
  //console.log("ssss");

  //cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService) {}
  ChangeQuantity(id: string, increase: boolean) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));

    if (increase) {
      console.log("before", cartItems);
      console.log("+");
      console.log(id);
      cartItems[id].quantity++;
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      console.log("before", cartItems);

      console.log("-");

      if (cartItems[id].quantity > 1) {
        cartItems[id].quantity--;
        localStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("after", cartItems);
      }
      // else {
      //   cartItems.splice(id, 1);

      //   localStorage.setItem("cart", JSON.stringify(cartItems));
      //   console.log("after", cartItems);
      // }
    }
    this.cartData = JSON.parse(localStorage.getItem("cart"));
    // const q = document.getElementById("number");
    //console.log(q)

    // const cusrr= cartItems.find(id)

    // console.log(curr,curr)
    //  cartItems[id].quantity++;
    //  console.log("item to increase",localStorage.getItem('cart'))
    //  //localStorage.setItem("cart",cartItems);
    //  console.log("Curr",cartItems[id].quantity)
    //  cartItems.map(el=>{
    // if(el.id==id){
    //   console.log("the id")
    // }else{
    //   console.log("not id")
    // }
    //  })
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

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.cartData[index];
    console.log(p);
    // @ts-ignore
    subTotal = p.price * p.quantity;

    return subTotal;
  }

  cartTotal(): number {
    let total = this.cartData.reduce(
      (tot, product) => tot + product.quantity * product.price,
      0
    );
    return total;
  }

  ngOnInit(): void {
    this.cartData = JSON.parse(localStorage.getItem("cart")) || [];

    console.log('localStorage.getItem("cart")', this.cartData);
  }

  // ChangeQuantity(id: number, increaseQuantity: Boolean) {
  //   this.cartService.UpdateCartData(id, increaseQuantity);
  // }
}
