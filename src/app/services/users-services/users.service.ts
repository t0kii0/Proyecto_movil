import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  supabaseURL = "https://staxsitmytxxwupentta.supabase.co";
  supabaseHttpHeaders = new HttpHeaders()
  .set("apiKey", "API_KEY")

  constructor(private  _httpclient: HttpClient) { }

  getUserType(user_id: string): Observable<any>{
    console.log("[src][app][services][users-services][users-service]")
    return this._httpclient.get<any>(this.supabaseURL+'users_company?select=id,user,company(*)&user=eq.'+user_id, { headers: this.supabaseHttpHeaders, responseType: 'json'}).pipe(
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
