import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ContactComponent } from "./components/contact/contact.component";
import { WishListComponent } from "./components/wish-list/wish-list.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { OrderComponent } from "./components/order/order.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },

  {
    path: "contact",
    component: ContactComponent,
  },

  {
    path: "wishlist",
    component: WishListComponent,
  },
  {
    path: "aboutus",
    component: AboutUsComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "myOrder",
    component: OrderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
