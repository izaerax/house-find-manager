import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseEditComponent } from './pages/houses/house-list/house-edit/house-edit.component';
import { HouseListComponent } from './pages/houses/house-list/house-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'not-found', component: PageNotFoundComponent },
  {
    path: '',
    component: HouseListComponent,
    title: 'Home',
    children: [
      { path: ':id', component: HouseEditComponent }
    ]
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
