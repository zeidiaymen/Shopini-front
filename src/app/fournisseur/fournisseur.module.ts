import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FournisseurRoutingModule } from './fournisseur-routing.module';
import { ProductModule } from './product/product.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FournisseurLayoutComponent } from './fournisseur-layout/fournisseur-layout.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    NotFoundComponent,
    FournisseurLayoutComponent,
    FooterComponent,
    TopbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FournisseurRoutingModule,
    ProductModule
  ]
})
export class FournisseurModule { }
