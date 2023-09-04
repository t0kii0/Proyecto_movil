import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  usuarios = [
    { nombre: 'Manuu', correo: 'manu@gmail.com', password: 'manu150',rol: 'conductor' },
    { nombre: 'Angelo', correo: 'angelo@gmail.com', password: 'angelo150',rol: 'pasajero' },
  ];
  
  constructor(public fb: FormBuilder,  
    public alertController: AlertController, private router: Router){

    this.formularioLogin = this.fb.group({
      'nombre' : new FormControl("",Validators.required),
      'password' : new FormControl("",Validators.required)
    })
  }  
  ngOnInit() {
  }
  async ingresar() {
    var f = this.formularioLogin.value;
    const usuario = this.usuarios.find(u => u.nombre === f.nombre && u.password === f.password); 
  
    if (usuario) {
      console.log('Ingreso exitoso');
      this.router.navigate(['/home-usuario']);
      const alert = await this.alertController.create({
        header: 'Bienvenido ' + usuario.nombre,
        message: 'Has ingresado correctamente',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos',
        message: 'Los datos son incorrectos',
        buttons: ['Aceptar'],
      });
      await alert.present();
    }
  }
}
