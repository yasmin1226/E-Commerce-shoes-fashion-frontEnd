import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  isLogin: boolean = false;
  errorMessage;
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
  ) {}
  ngOnInit() {
    this.isUserLogin();
  }
  onSubmit(form: NgForm) {
    console.log("Your form data : ", form.value);

    this._api.postTypeRequest("user/login", form.value).subscribe(
      (res: any) => {
        //console.log("xxx", res.user.isAdmin);
        if (!res.message) {
          if (res.user.isAdmin) {
            if (true) {
              console.log(res);
              console.log("data", res["user"]);
              console.log("token", res["user"].token);
              this._auth.setDataInLocalStorage(
                "userData",
                JSON.stringify(res["user"])
              );
              this._auth.setDataInLocalStorage("token", res["user"].token);
              window.location.replace(
                "https://shoppingcarttt.herokuapp.com/admin/resources/Product"
              );
              // this._router.navigate([
              //   "https://shoppingcarttt.herokuapp.com/admin/resources/Product",
              // ]);
            }
          } else {
            if (true) {
              console.log(res);
              console.log("data", res["user"]);
              console.log("token", res["user"].token);
              this._auth.setDataInLocalStorage(
                "userData",
                JSON.stringify(res["user"])
              );
              this._auth.setDataInLocalStorage("token", res["user"].token);
              this._router.navigate(["/"]);
            }
          }
        } else {
          alert(res.message);
        }
      },
      (err) => {
        console.log("error");
        console.log(err["error"].message);
        this.errorMessage = err["error"].message;
      }
    );
  }
  isUserLogin() {
    console.log(this._auth.getUserDetails());
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
  logout() {
    this._auth.clearStorage();
    this._router.navigate([""]);
  }
}
