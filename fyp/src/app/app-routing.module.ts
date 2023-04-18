import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { LiveDataComponent } from './components/live-data/live-data.component';
import { NewsComponent } from './components/news/news.component';
import { ClimateChangeComponent } from './components/climate-change/climate-change.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { OurFindingComponent } from './components/our-finding/our-finding.component';
import { MapComponent } from './components/map/map.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'live-data', component: LiveDataComponent},
  { path: 'map', component: MapComponent },
  { path: 'news', component: NewsComponent},
  { path: 'finding', component: OurFindingComponent},
  { path: 'climate-change', component: ClimateChangeComponent},
  { path: '**', component: PageNotFoundComponent}, // Wild card. This has to be at the end within routes.
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
