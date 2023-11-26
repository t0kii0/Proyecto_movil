import { Component, OnInit } from '@angular/core';
import { CrearViajes } from '../services/crear-viajes/registrar-viajes';
import { ModelViajes } from 'src/app/modelos/Viajes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-viajes',
  templateUrl: './disponible.page.html',
  styleUrls: ['./disponible.page.scss'],
})
export class DisponiblePage implements OnInit {
  viajes: ModelViajes[] = [];

  constructor(private obtenerViajes: CrearViajes, private router: Router) { }

  ngOnInit() {
    this.obtenerViajes.obtenerTodosLosViajes().subscribe(
      (data: ModelViajes[]) => {
        this.viajes = data;
      },
      error => {
        console.error('Error al obtener los viajes', error);
      }
    );
  }
  verMap(){
    this.router.navigate(['./test']);
  }
}
