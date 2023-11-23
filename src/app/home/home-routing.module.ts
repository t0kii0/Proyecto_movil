import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { IonicModule } from '@ionic/angular';
import { MapComponent } from './map/map.component';

const routes: Routes = [ 
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), IonicModule,HomePageRoutingModule],
  exports: [HomePage, MapComponent, RouterModule]
})
export class HomePageRoutingModule {}
