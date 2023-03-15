import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  { path: 'about', component: AboutComponent},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
