import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../service/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../../shared/models/product";

@Component({
  selector: 'app-removeproduct',
  templateUrl: './removeproduct.component.html',
  styleUrls: ['./removeproduct.component.css']
})
export class RemoveproductComponent implements OnInit {
  @Input() product!:Product;
  @Output() notif=new EventEmitter<any>();



  sendnotiftoparent(product:Product){
    // this.notif.emit("bien recu");
    this.productService.deleteproduct(product.idProduit).subscribe(()=>{
        console.log("good ");
        this.notif.emit(product);
        // this.route.navigateByUrl('/fournisseur/productM');
      },
      (error )=>{
        console.log("error");
      },
      ()=>{console.log("complete");} );

  }

  constructor(private productService:ProductService,private  route:Router,
              private  activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log(this.activatedroute.snapshot.params.idp);

  }



}

