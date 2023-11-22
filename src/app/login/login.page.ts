import { Component, Injectable, OnInit } from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule
} from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApiService} from '../services/user_services';
import { IUserLogin} from '../modelos/UserLogin';
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [ApiService]
})
export class LoginPage implements OnInit {

  formularioLogin: IUserLogin = {
    username: '',
    password: ''
  }
  login={
  username: '',
  password: ''}
  constructor(private route: Router, private _usuarioService: ApiService) {

  }
   
  ngOnInit(): void {

  }
  onLogin(){}
    
  

async ingresar() {
  console.log(this.login);

}
userType: string = 'conductor';
async userLogin() {
  try {
    this.userType=this.userType=='conductor'?'usuario':'pasajero';
    let user;
    console.log("Usuario existe...");
    if (this.userType === 'usuario') {
    
      user = await lastValueFrom(this._usuarioService.getLoginConductor(this.login));
      console.log("Usuario existe...", user);
    } else if (this.userType === 'pasajero') {
      user = await lastValueFrom(this._usuarioService.getLoginPasajero(this.login));
    }
    console.log("Usuario existe...", user);
    const user_id = user.toString();
    console.log(user_id);
    
    if (user_id) {
      console.log("Usuario existe...");
      localStorage.setItem('user_id', JSON.stringify(user_id));
      console.log("Usuario existe...");
      this.route.navigate([`/home-${this.userType}`], { state: { userInfo: user_id } });
      
    } else {
      // NO EXISTE
      console.log("Usuario no existe...");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}


formularioLoginRestart():void{
  this.formularioLogin.username = '';
  this.formularioLogin.password = '';
}
}