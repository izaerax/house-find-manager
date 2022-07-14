import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseEditComponent } from './pages/houses/house-list/house-edit/house-edit.component';
import { HouseListComponent } from './pages/houses/house-list/house-list.component';

const routes: Routes = [{
  path: '',
  component: HouseListComponent,
  title: 'Home',
  children: [{
    path: ':id',
    component: HouseEditComponent,
  }]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
