import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroPasajeroPageRoutingModule } from './registro-pasajero-routing.module';

import { RegistroPasajeroPage } from './registro-pasajero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroPasajeroPageRoutingModule
  ],
  declarations: [RegistroPasajeroPage]
})
export class RegistroPasajeroPageModule {}
