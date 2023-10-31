import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { RegistrarAuto } from 'src/app/modelos/registro_auto';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RegistrosAuto {
    constructor(private _http: HttpClient) { }

    superbaseUrl = "https://staxsitmytxxwupentta.supabase.co/rest/v1/"
    supabaseHeaders = new HttpHeaders().set("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q")

    guardarAuto(registros: RegistrarAuto): Observable<string | any>{
        return this._http.post<any>(this.superbaseUrl+'AUTO',registros,{headers: this.supabaseHeaders});
      }}
