import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {ProductService} from "../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-modproduct',
  templateUrl: './modproduct.component.html',
  styleUrls: ['./modproduct.component.css']
})
export class ModproductComponent implements OnInit {
  product=new Product();

  constructor(private productService:ProductService,private  activatedroute: ActivatedRoute,private  route:Router) { }

  ngOnInit(): void {
    this.productService.getProductById(this.activatedroute.snapshot.params.idp).subscribe((d) => {
      //console.log(d);
      this.product = d;
      //    console.log(this.product);
    })
  }

  modproduct(){
    // console.log(f);
    //   console.log(this.product);
    this.productService.updateproduct(this.product).subscribe(()=>{
        console.log("good ");
        this.route.navigateByUrl('/fournisseur/productM');
      },
      (error )=>{
        console.log("error");
      },
      ()=>{console.log("complete");} );

  }



}
