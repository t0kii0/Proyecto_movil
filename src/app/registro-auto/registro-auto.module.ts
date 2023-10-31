import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistroAutoPageRoutingModule } from './registro-auto-routing.module';

import { RegistroAutoPage } from './registro-auto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroAutoPageRoutingModule
  ],
  declarations: [RegistroAutoPage]
})
export class RegistroAutoPageModule {}
