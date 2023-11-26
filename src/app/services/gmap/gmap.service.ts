import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GmapService {
  private API_KEY = 'AIzaSyBVrce6qA16MEIOhtiEBxrqMCRvEBr66AA';

  constructor(private http: HttpClient) { }

  loadGoogleMaps(): Promise<any> {
    const win = window as any;
    const gModule = win.google;
    if(gModule && gModule.maps) {
      return Promise.resolve(gModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://maps.google.com/map/api/js?key=' + 
      environment.googleMapsApiKey + '&callback=Function.prototype';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () =>{
        const loadedGoogleModule = win.google;
        if(loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        }else{
          reject('Google Map SDK is not Avaliable');
        }
      };
  });
}
getCoordinates(address: string): Promise<any> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.API_KEY}`;
  
  return this.http.get(url).toPromise();
}
}