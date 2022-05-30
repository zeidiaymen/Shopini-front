import { Component, OnInit } from '@angular/core';
import {Product} from "../../../shared/models/product";
import {DetailProduit} from "../../../shared/models/detailProduit";
import {Observable, of} from "rxjs";
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {ProductService} from "../service/product.service";
import {Router} from "@angular/router";
import {catchError, map} from "rxjs/operators";
import {UserService} from "../../../shared/userService/user.service";
import {user} from "../../../shared/models/user";

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product = new Product();
  productdetail = new DetailProduit();
  idf:any;

  //map
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = {lat: 35, lng: 9};
  zoom = 6;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPosition!: google.maps.LatLngLiteral;

  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng!=null)
      //this.center = (event.latLng.toJSON());
      this.markerPosition=event.latLng.toJSON();
//console.log(this.center);
  }

  //map
  constructor(httpClient: HttpClient,private productService:ProductService,private route:Router,private userService: UserService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyBc-A_UD1XAqk3B1CyJczYw6AyQ3xUJgj0', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

  }
  token!:any;
  currentUser!: user;
  currentUser2!: any;
  ngOnInit(): void {
    this.productService.deleteTempProductImages().subscribe(()=>{
        console.log("good ");
      },
      (error )=>{
        console.log("error");
      },
      ()=>{console.log("complete");});
    console.log("ze");

    this.token = localStorage.getItem('token');
    this.userService.getUserFromToken(this.token).subscribe( data => {

      this.currentUser = data;
   //   console.log(this.currentUser.id);

    });
 // tabdila
    this.currentUser2='FOU21M0001';
  }

  addproduct(){
 //   console.log(this.currentUser.id);
    this.product.detailProduit=this.productdetail;
    this.product.fournisseur={'id': this.currentUser.id };
    console.log(this.product.fournisseur);
    this.product.mapLocalisation=this.markerPosition;
    this.imageInfos?.subscribe((data)=> {console.log(data);this.product.imagesProduit=data; } )  ;
    console.log(this.product);
    this.productService.addproduct(this.product).subscribe(()=>{
        console.log("good ");
        this.route.navigateByUrl('/fournisseur/productM');
      },
      (error )=>{
        console.log("error");
      },
      ()=>{console.log("complete");} );

  }
///////////////////////////////////
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

        reader.onload = (e: any) => {
          // console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      //  console.log("file upload:"+file.name );
      this.productService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.imageInfos = this.productService.getFiles();
            // console.log(this.imageInfos);
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
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



}
