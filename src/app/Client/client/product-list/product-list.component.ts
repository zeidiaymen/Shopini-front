import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {ProductService} from "../../../fournisseur/product/service/product.service";
import { ProdInOrderService } from '../Services/prod-in-order.service';
import { ProductInOrder } from '../Models/ProductInORder';
import { FactureService } from '../Services/facture.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  ListProduct!: Product[];
  searchtext ="";
  ListProductS!: Product[];
  ListProductinit!: Product[];

  constructor(
    private serv1 :FactureService,
    private product: ProductService,private serv :ProdInOrderService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  E=0;
  A=0;
  Q=0;
  initcatvount(){
    let ListProductinit=this.ListProductinit;
    this.E = ListProductinit.filter(item => {
      return item.detailProduit.categorieProduit.toLocaleLowerCase().match("Electromenager".toLocaleLowerCase());
    }).length;
//    console.log(this.E);
    ListProductinit=this.ListProductinit;
    this.A = ListProductinit.filter(item => {
      return item.detailProduit.categorieProduit.toLocaleLowerCase().match("Alimentaire".toLocaleLowerCase());
    }).length;
    ListProductinit=this.ListProductinit;
    this.Q = ListProductinit.filter(item => {
      return item.detailProduit.categorieProduit.toLocaleLowerCase().match("Quincaillerie".toLocaleLowerCase());
    }).length;
  }
  imgm = null;
  imgi=-1;
  showthisimagem(img:any,i:any){
    this.imgm=img;
    this.imgi=i;
    console.log(this.imgm+"--"+this.imgi);
  }
  getAllProducts() {

    this.product.getAllProducts().subscribe((d) => {
      this.ListProductS = d;
      this.ListProduct = d;
      this.ListProductinit=d;
      
    //  console.log(d);
console.log(this.ListProduct)
      this.initcatvount();
    })

  }

  searchproducts() {

    if(this.searchtext!=""){
      let list = this.ListProductS;

      if (this.currentprice != null) {
        this.ListProduct = list.filter(item => {
          return item.prixUnitaire < this.currentprice
        });
      }

      if(this.cat!=null) {
        this.ListProduct = this.ListProduct.filter(item => {
          return item.detailProduit.categorieProduit.toLocaleLowerCase().match(this.cat.toLocaleLowerCase());
        });
      }

      this.ListProduct = this.ListProduct.filter(item =>{return   item.libelle.toLocaleLowerCase().match(this.searchtext.toLocaleLowerCase()); });
    }else if( this.searchtext=="" ){
      let list = this.ListProductS;

      this.getAllProducts();

    }

  }

  cat!:any;
  catA=false;
  catE=false;
  catQ=false;
  verifE=false;
  verifA=false;
  verifQ=false;


  prInOrder = new ProductInOrder();

// aymen

addToCart(p:any){

this.prInOrder.discount=0.1;
this.prInOrder.price = p.prixUnitaire ;
this.prInOrder.productName = p.libelle;
this.prInOrder.qte = p.detailProduit.quantite;
this.prInOrder.img = p.imagesProduit[0].url;
this.serv1
.getFactureByID((localStorage.getItem('id')))
.subscribe((e) => {
  this.serv.postProdInOrder(this.prInOrder,e.id,p.idProduit).subscribe();
 

});

}

//



  searchproductsCat(cat:string) {

    if (cat == "Electromenager" && this.verifE == false) {this.verifE=true;  this.cat=cat;  this.catA = false;this.catE = true;this.catQ = false;}
    else if (cat == "Electromenager" && this.verifE == true) { this.verifE=false; this.cat=null; this.catA = false;this.catE = true;this.catQ = false;}
    else if (cat == "Alimentaire"  && this.verifA == false) {this.verifA=true;this.catA = true;this.catE = false;this.catQ = false;this.cat = cat;}
    else if (cat == "Alimentaire"  && this.verifA == true) {this.verifA=false;this.catA = true;this.catE = false;this.catQ = false;this.cat = null;}
    else if (cat == "Quincaillerie"  && this.verifQ == false) {this.verifQ=true;this.catA = true;this.catE = false;this.catQ = false;this.cat = cat;}
    else if (cat == "Quincaillerie"  && this.verifQ == true) {this.verifQ=false;this.catA = true;this.catE = false;this.catQ = false;this.cat = null;}


    let list = this.ListProductS;



    if (this.searchtext != "") {
      this.ListProduct = list.filter(item => {
        return item.libelle.toLocaleLowerCase().match(this.searchtext.toLocaleLowerCase());
      });
    }
    if (this.currentprice != null) {
      this.ListProduct = this.ListProduct.filter(item => {
        return item.prixUnitaire < this.currentprice
      });
    }
    if(this.cat!=null) {
      this.ListProduct = this.ListProduct.filter(item => {
        return item.detailProduit.categorieProduit.toLocaleLowerCase().match(cat.toLocaleLowerCase());
      });
    }


  }

  pprice!:any;
  currentprice!:any;
  searchproductsprice() {
    // console.log(this.pprice);
    this.currentprice=this.pprice;
    let list = this.ListProductS;

    if(this.searchtext!=""){
      this.ListProduct = list.filter(item =>{return   item.libelle.toLocaleLowerCase().match(this.searchtext.toLocaleLowerCase()); });
    }
    if(this.cat!=null) {
      this.ListProduct = this.ListProduct.filter(item => {
        return item.detailProduit.categorieProduit.toLocaleLowerCase().match(this.cat.toLocaleLowerCase());
      });
    }
    this.ListProduct = this.ListProduct.filter(item =>
    {return   item.prixUnitaire<this.currentprice  });

  }

}
