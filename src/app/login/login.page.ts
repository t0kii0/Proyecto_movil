import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = 'https://staxsitmytxxwupentta.supabase.co/rest/v1/CONDUCTOR';

  constructor(private http: HttpClient) {}

  getData() {
    const headers = new HttpHeaders({
      'apiKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q'
    });

    return this.http.get(this.apiUrl, { headers });
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  usuarios = [
    { nombre: 'Manuu', correo: 'manu@gmail.com', password: 'manu150', rol: 'conductor' },
    { nombre: 'Angelo', correo: 'angelo@gmail.com', password: 'angelo150', rol: 'pasajero' },
  ];

  constructor(public fb: FormBuilder,
    public alertController: AlertController, private router: Router, private http: HttpClient, private ApiService: ApiService) {
    this.formularioLogin = this.fb.group({
      'nombre': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.ApiService.getData().subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.error('Error', error);
      }
    );
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
