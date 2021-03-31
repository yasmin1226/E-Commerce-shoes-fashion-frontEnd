import { Component, OnInit } from "@angular/core";

@Component({
  selector: "mg-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"],
})
export class OrderComponent implements OnInit {
  constructor() {}
  orders = [...JSON.parse(localStorage.getItem("orders"))];

  allOrders = this.orders;
  or = [...this.orders];
  ngOnInit(): void {
    console.log("orderrrrrrrrrrr", ...this.orders);
    console.log("tttt", this.orders);
    console.log("or", this.or);
  }
}
