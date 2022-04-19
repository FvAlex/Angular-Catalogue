import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { CatalogueService } from './second-catalogue.service';
import { TodoItemFlatNode } from './model/catalogue.model';
import { TodoItemNode } from './model/catalogue.model';
import { StoreService } from 'src/app/services/store.service';
import { HttpClient } from '@angular/common/http';
import { CataloguesComponent } from '../../catalogues.component';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

interface monNoeud{
  name?:string;
  children?: monNoeud[];
}
 

@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.scss']
})
export class SecondComponentComponent {

  treeControl = new NestedTreeControl<monNoeud>(node => node.children);
  dataSource = new MatTreeNestedDataSource<monNoeud>();

  /**  Date Catalogue*/

  year!:number;
  yearNow: number = new Date().getFullYear();
  yearLessOne: number = new Date().getFullYear() - 1;
  yearLessTwo: number = new Date().getFullYear() - 2;
  yearLessThree: number = new Date().getFullYear() - 3;
  yearLessFour: number = new Date().getFullYear() - 4;  

  ////////////

  @Input() mesDonnees!: object;

  constructor(private _service: StoreService, private _component: CataloguesComponent) {
    console.log("test",this._service.getSDC(this.mesDonnees))
  }

  public mesDonneesCatalogue!: any;
  public mesDonneesCatalogue_new!: any;


  ngOnInit():void {
    this._service.getSDC(environment.headers).subscribe(res => {
      this.mesDonneesCatalogue = this.construitTree(res);
      console.log(this.mesDonneesCatalogue)
      this._service.getSDC(environment.headers_new).subscribe(res => {
        this.mesDonneesCatalogue_new = this.construitTree(res);
      });
    });
    
  }

  hasChild = (_: number, node: monNoeud) => !!node.children && node.children.length > 0;

  construitTree(res:any):object[]{
    var chainejson = "[";
    var sommaireEnCours = "";var domaineEnCours = "";
    for(var u=0;u<res.length;u++){
      // if(sommaireEnCours != "" && sommaireEnCours != res[u].Libelle){
      //   chainejson = chainejson.substring(0,chainejson.length-1);
      // }
      
      
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

    // this.data = this.buildFileTree(JSON.parse(chainejson), 0);
    // var monJSON = {'Bureautique':{'Bureautique':null},'Outils graphiques':{'Outils graphiques':null},'Informatique':{'Développement':null,'Base de données':null,'Infrastructure':null,'Management du SI':null},'Management':{'Management':null},'Qualité de vie au travail':{'Droit social/Prévention/Qualité de vie au travail':null},'Efficacité professionnelle':{'Communication':null,'Développement personnel':null},'Performance commerciale':{'Négociation commerciale':null,'Efficacité au téléphone':null,'Management des ventes':null},'Communication digitale':{'Marketing / Communication digitale':null},'Comptabilité Gestion':{'Comptabilité ':null,'Paie':null,'Gestion':null,'Fiscalité':null,'Logiciels':null},'Langues':{'Anglais':null}};
    // this.Sdcs = res;
    var monJSON = JSON.parse(chainejson)
    console.log('chaine :', monJSON)
   

    return  this.dataSource.data = JSON.parse(chainejson)
  }
    
  yearNowModel() : void {
    this.year = this.yearNow
  }
  yearLessOneModel() : void {
    this.year = this.yearLessOne
  }
  yearLessTwoModel() : void {
    this.year = this.yearLessTwo
  }
  yearLessThreeModel() : void {
    this.year = this.yearLessThree
  }
  yearLessFourModel() : void {
    this.year = this.yearLessFour
  }


}
