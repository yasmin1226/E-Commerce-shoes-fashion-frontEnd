import { Component, OnInit } from "@angular/core";
import { environment } from "./../../../environments/environment";
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "mg-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  userData = JSON.parse(localStorage.getItem("userData"));

  //username: string = "";

  baseUrl = "https://shoppingcarttt.herokuapp.com/user/profile";
  baseUrlOr = "https://shoppingcarttt.herokuapp.com/order/myorders";
  constructor(private http: HttpClient, private router: Router) {}

  // user = [
  //   {
  //     id: "",
  //     username: "",
  //     email: "",
  //     gender: "",
  //   },
  // ];
  ngOnInit(): void {
    this.getUser();
    this.getOrders();
    console.log("orderrrrsss", this.orders);
    console.log("this.orders", this.orders);
    console.log("token", this.token);
    console.log("this.user", this.user);
    this.editUserName("yara");
    //this.editEmail("sarass@gmail.com");
  }
  token = localStorage.getItem("token");
  orders = localStorage.getItem("orders");
  httpOptions = {
    headers: new HttpHeaders({
      Accept: "json/html",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `${this.token}`,
    }),
  };

  getUser() {
    this.http
      .get(this.baseUrl, this.httpOptions)
      .pipe(
        map((resDB) => {
          console.log("res", resDB);
          const arrposts = [];

          arrposts.push({ ...resDB });

          return arrposts;
        })
      )
      .subscribe(
        (posts) => {
          console.log(posts);
          this.user = posts;
          console.log("userrrrr", this.user);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        }
      );
  }

  getOrders() {
    this.http
      .get(this.baseUrlOr, this.httpOptions)
      .pipe(
        map((resDB) => {
          console.log("res", resDB);
          const arrposts = [];

          arrposts.push({ ...resDB });

          return arrposts;
        })
      )
      .subscribe(
        (posts) => {
          console.log("orders", posts);
          //this.orders = posts;
          localStorage.setItem("orders", JSON.stringify(posts));
          //   console.log("ordersss", this.orders);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        }
      );
  }

  user = [
    {
      id: "",
      username: "",
      email: "",
      gender: "",
    },
  ];

  name = "user";
  url: any;
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => {
        // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  editUserName(username) {
    this.http
      .patch(this.baseUrl, { username: username }, this.httpOptions)
      .subscribe((res) => {
        console.log("sara", res);
      });
    // let userd = JSON.parse(localStorage.getItem("userData"));
    // //console.log("zzz", userName.username);
    // let usernamee = username;
    // let email = userd.email;
    // let gender = userd.gender;

    // userd = { username: usernamee, email, gender };
    // console.log("userDaataaaa", this.userData);
    // localStorage.setItem("userData", JSON.stringify(userd));
  }

  editEmail(email) {
    this.http
      .patch(this.baseUrl, { email: email }, this.httpOptions)
      .subscribe((res) => {
        console.log("sara", res);
      });
  }
}
