import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrearViajes } from '../services/crear-viajes/registrar-viajes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-viajes',
  templateUrl: './viajes.page.html',
  styleUrls: ['./viajes.page.scss'],
  
  
})

export class ViajesPage implements OnInit {
  formularioViaje: FormGroup; 

  constructor(
    private alertController: AlertController,
    private registrador: CrearViajes,
    private fb: FormBuilder
  ) {
    // Inicializa el formulario con las propiedades y las validaciones
    this.formularioViaje = this.fb.group({ 
      
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      asientos_disp: ['', Validators.required],
      estado: [true]
    });
  }
  ngOnInit(){
    
  }

  async guardar() {
    console.log("aquii")
    if(!this.formularioViaje){
      console.error('Error this.formulario... no deifinido...');
      return;
    }
    if (this.formularioViaje.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, llenar todos los campos obligatorios.',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    // Obtén los valores del formulario
    const formData = this.formularioViaje.value;

    // Llama a la función para guardar los datos
    this.registrador.guardarViaje(formData).subscribe(
      (resultado) => {
        console.log('Registro guardado con éxito:', resultado);
      },
      (error) => {
        console.error('Error al guardar el registro:', error);
      }
    );
  }
}
