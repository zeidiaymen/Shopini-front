import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Product} from "../../../shared/models/product";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //private productUrl = `${environment.url}/product`;
  baseurl=environment.url+"produit/" ;
  Products :Product[]=[];

  constructor(private  http:HttpClient) { }

  getAllProducts() :Observable<Product[]>{
    //return this.Products;
    return this.http.get<Product[]>(this.baseurl+"retrieve-all-produits");
  }
  getProductById(idp:any) :Observable<Product>{
    //return this.Products;
    return this.http.get<Product>(this.baseurl+"retrieve-produit/"+idp);
  }

  addproduct(p:Product){
    return this.http.post(this.baseurl+'add-produit/',p);
  }
  deleteproduct(idp: any){
    return this.http.delete(this.baseurl+'remove-produit/'+idp);
  }
  updateproduct(p:Product){
    return this.http.put(this.baseurl+'modify-produit/',p);
  }


  deleteTempProductImages(){
    return this.http.delete(this.baseurl+'deletetemp');
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseurl+'upload/', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(this.baseurl+'files/');
  }
  saveToMain(): Observable<any> {
    return this.http.get(this.baseurl+'savetomain/');
  }


  exportproductsgeolocationscsv(): Observable<any> {
    const dataQueryURL =this.baseurl + 'download-geomap-csv/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/csv; charset=UTF-8'
      }),
      responseType: 'text' as 'text'
    };
    return this.http.get(dataQueryURL, httpOptions);
  }

  exportproductsgeolocationsPDF(): Observable<any>
  {
    const dataQueryURL =this.baseurl + 'download-geomap-pdf/';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'Application/pdf; charset=UTF-8'
      }),
      responseType: 'blob' as 'blob'
    };
    return this.http.get(dataQueryURL, httpOptions);
  }

  uploadcsv(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.baseurl+'uploadcsv/', formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  stats(): Observable<any> {
    return this.http.get(this.baseurl+'retrieve-all-produits-stats/');
  }
}
