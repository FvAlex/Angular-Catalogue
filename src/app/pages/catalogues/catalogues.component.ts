import {Component, Input, OnInit} from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from "rxjs";
import { FirstComponentComponent, monNoeud } from 'src/app/pages/catalogues/componentCatalogue/first-component/first-component.component';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'app-catalogues',
  templateUrl: './catalogues.component.html',
  styleUrls: ['./catalogues.component.scss']
})
export class CataloguesComponent implements OnInit{
  constructor(private http: HttpClient, private _storeService: StoreService, private _componentTree: FirstComponentComponent) {
  }
  public mesDonneesCatalogue!: any;
  public mesDonneesCatalogue_new!: any;
  public mesDonnéeAfficher!:object
  public Formation!:any;
  public FormationCalcul: any;
  public FormationResult: any;
  public Item!:any;

  @Input() affichageFormation !:object; 

  ngOnInit() {
    this._storeService.getSDC(environment.headers).subscribe(res => {
      this.mesDonneesCatalogue = this.construitTree(res);
      this._storeService.getSDC(environment.headers_new).subscribe(res => {
        this.mesDonneesCatalogue_new = this.construitTree(res);
      });
    });
    this.mesDonnéeAfficher = this._componentTree.affichageFormation
    console.log("affichage 2",this._componentTree.affichageFormation)

    // this.Formation = this._storeService.getFormation(environment.headers).subscribe(res => {
    //   this.mesDonneesCatalogue = this.construitTree(res);
    //   this._storeService.getFormation(environment.headers_new).subscribe(res => {
    //     this.mesDonneesCatalogue_new = this.construitTree(res);
    //   });
    // })
    // console.log("Formation : ", this.Formation.data)

    // this.FormationCalcul = from([this.Formation])
    // const example = this.FormationCalcul.pipe(map(this.FormationResult))
    // const subscribe = example.subscribe()
    // console.log("sub", this.FormationResult)

    // this.Formation = this._storeService.getFormation(environment.headers).subscribe
    this.Item = this._storeService.getItems().subscribe
  }

  construitTree(res:any):object{
    var chainejson = "[";
    var sommaireEnCours = "";var domaineEnCours = "";
    for(var u=0;u<res.length;u++){
      if(sommaireEnCours == "" || sommaireEnCours != res[u].Libelle){
        if(domaineEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
        if(sommaireEnCours != "") chainejson+="]},";
        sommaireEnCours = res[u].Libelle;
        chainejson+='{"name" : "'+res[u].Libelle+'", "children" : [';
      }
      if(domaineEnCours == "" || domaineEnCours != res[u].NOM_DOMAINE){
        domaineEnCours = res[u].NOM_DOMAINE;
        chainejson+='{"name": "'+res[u].NOM_DOMAINE+'"},';
      }
    }
    chainejson = chainejson.substring(0,chainejson.length-1);
    chainejson+="]}]";
    return JSON.parse(chainejson);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
} 
