import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Observable } from "rxjs";
import { CartModelServer } from "../../models/cart.model";
import { logging } from "protractor";

@Component({
  selector: "mg-wish-list",
  templateUrl: "./wish-list.component.html",
  styleUrls: ["./wish-list.component.scss"],
})
export class WishListComponent implements OnInit {
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
  wishData: any = [];
  //console.log("ssss");

  //cartTotal: number;
  subTotal: number;

  constructor(public cartService: CartService) {}
  ChangeQuantity(id: string, increase: boolean) {
    let wishItems = JSON.parse(localStorage.getItem("wish"));

    if (increase) {
      console.log("before", wishItems);
      console.log("+");
      console.log(id);
      wishItems[id].quantity++;
      localStorage.setItem("wish", JSON.stringify(wishItems));
    } else {
      console.log("before", wishItems);

      console.log("-");

      if (wishItems[id].quantity > 1) {
        wishItems[id].quantity--;
        localStorage.setItem("wish", JSON.stringify(wishItems));
        console.log("after", wishItems);
      }
      // else {
      //   cartItems.splice(id, 1);

      //   localStorage.setItem("cart", JSON.stringify(cartItems));
      //   console.log("after", cartItems);
      // }
    }
    this.wishData = JSON.parse(localStorage.getItem("wish"));
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
      let wish = JSON.parse(localStorage.getItem("wish"));
      console.log("before", wish);

      let filterdWish = wish.filter((product) => product.id !== id);
      console.log("after", filterdWish);
      this.wishData = [...filterdWish];
      localStorage.setItem("wish", JSON.stringify(filterdWish));
    }
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.wishData[index];
    console.log(p);
    // @ts-ignore
    subTotal = p.price * p.quantity;

    return subTotal;
  }

  cartTotal(): number {
    let total = this.wishData.reduce(
      (tot, product) => tot + product.quantity * product.price,
      0
    );
    return total;
  }

  ngOnInit(): void {
    this.wishData = JSON.parse(localStorage.getItem("wish")) || [];

    console.log('localStorage.getItem("wish")', this.wishData);
  }

  // ChangeQuantity(id: number, increaseQuantity: Boolean) {
  //   this.cartService.UpdateCartData(id, increaseQuantity);
  // }
}
