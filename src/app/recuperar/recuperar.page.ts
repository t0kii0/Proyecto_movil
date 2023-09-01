import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  formularioRecuperar: FormGroup;
  constructor(public fb: FormBuilder,
    public alertController: AlertController) {
      this.formularioRecuperar = this.fb.group({
        'correo' : new FormControl("",Validators.required)  
      }) 
     }

  ngOnInit() {
  }
  async recuperar(){
    
    var f =  localStorage.getItem('correo');

    if(this.formularioRecuperar.invalid || f !== localStorage.getItem('correo')){
     const alert = await this.alertController.create({
       header: 'Datos incompletos',
       message: 'Porfavor ingresar correo valido',
       buttons: ['Aceptar'],
     });
     await alert.present();
     return;
    }else{
    const alert = await this.alertController.create({
      header: 'su contraseña es',
      message: 'su clave es esta: ',
      buttons: ['Aceptar']
    })
    return await alert.present();
  }
  }

}
