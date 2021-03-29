import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../services/product.service";
import { ProductModelServer, serverResponse } from "../../models/product.model";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { Command } from "protractor";

@Component({
  selector: "mg-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];
  productss: any = [];
  wishData = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}
  id: number;
  ngOnInit() {
    // this.productService.getAllProducts(8).subscribe((prods: serverResponse ) => {
    //   this.products = prods.products;
    //   console.log(this.products);
    // });
    this.wishData = JSON.parse(localStorage.getItem("wish")) || [];
    this.getProducts();

    this.getAllProducts2();
    //this.AddProduct( 1);
  }

  click = true;
  AddToWishList(id, name, description, price, imagePath) {
    if (this.click) {
      if (localStorage.getItem("wish") === null) {
        var wishItems = [];

        var item = {
          id: id,
          quantity: 1,
          name: name,
          description: description,
          price: price,
          imagePath: imagePath,
        };
        console.log(item);
        wishItems.push(item);
        localStorage.setItem("wish", JSON.stringify(wishItems));
      } else {
        var item = {
          id: id,
          quantity: 1,
          name: name,
          description: description,
          price: price,
          imagePath: imagePath,
        };
        wishItems = JSON.parse(localStorage.getItem("wish"));
        console.log(wishItems);

        let isExisit = false;
        let idExist = 0;
        let index = 0;
        wishItems.forEach((el) => {
          if (el.id == id) {
            isExisit = true;
            idExist = index;
            //   let x = document.querySelector("button#too");
            //   x.className = "btn btn-outline-danger btn-sm btn-block";
            //   console.log(x);
          }
          index++;
        });
        if (isExisit) {
          console.log("id", id);
          console.log("index", idExist);
          console.log("wishitems", wishItems);
          wishItems[idExist].quantity++;
          console.log("wishitems", wishItems);

          localStorage.setItem("wish", JSON.stringify(wishItems));
        } else {
          wishItems.push(item);
          localStorage.setItem("wish", JSON.stringify(wishItems));
        }
        console.log(isExisit);
        // console.log('Addeddddddddddd')
        //  console.log(item);
        //console.log(cartItems)
        //cartItems.push(item);
      }

      localStorage.setItem("wish", JSON.stringify(wishItems));
      console.log("first clicked");

      //.setAttribute("class", "btn btn-outline-danger btn-sm btn-block");
      this.click = false;
    } else {
      let filterdWish = this.wishData.filter((product) => product.id !== id);
      console.log("after", filterdWish);
      this.wishData = [...filterdWish];
      localStorage.setItem("wish", JSON.stringify(filterdWish));
      //

      // let x = document.querySelector("button#too");
      // x.className = "btn btn-outline-primary btn-sm btn-block";
      // console.log(x);
      console.log("second click");
      this.click = true;
    }
    // let x = document.querySelector("button#too");

    // this.wishData.map((prd) => {
    //   if (prd.id == id) {
    //     x.className = "btn btn-outline-danger btn-sm btn-block";
    //   } else {
    //     x.className = "btn btn-outline-primary btn-sm btn-block";
    //   }
    // });
  }

  toggleHeart() {
    if (this.click) {
      console.log("click first");
      this.click = false;
    } else {
      console.log("click two");
      this.click = true;
    }
  }
  // $("#to").toggle({

  // });
  AddProduct(id, name, description, price, imagePath) {
    //console.log(id);

    if (localStorage.getItem("cart") === null) {
      var cartItems = [];

      var item = {
        id: id,
        quantity: 1,
        name: name,
        description: description,
        price: price,
        imagePath: imagePath,
      };
      console.log(item);
      cartItems.push(item);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      var item = {
        id: id,
        quantity: 1,
        name: name,
        description: description,
        price: price,
        imagePath: imagePath,
      };
      cartItems = JSON.parse(localStorage.getItem("cart"));
      console.log(cartItems);
      // cartItems.map(el=>{
      //   if(el.id==id){
      //     el.quantity++;
      //     console.log(el.quantity)
      //     console.log("exist");
      //     console.log(el.id);

      //   }else{
      //     console.log("not exsist")
      //     console.log(el.id);
      //    //   cartItems.push(item);

      //   }
      // })
      let isExisit = false;
      let idExist = 0;
      let index = 0;
      cartItems.forEach((el) => {
        if (el.id == id) {
          isExisit = true;
          idExist = index;
        }
        index++;
      });
      if (isExisit) {
        console.log("id", id);
        console.log("index", idExist);
        console.log("cartitems", cartItems);
        cartItems[idExist].quantity++;
        console.log("cartitems", cartItems);

        localStorage.setItem("cart", JSON.stringify(cartItems));
      } else {
        cartItems.push(item);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
      console.log(isExisit);
      // console.log('Addeddddddddddd')
      //  console.log(item);
      //console.log(cartItems)
      //cartItems.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
  selectProduct(id: number) {
    this.router.navigate(["home/product", id]).then();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        // console.log(prods)
        this.productss = products;
        //console.log(prods['data']);
        // console.log(prods['data'].products);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getAllProducts2() {
    this.productService.getAllProducts().subscribe(
      (products) => {
        console.log(products);
        this.productss = products;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getBags() {
    this.productService.getBagsCatagory().subscribe(
      (products) => {
        console.log(products);
        this.productss = products;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getShoes() {
    this.productService.getShoesCatagory().subscribe(
      (products) => {
        console.log(products);
        this.productss = products;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAccessories() {
    this.productService.getAccessoriesCatagory().subscribe(
      (products) => {
        console.log(products);
        this.productss = products;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // CalculateSubTotal(p): number {
  //   let subTotal = 0;

  //   subTotal = p.price * p.numInCart;

  //   return subTotal;
  // }
}
