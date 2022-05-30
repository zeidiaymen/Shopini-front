import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddproductComponent} from "./addproduct/addproduct.component";
import {ModproductComponent} from "./modproduct/modproduct.component";
import {RemoveproductComponent} from "./removeproduct/removeproduct.component";
import {MainProductComponent} from "./main-product/main-product.component";

const routes: Routes = [
  {path:"add" ,component:AddproductComponent },
  {path: 'remove/:idp', component: RemoveproductComponent},
  {path: 'update/:idp', component: ModproductComponent},
  {path:"**",component:MainProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
