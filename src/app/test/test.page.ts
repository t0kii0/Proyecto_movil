import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GmapService } from '../services/gmap/gmap.service';
import { Subscription } from 'rxjs';
import { CrearViajes } from '../services/crear-viajes/registrar-viajes';
import { ModelViajes } from '../modelos/Viajes';
import { ActivatedRoute, Router } from '@angular/router';

declare var googleMaps: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit, OnDestroy {

  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  map: any;
  directionsService: any;
  directionsDisplay: any;
  markers: any[] = [];
  trackSub: Subscription;

  viajes: ModelViajes[] = [];
  viajeSeleccionado: ModelViajes;

  constructor(
    private maps: GmapService,
    private apiService: CrearViajes,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    try {
      const navigationState = this.router.getCurrentNavigation().extras.state;
      if (navigationState && navigationState['viajeSeleccionado']) {
        this.viajeSeleccionado = navigationState['viajeSeleccionado'];
        console.log('Viaje seleccionado:', this.viajeSeleccionado);
      } else {
        // Solo carga todos los viajes si no hay un viaje seleccionado
        this.viajes = await this.apiService.obtenerTodosLosViajes().toPromise();
        console.log('Viajes obtenidos:', this.viajes);
      }
  
      // Llama a loadMap independientemente de si hay un viaje seleccionado o no
      this.loadMap();
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }

  async loadMap() {
    try {
      console.log('this.viajeSeleccionado en loadmap: ', this.viajeSeleccionado);
      this.googleMaps = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
  
      let viajesToShow = this.viajes;
  
      if (this.viajeSeleccionado) {
        // Si hay un viaje seleccionado, mostrar solo esa ruta
        viajesToShow = [this.viajeSeleccionado];
      }
  
      const allLocations = viajesToShow.reduce((acc, viaje) => {
        acc.push({ lat: viaje.origen_lat, lng: viaje.origen_lng });
        acc.push({ lat: viaje.destino_lat, lng: viaje.destino_lng });
        return acc;
      }, []);
  
      const center = this.calculateCenter(allLocations);
  
      this.map = new this.googleMaps.Map(mapEl, {
        center: center,
        disableDefaultUI: true,
        zoom: 13,
      });
  
      this.directionsService = new this.googleMaps.DirectionsService();
      this.directionsDisplay = new this.googleMaps.DirectionsRenderer();
      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 4,
          strokeOpacity: 1,
          strokeColor: 'black'
        },
        suppressMarkers: true
      });
  
      console.log('Datos de viajes:', viajesToShow);
  
      if (viajesToShow && viajesToShow.length > 0) {
        viajesToShow.forEach((viaje, index) => {
          console.log(`iteracion ${index + 1} del bucle`, this.map);
  
          const source = { lat: viaje.origen_lat, lng: viaje.origen_lng };
          const dest = { lat: viaje.destino_lat, lng: viaje.destino_lng };
  
          this.addMarkers(source, dest);
          this.drawRoute(source, dest, index);
        });
      } else {
        console.log('No hay datos de viajes disponibles');
      }
  
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log(e);
    }
  }
  
  
  calculateCenter(locations: any[]) {
    if (locations.length === 0) {
      return { lat: 0, lng: 0 };
    }
    const validLocations = locations.filter(location => !isNaN(location.lat) && !isNaN(location.lng));

    if (validLocations.length === 0) {
      return { lat: 0, lng: 0 };
    }

    const latitudes = locations.map(location => location.lat);
    const longitudes = locations.map(location => location.lng);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    return { lat: centerLat, lng: centerLng };
  }

  addMarkers(source: any, dest: any) {
    const sourceCoords = {
      lat: parseFloat(source.lat),
      lng: parseFloat(source.lng)
    };

    const destCoords = {
      lat: parseFloat(dest.lat),
      lng: parseFloat(dest.lng)
    };

    const source_marker = new this.googleMaps.Marker({
      position: sourceCoords,
      label: 'O',
    });

    const destination_marker = new this.googleMaps.Marker({
      position: destCoords,
      label: 'D',
    });

    source_marker.setMap(this.map);
    destination_marker.setMap(this.map);

    this.markers.push(source_marker, destination_marker);
  }

  ngOnDestroy(): void {
    if (this.trackSub) this.trackSub.unsubscribe();
  }

  drawRoute(source: any, dest: any, index: number) {
    console.log('Llamada al draw route')
    const sourceCoords = {
      lat: parseFloat(source.lat),
      lng: parseFloat(source.lng)
    };
  
    const destCoords = {
      lat: parseFloat(dest.lat),
      lng: parseFloat(dest.lng)
    };
  
    this.directionsService.route({
      origin: sourceCoords,
      destination: destCoords,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      console.log('Respuesta de la solicitud de ruta:', response);
      console.log('Estado de la solicitud de ruta:', status);
  
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log(`Ruta ${index + 1} cargada`);
      } else {
        console.log(`Error cargando ruta ${index + 1}`, status);
      }
    });
  }
  
}
