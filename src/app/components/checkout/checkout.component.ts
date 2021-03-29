import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { CartModelServer } from "../../models/cart.model";
import { Router } from "@angular/router";
import { OrderService } from "../../services/order.service";
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, NgForm, Validators } from "@angular/forms";
//import { LoginComponent } from "./../login/login.component";

@Component({
  selector: "mg-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  cartData = [];
  //cartTotal: number;
  showSpinner: Boolean;
  checkoutForm: any;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder //    public login: LoginComponent
  ) {
    this.checkoutForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required]],
    });
  }
  cartTotal(): number {
    let total = this.cartData.reduce(
      (tot, product) => tot + product.quantity * product.price,
      0
    );
    return total;
  }
  ngOnInit() {
    // console.log(this.login.isLogin);
    //this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    //this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartData = JSON.parse(localStorage.getItem("cart")) || [];
  }

  // onCheckout() {
  //  this.spinner.show().then(p => {
  //     this.cartService.CheckoutFromCart(1);
  //   });
  onCheckout() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(["/login"]);
      alert("log in");
    } else {
      let p = this.cartData.map((product) => {
        return {
          productId: product.id,
          quantityOrdered: product.quantity,
        };
      });
      console.log(p);
      this.orderService.getSingleOrder(p).subscribe(
        (res) => {
          console.log(res);
          localStorage.removeItem("cart");
          alert("thank you");
          this.router.navigate(["/"]);
        },
        (err) => {
          console.log(err);
        }
      );

      // this.spinner.show();

      //console.log(this.checkoutForm.value);
    }
  }
}
