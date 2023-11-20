import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MostrarUsers {

  supabaseURL = "https://staxsitmytxxwupentta.supabase.co/rest/v1/";
  supabaseHttpHeaders = new HttpHeaders()
  .set("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q")

  constructor(private _httpclient: HttpClient) { }


  getUserType(user_id: string): Observable<any>{
    console.log("[src][app][services][MostrarUsers][home_users]")
    return this._httpclient.get<any>(this.supabaseURL+'PASAJERO?user_id=eq.'+user_id, { headers: this.supabaseHttpHeaders, responseType: 'json'}).pipe(
      map( (data) => {
        console.log(data);
        return data;
      }),
      catchError( (error) => {
        console.log(error)
        return error;
      })
    );
  }
}