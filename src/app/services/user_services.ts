import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map, of ,throwError } from "rxjs";
import { IUserLogin } from '../User/UserLogin';
import { ResponseI } from "../User/Response";

@Injectable({ providedIn: 'root' 
})
export class ApiService {
    URL_SUPABASE = 'https://staxsitmytxxwupentta.supabase.co/rest/v1/'

    constructor(private http: HttpClient, private _httpclient: HttpClient){

    }
    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q')

   
    getLogin(form: IUserLogin): Observable<ResponseI>{
        let direccion = this.URL_SUPABASE + 'auth';
        return this.http.post<ResponseI>(direccion, form);
    
    }
    authUSer(): Observable<IUserLogin>{
        return this._httpclient.get<IUserLogin>(this.URL_SUPABASE.concat('?username_cond=eq.manus'), {headers: this.supabaseheaders.set('Accept','application/vnd.pgrst.object+json'),responseType: 'json'})
    }
}