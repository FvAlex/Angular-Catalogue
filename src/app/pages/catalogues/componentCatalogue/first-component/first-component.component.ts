import {SelectionModel} from '@angular/cdk/collections';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { environment } from 'src/environments/environment';
import { CataloguesComponent } from '../../catalogues.component';
import { TodoItemFlatNode } from './model/catalogue.model';
import { TodoItemNode } from './model/catalogue.model';
import { ActivatedRoute, Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

export interface monNoeud{
  name?:string;
  children?: monNoeud[];
}

 @Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.scss']
})


export class FirstComponentComponent implements OnInit {
  treeControl = new NestedTreeControl<monNoeud>(node => node.children);
  dataSource = new MatTreeNestedDataSource<monNoeud>();


  /**  Date Catalogue*/

    year!:number;
    yearNow: number = new Date().getFullYear();
    yearLessOne: number = new Date().getFullYear() - 1;
    yearLessTwo: number = new Date().getFullYear() - 2;
    yearLessThree: number = new Date().getFullYear() - 3;
    yearLessFour: number = new Date().getFullYear() - 4; 

  /////////////
  @Input() mesDonnees!: object;

  constructor(private _service: StoreService, private route: ActivatedRoute,  private router: Router) {
    // this.dataSource.data = this.mesDonnees
    // console.log("mes données", this.mesDonnees)
    // console.log("test",this._service.getSDC(this.mesDonnees))
  //   this.route.queryParams.subscribe(params => {
  //     this.id_formation = params['id_formation'];
  //     //L'attribut prenom contient "Jean"
  //     this.id_formation2 = params['id_formation2'];
  //     //L'attribut nom contient "Dupont"
  // });
  }  
  
  public mesDonneesCatalogue!: any;
  public mesDonneesCatalogue_new!: any;

  /* Variables qui récupérent les id de formations des deux treeviews */

  // id_formation!:number;
  // id_formation2!:number;
  id_1!:string;
  id_2!:string;
  id_formation:string = "id_formation";
  id_formation2:string = "id_formation2";

  /////////////

  ngOnInit() {
    // console.log("mes données", this.mesDonnees);
    this._service.getSDC(environment.headers).subscribe(res => {
      this.mesDonneesCatalogue = this.construitTree(res);
      // console.log("Mes données First Component : ", this.mesDonneesCatalogue)
      this._service.getSDC(environment.headers_new).subscribe(res => {
        this.mesDonneesCatalogue_new = this.construitTree(res);
        // console.log("Mes données Second Component : ", this.mesDonneesCatalogue)
      });
    });

    this.id_1 = this.route.snapshot.params['id_formation']
    this.id_2 = this.route.snapshot.params['Libelle']

    console.log("id1",this.id_1)
    console.log("id2",this.id_2)
  }  
  
  hasChild = (_: number, node: monNoeud) => !!node.children && node.children.length > 0;

  construitTree(res:any):object[]{
    var chainejson = "[";
    var sommaireEnCours = "";
    var domaineEnCours = "";
    var categorieEnCours = "";
    var formationEnCours = "";
    for(var u=0;u<res.length;u++){
     
        // Sommaire
      if(sommaireEnCours == "" || sommaireEnCours != res[u].Libelle){
        if(formationEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
        if(categorieEnCours != "") chainejson+="],";
        if(categorieEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
        if(domaineEnCours != "") chainejson+="}]},";
        if(domaineEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
        if(sommaireEnCours != "") chainejson+="]},";
        sommaireEnCours = res[u].Libelle;
        chainejson+='{"name" : "'+res[u].Libelle+'", "children" : [';

        domaineEnCours = res[u].NOM_DOMAINE;
        chainejson+='{"name": "'+res[u].NOM_DOMAINE+'", "children" : [';

        categorieEnCours = res[u].titrecategorie;
        chainejson+='{"name": "'+res[u].titrecategorie+'", "children" : [';

        formationEnCours = res[u].titreformation;
        chainejson+='{"name": "'+res[u].titreformation+'"},';
      }
      else{
        // Domaine
        if(domaineEnCours == "" || domaineEnCours != res[u].NOM_DOMAINE){
          if(categorieEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
          if(domaineEnCours != "") chainejson+="]},";
          domaineEnCours = res[u].NOM_DOMAINE;
          chainejson+='{"name": "'+res[u].NOM_DOMAINE+'", "children" : [';
          categorieEnCours = res[u].titrecategorie;
          chainejson+='{"name": "'+res[u].titrecategorie+'"},';
        } else {
           //Categorie
          if(categorieEnCours == "" || categorieEnCours != res[u].titrecategorie){
            if(formationEnCours != "") chainejson = chainejson.substring(0,chainejson.length-1);
            if(categorieEnCours != "") chainejson+="]},";
            categorieEnCours = res[u].titrecategorie;
            chainejson+='{"name": "'+res[u].titrecategorie+'", "children" : [';
            formationEnCours = res[u].titreformation;
            chainejson+='{"name": "'+res[u].titreformation+'"},';
          } else {
            //Formation
            if(formationEnCours == "" || formationEnCours != res[u].titreformation){
              formationEnCours = res[u].titreformation;
              chainejson+='{"name": "'+res[u].titreformation+'"},';
            }
          }
        }
      }
    }
    chainejson = chainejson.substring(0,chainejson.length-1);
    chainejson+="]}]}]}]";
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

  // Drag and Drop 

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
     console.log("drop",this.dataSource.data)
    // console.log("draganddrop",this.drop)
  }

  //////////////////////

  // Affichage Formation

  tableauFormation!:object[]
  ResultFormation!:object;

  // affichageFormation(){
    
  //   // this.router.navigateByUrl(`/`)

  //   this.route.queryParams.subscribe(params => {
  //     this.id_formation = params['id_formation'];
  //     //L'attribut prenom contient "Jean"
  //     this.id_formation2 = params['id_formation2'];
  //     //L'attribut nom contient "Dupont"
  // });
  //   // console.log(  "tableau",  this.tableauFormation = this.dataSource.data)
  //   // this.tableauFormation = this.dataSource.data
      
  //   // return res = this.tableauFormation
  // }
  
 affichageFormation(){
  //   console.log('monid_Formation', monid_Formation);
  //   if(monId_Formation2AuDepart != 0){
  //     window.location.href = "catalogue&id_formation="+monid_Formation+"&id_formation2="+monId_Formation2AuDepart;  
  //   }
  //   else if(monId_FormationAuDepart != 0){
  //     window.location.href = "catalogues.php?rubrique=Gestion+des+catalogues&id_formation="+monId_FormationAuDepart+"&id_formation2="+monid_Formation2;  
  //   }
  //   else {
  //     window.location.href = "catalogue&id_formation="+monid_Formation;
  //   // }
  //   // else{
  //   //   window.location.href = "catalogues.php?rubrique=Gestion+des+catalogues&id_formation2="+monid_Formation2;
  //   // }
   };




}

