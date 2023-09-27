import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  { path: 'users', pathMatch: 'full', component: HomeComponent },
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'user/edit/:userName', pathMatch: 'full', component: RegisterComponent },
  { path: 'user/add', pathMatch: 'full', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
