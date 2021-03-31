import { Component, OnInit } from "@angular/core";

import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { AuthService } from "src/app/services/auth.service";
import { threadId } from "worker_threads";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})

// const name=document.getElementById('name');
// const email=document.getElementById('email');

// const password=document.getElementById('pass');

// const confirmPass=document.getElementById('confirmPass');
// console.log(name)
export class RegisterComponent implements OnInit {
  username: String;
  email: String;
  password: String;
  gender: String;
  // registerVaalidate(){
  //     if(!this.username||!this.email||!this.password||!this.gender){
  //         console.log("fill all fields")
  //     }

  //    console.log(this.username,this.email,this.password,this.gender);

  // }
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
    //if(!this.username||!this.email||!this.password||!this.gender){

    //  alert("fill data")
    //}else{

    this._api.postTypeRequest("user/signup", form.value).subscribe(
      (res: any) => {
        console.log("status", res);
        if (true) {
          console.log(res);
          this._auth.setDataInLocalStorage(
            "userData",
            JSON.stringify(res.user)
          );
          console.log(res.user);
          this._auth.setDataInLocalStorage("token", res["user"].token);
          console.log("token", res["user"].token);
          this._router.navigate(["/"]);
        } else {
          console.log(res);
          alert(res.msg);
        }
      },
      (err) => {
        console.log("err", err);
        alert(err["error"].message);
        this.errorMessage = err["error"].message;
      }
    );
  }
  //}
  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }
}
