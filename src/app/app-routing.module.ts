import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  { path: 'users', pathMatch: 'full', component: HomeComponent },
  { path: 'products', pathMatch: 'full', component: ProductsComponent },
  { path: 'user/edit/:userName', pathMatch: 'full', component: RegisterComponent },
  { path: 'user/add', pathMatch: 'full', component: RegisterComponent },
  { path: 'product/add', pathMatch: 'full', component: AddproductComponent },
  { path: 'product/edit/:productId', pathMatch: 'full', component: AddproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
