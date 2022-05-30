import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path:'',component:DashboardComponent },
  { path:'dashboard',component:DashboardComponent },
  {
    path: 'productM',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {path:"**",component:NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FournisseurRoutingModule { }
