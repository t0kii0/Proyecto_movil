import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.page.html',
  styleUrls: ['./home-usuario.page.scss'],
})



export class HomeUsuarioPage implements OnInit {
  
  usuarios = [
    { nombre: 'Manuu', correo: 'manu@gmail.com', password: 'manu150', rol: 'conductor' },
    { nombre: 'Angelo', correo: 'angelo@gmail.com', password: 'angelo150', rol: 'pasajero' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {  
  }
  navegarA(opcion: String) {
    switch (opcion) {
      case 'home':
        this.router.navigate(['/home-usuario']);
        break;
      case 'configuracion':
        this.router.navigate(['/login']);
        break;
      case 'cuenta':
        this.router.navigate(['/recuperar']);
        break;
      default:
        break;
    }
  }
  salir(){
    console.log('Antes de eliminar el elemento');
    localStorage.removeItem('usuario');
    console.log('Después de eliminar el elemento');

    this.router.navigate(['/login']);
  }
  }
