import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
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
    const recuperarClave = this.formularioRecuperar.value.correo;
    var f =  LoginPage.prototype.usuarios;

    const buscador = f.find(u => u.correo === recuperarClave);

    if(!buscador){
     const alert = await this.alertController.create({
       header: 'Datos incompletos',
       message: 'Porfavor ingresar correo valido',
       buttons: ['Aceptar'],
     });
     await alert.present();
     return;
    }else{
    const alert = await this.alertController.create({
      header: 'su usuario es' + buscador.nombre,
      message: 'su clave es esta: ' + buscador.password,
      buttons: ['Aceptar']
    })
    return await alert.present();
  }
  }

}
