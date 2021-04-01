import { Injectable } from "@angular/core";
import { ProductService } from "./product.service";
import { BehaviorSubject } from "rxjs";
import { CartModelPublic, CartModelServer } from "../models/cart.model";
import { ProductModelServer } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { NavigationExtras, Router } from "@angular/router";
import { OrderService } from "./order.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class CartService {
  ServerURL = environment.serverURL;

  private cartDataClient: CartModelPublic = {
    prodData: [{ incart: 0, id: 0 }],
    total: 0,
  }; // This will be sent to the backend Server as post data
  // Cart Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [
      {
        product: undefined,
        numInCart: 0,
      },
    ],
    total: 0,
  };

  cartTotal$ = new BehaviorSubject<any>(0);
  // Data variable to store the cart information on the client's local storage

  cartDataObs$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private httpClient: HttpClient,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
    //this.cartTotal$.next(this.cartDataServer.total);
    this.cartDataObs$.next(this.cartDataServer);
    console.log("local", localStorage.getItem("cart"));
    let info: CartModelPublic = JSON.parse(localStorage.getItem("cart"));
    console.log("info", info);
    // if (info !== null && info !== undefined && info.prodData !== 0) {
    // assign the value to our data variable which corresponds to the LocalStorage data format
    this.cartDataClient = info;
    // Loop through each entry and put it in the cartDataServer object
    // this.cartDataClient.prodData.forEach(p => {
    //   this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {
    //     if (this.cartDataServer.data[0].numInCart === 0) {

    //       this.cartDataServer.data[0].numInCart = p.incart;
    //       this.cartDataServer.data[0].product = actualProdInfo;
    //       this.CalculateTotal();
    //       this.cartDataClient.total = this.cartDataServer.total;
    //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    //     } else {
    //       this.cartDataServer.data.push({
    //         numInCart: p.incart,
    //         product: actualProdInfo
    //       });
    //       this.CalculateTotal();
    //       this.cartDataClient.total = this.cartDataServer.total;
    //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
    //     }
    //     this.cartDataObs$.next({...this.cartDataServer});
    //   });
    // });
    //}
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;

    let p = this.cartDataClient;
    console.log(p);
    // @ts-ignore
    subTotal = p.price * p.numInCart;

    return subTotal;
  }

  // AddProductToCart(id: number, quantity?: number) {

  //   this.productService.getSingleProduct(id).subscribe(prod => {
  //     // If the cart is empty
  //      console.log('prod',prod)
  //     if (this.cartDataServer.data[0].product === undefined) {
  //       this.cartDataServer.data[0].product = prod;
  //       // console.log(prod)
  //       this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;

  //       this.CalculateTotal();
  //       this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
  //       this.cartDataClient.prodData[0].id = prod.id;

  //       this.cartDataClient.total = this.cartDataServer.total;
  //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

  //     //  localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //       this.cartDataObs$.next({...this.cartDataServer});
  //       this.toast.success(`${prod.title} added to the cart.`, "Product Added", {
  //         timeOut: 1500,
  //         progressBar: true,
  //         progressAnimation: 'increasing',
  //         positionClass: 'toast-top-right'
  //       })

  //     }  // END of IF
  //     // Cart is not empty
  //     else {
  //    //   let index =this.cartDataServer.data.findIndex(p => p.product.id === prod.id);
  //      let index =this.cartDataServer.data.findIndex(p => p.product.id === prod.id);
  //       console.log('Second item' +prod.price);
  //       console.log('Inddex : '+index)

  //       // 1. If chosen product is already in cart array
  //       if (index !== -1) {

  //         if (quantity !== undefined && quantity <= prod.quantity) {
  //           console.log(index);
  //           // @ts-ignore
  //           this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
  //         } else {
  //           // @ts-ignore
  //           this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
  //         }

  //         this.cartDataClient.prodData[index].incart = ++index;//this.cartDataServer.data[index].numInCart;
  //         this.toast.info(`${prod.title} quantity updated in the cart.`, "Product Updated", {
  //           timeOut: 1500,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //           positionClass: 'toast-top-right'
  //         })
  //       }
  //       // 2. If chosen product is not in cart array
  //       else {
  //         this.cartDataServer.data.push({

  //           product: prod,
  //           numInCart: 1
  //         });
  //         this.cartDataClient.prodData.push({
  //           incart: 1,
  //           id: prod.id
  //         });
  //         this.toast.success(`${prod.title} added to the cart.`, "Product Added", {
  //           timeOut: 1500,
  //           progressBar: true,
  //           progressAnimation: 'increasing',
  //           positionClass: 'toast-top-right'
  //         })
  //         console.log(quantity)
  //       }
  //       this.CalculateTotal();
  //       this.cartDataClient.total = this.cartDataServer.total;
  //       localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
  //       this.cartDataObs$.next({...this.cartDataServer});

  //     }  // END of ELSE

  //   });
  // }

  UpdateCartData(id, increase: Boolean) {
    let data = this.cartDataClient[id];
    if (increase) {
      // @ts-ignore
      data.numInCart < data.quantity ? data.numInCart++ : data.quantity;
      this.cartDataClient[id].incart = data.numInCart;
      // this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartDataObs$.next({ ...this.cartDataServer });
      localStorage.setItem("cart", JSON.stringify(this.cartDataClient));
    } else {
      // @ts-ignore
      data.numInCart--;

      // @ts-ignore
      if (data.numInCart < 1) {
        this.DeleteProductFromCart(id);
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        // @ts-ignore
        this.cartDataObs$.next({ ...this.cartDataServer });
        this.cartDataClient.prodData[id].incart = data.numInCart;
        //this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem("cart", JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    /*    console.log(this.cartDataClient.prodData[index].prodId);
        console.log(this.cartDataServer.data[index].product.id);*/

    if (window.confirm("Are you sure you want to delete the item?")) {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      //this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;

      if (this.cartDataClient.total === 0) {
        this.cartDataClient = { prodData: [{ incart: 0, id: 0 }], total: 0 };
        localStorage.setItem("cart", JSON.stringify(this.cartDataClient));
      } else {
        localStorage.setItem("cart", JSON.stringify(this.cartDataClient));
      }

      if (this.cartDataServer.total === 0) {
        this.cartDataServer = {
          data: [
            {
              product: undefined,
              numInCart: 0,
            },
          ],
          total: 0,
        };
        this.cartDataObs$.next({ ...this.cartDataServer });
      } else {
        this.cartDataObs$.next({ ...this.cartDataServer });
      }
    }
    // If the user doesn't want to delete the product, hits the CANCEL button
    else {
      return;
    }
  }

  CheckoutFromCart(userId: Number) {
    this.httpClient
      .post(`${this.ServerURL}order`, null)
      .subscribe((res: { success: Boolean }) => {
        console.clear();

        if (res.success) {
          this.resetServerData();
          this.httpClient
            .post(`${this.ServerURL}order`, {
              userId: userId,
              products: this.cartDataClient.prodData,
            })
            .subscribe((data: OrderConfirmationResponse) => {
              this.orderService
                .getSingleOrder(data.order_id)
                .subscribe((prods) => {
                  if (data.success) {
                    const navigationExtras: NavigationExtras = {
                      state: {
                        message: data.message,
                        products: prods,
                        orderId: data.order_id,
                        total: this.cartDataClient.total,
                      },
                    };
                    this.spinner.hide();
                    this.router.navigate(["/"], navigationExtras).then((p) => {
                      this.cartDataClient = {
                        prodData: [{ incart: 0, id: 0 }],
                        total: 0,
                      };
                      this.cartTotal$.next(0);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify(this.cartDataClient)
                      );
                    });
                  }
                });
            });
        } else {
          this.spinner.hide();
          this.router.navigateByUrl("/checkout").then();
          this.toast.error(`Sorry, failed to book the order`, "Order Status", {
            timeOut: 1500,
            progressBar: true,
            progressAnimation: "increasing",
            positionClass: "toast-top-right",
          });
        }
      });
  }

  // private CalculateTotal() {
  //   let Total = 0;

  //   this.cartDataServer.data.forEach(p => {
  //     const {numInCart} = p;
  //     const {price} = p.;
  //     // @ts-ignore
  //     Total += numInCart * price;
  //   });
  //   this.cartDataServer.total = Total;
  //   this.cartTotal$.next(this.cartDataServer.total);
  // }

  private resetServerData() {
    this.cartDataServer = {
      data: [
        {
          product: undefined,
          numInCart: 0,
        },
      ],
      total: 0,
    };
    this.cartDataObs$.next({ ...this.cartDataServer });
  }
}

interface OrderConfirmationResponse {
  order_id: number;
  success: Boolean;
  message: string;
  products: [
    {
      id: string;
      numInCart: string;
    }
  ];
}
