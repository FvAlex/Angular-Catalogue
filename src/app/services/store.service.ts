import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class StoreService {

  constructor(private http:HttpClient) { }

  public getFormation(monHeader:any): Observable<any> {
    const urlService:string = "/njsite/catalogue/formation_getAll";
    const data = "";
    return this.http.post(urlService,data,{ headers: new HttpHeaders(monHeader)});
  }
  // Récupération des Sommaires / Domaines / Catégorie 
  public getSDC(monHeader:any): Observable<any> {
    const urlService:string = "/njsite/catalogue/formation_getSDC";
    const data = "";
    return this.http.post(urlService,data,{ headers: new HttpHeaders(monHeader)});
  }
  public getItems(): Observable<any> {
    const urlService:string = "/njsite/catalogue/formation_getItems";
    const data = "";
    return this.http.post(urlService,data,{});
  }

}