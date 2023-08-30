import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  
  constructor(public fb: FormBuilder,  
    public alertController: AlertController){

    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required)
    })
  }  
  ngOnInit() {
  }
  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');
  
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      
      if (usuario.nombre === f.nombre && usuario.password === f.password) {
        console.log('Ingreso exitoso');
        const alert = await this.alertController.create({
          header: 'Bienvenido',
          message: 'Has ingresado correctamente',
          buttons: ['Aceptar']
        });
        await alert.present();
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Los datos son incorrectos',
          buttons: ['Aceptar']
        });
        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        header: 'Usuario no encontrado',
        message: 'No se encontró un usuario en el almacenamiento local.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }
  
}
