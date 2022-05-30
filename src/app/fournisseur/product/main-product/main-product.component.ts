import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {catchError, map} from "rxjs/operators";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-product',
  templateUrl: './main-product.component.html',
  styleUrls: ['./main-product.component.css']
})
export class MainProductComponent implements OnInit {
  ListProduct!:Product[];
  produit=new Product();
  //map
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 35, lng: 9};
  zoom = 6;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition!: google.maps.LatLngLiteral;
  verifmap=-1;
  showmap(map:any,i:any) {
    if(this.verifmap==i) this.verifmap=-1;
    else {this.verifmap=i; this.markerPosition={lat: map.lat, lng: map.lng}; console.log(i+this.markerPosition); }
  }
  constructor(httpClient: HttpClient,private productService:ProductService,private  route:Router) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBc-A_UD1XAqk3B1CyJczYw6AyQ3xUJgj0', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }
  stats !:any;
  elect=-1;
  ali=-1;
  qui=-1;

  ngOnInit(): void {
    this.getAllProducts();

    /*  this.productService.stats().subscribe((d)=>{
        //console.log(d);
        this.stats=d;

      })*/
//console.log(this.stats);

  }

  stat(){
    console.log(this.stats[0]);

    for(let s of this.stats)
    {
      console.log(s);
    }
  }


  imgCollection: Array<object> = [];
  verifslider=-1;
  showimages(images:any,i:any) {
    if(this.verifslider==i){
      for (let img of images) {
        let obj = {'i': i, 'image': img.url, 'thumbImage': img.url, 'alt': img.name, 'title': img.name};
        this.imgCollection.splice(this.imgCollection.indexOf(obj), 1);
      }
      this.verifslider=-1;
    }
    else{
      this.imgCollection=[];
      this.verifslider=i;
      console.log(images);
      for (let img of images) {
        console.log(i.url);
        this.imgCollection.push({'i':i,'image':img.url,'thumbImage':img.url,'alt':img.name,'title':img.name});
      }
    }

  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((d)=>{
      //console.log(d);
      this.ListProduct=d;
      //  console.log(this.ListProduct[0]);
    })
  }

//CSV
  exportCSV(){
    this.productService.exportproductsgeolocationscsv().subscribe(data => {
      const file = new Blob([data], { type: 'application/csv' });
      var fileURL = URL.createObjectURL(file) ;

      var anchor = document.createElement("a");
      anchor.download = "GeoMapLocations.csv";
      anchor.href = fileURL;
      anchor.click();
    }) ;
  }
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        // reader.onload = (e: any) => {
        // console.log(e.target.result);
        //this.previews.push(e.target.result);
        //   };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
  successNotification(){
    Swal.fire('Date : '+new Date().toString(), 'file have  been loaded in DataBase !', 'success');
  }
  upload(idx: number, file: File): void {
    //  this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      //  console.log("file upload:"+file.name );
      this.productService.uploadcsv(file).subscribe(
        (event: any) => {
          console.log("file event:"+event);
          this.successNotification();
        },
        (err: any) => {
          console.log("file err:"+err);
        });
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
  loadCSV(){

  }

  exportPDF()
  {
    this.productService.exportproductsgeolocationsPDF().subscribe((data)=>{
      const file = new Blob([data], { type: 'application/pdf' });
      var fileURL = URL.createObjectURL(file) ;

      var anchor = document.createElement("a");
      anchor.download = "GeoMapLocations.pdf";
      anchor.href = fileURL;
      anchor.click();
    }) ;
  }

  afterDeleteProduct( e:Product ){
    console.log(e);
    let j=this.ListProduct.indexOf(e);
    this.ListProduct.splice(j,1);
    Swal.fire('Date : '+new Date().toString(), 'Product'+e.libelle+' have  been Deleted from DataBase !', 'success');

    // this.route.navigateByUrl('/fournisseur/productM');
  }



}
