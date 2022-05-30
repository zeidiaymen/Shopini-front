import {DetailProduit} from "./detailProduit";

export class Product {
  idProduit !: number;
  code !:string;
  libelle !:string;
  imagesProduit !:any;
  prixUnitaire !:number;
  detailProduit !:DetailProduit ;
  fournisseur !:any;
  mapLocalisation!:any;
  //prod!:any;
}
