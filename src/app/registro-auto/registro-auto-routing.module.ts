import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroAutoPage } from './registro-auto.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroAutoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroAutoPageRoutingModule {}
