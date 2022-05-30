import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { MainProductComponent } from './main-product/main-product.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ModproductComponent } from './modproduct/modproduct.component';
import { RemoveproductComponent } from './removeproduct/removeproduct.component';
import {NgImageSliderModule} from "ng-image-slider";
import {GoogleMapsModule} from "@angular/google-maps";
import {HttpClientJsonpModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ModproductComponent,
    AddproductComponent,
    MainProductComponent,
    RemoveproductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    NgImageSliderModule,
    GoogleMapsModule,
    HttpClientJsonpModule
  ]
})
export class ProductModule { }
