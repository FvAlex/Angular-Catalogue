import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialExampleModule } from 'src/materiel.module';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CataloguesComponent } from './pages/catalogues/catalogues.component';
import { FirstComponentComponent } from './pages/catalogues/componentCatalogue/first-component/first-component.component';
import { SecondComponentComponent } from './pages/catalogues/componentCatalogue/second-component/second-component.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from "@angular/common/http";
import { CatalogueService } from './pages/catalogues/catalogue.service';
import { StoreService } from './services/store.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    CataloguesComponent,
    FirstComponentComponent,
    SecondComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    MaterialExampleModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [StoreService, FirstComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
