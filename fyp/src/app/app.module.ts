import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LightgalleryModule } from 'lightgallery/angular';

import { DatabaseService } from './services/database.service';
import { ApiService } from './services/api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ChartComponent } from './components/chart/chart.component';
import { NewsComponent } from './components/news/news.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClimateChangeComponent } from './components/climate-change/climate-change.component';
import { OurFindingComponent } from './components/our-finding/our-finding.component';
import { LiveDataComponent } from './components/live-data/live-data.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalService } from './services/global.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { WeatherComponent } from './components/weather/weather.component';
import { MarineComponent } from './components/marine/marine.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    LoginComponent,
    ChartComponent,
    NewsComponent,
    PageNotFoundComponent,
    ClimateChangeComponent,
    OurFindingComponent,
    LiveDataComponent,
    MapComponent,
    NavbarComponent,
    FooterComponent,
    JumbotronComponent,
    WeatherComponent,
    MarineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    LightgalleryModule
  ],
  providers: [DatabaseService, ApiService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
