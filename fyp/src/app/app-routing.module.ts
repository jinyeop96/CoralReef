import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { ChartComponent } from './components/chart/chart.component';
import { NewsComponent } from './components/news/news.component';
import { ClimateChangeComponent } from './components/climate-change/climate-change.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'chart', component: ChartComponent},
  { path: 'news', component: NewsComponent},
  { path: 'climate-change', component: ClimateChangeComponent},
  { path: '**', component: PageNotFoundComponent}, // Wild card. This has to be at the end within routes.
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
