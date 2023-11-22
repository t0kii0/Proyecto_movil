import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, map, of ,throwError } from "rxjs";
import { IUserLogin } from '../modelos/UserLogin';
import { ResponseI } from "../modelos/Response";
import { UserModel}  from "../modelos/Usersmodel"
import { UserPasajero } from "../modelos/UserPasajero";
@Injectable({ providedIn: 'root' 
})
export class ApiService {
    getLoginUser(userLoginInfo: IUserLogin): Observable<unknown> {
      throw new Error('Method not implemented.');
    }
    URL_SUPABASE = 'https://staxsitmytxxwupentta.supabase.co/rest/v1/'

    constructor(private http: HttpClient, private _httpclient: HttpClient){

    }
    supabaseheaders = new HttpHeaders()
        .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YXhzaXRteXR4eHd1cGVudHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3NzQ2NjksImV4cCI6MjAxMTM1MDY2OX0.zwia42h8na8h1p52H0L8B_-IkHAS-WooRAWP5nGlC2Q')

    getUserListSupaBase(): Observable<UserModel[]> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE, { headers: this.supabaseheaders, responseType: 'json' });
    }
    getUser(user_id: string): Observable<UserModel> {
        return this._httpclient.get<UserModel[]>(this.URL_SUPABASE + 'CONDUCTOR?username_cond=eq.' + user_id, { headers: this.supabaseheaders, responseType: 'json' }).pipe(
            map( (userInfo) => {
                return userInfo[0];
            })
        );
    }
    getPasajero(user_id: string): Observable<UserPasajero > {
        return this._httpclient.get<UserPasajero[]>(this.URL_SUPABASE + 'PASAJERO?nombre_pas=eq.' + user_id, { headers: this.supabaseheaders, responseType: 'json' }).pipe(
            map( (userInfo) => {
                return userInfo[0];
            })
        );
    }
    authUser(): Observable<UserModel> {
        return this._httpclient.get<UserModel>(this.URL_SUPABASE.concat('?username=eq.'), { headers: this.supabaseheaders.set('Accept', 'application/vnd.pgrst.object+json'), responseType: 'json' })
    }
   
   getLoginPasajero(iUserLogin: any): Observable<string | any> {
        console.log("Usuario existe...", iUserLogin);
        return this._httpclient.get<any>(this.URL_SUPABASE + "PASAJERO?nombre_pas=eq." + iUserLogin.username  + "&pass_pasajero=eq." + iUserLogin.password, { headers: this.supabaseheaders }).pipe(
            map((user) => {
                console.log(user[0]);
                return user[0];
            }), catchError((err) => {
                console.log(err)
                return err;
            })
        );
    }
    getLoginConductor(iUserLogin: any): Observable<string | any> {
        return this._httpclient.get<any>(this.URL_SUPABASE + "CONDUCTOR?username_cond=eq." + iUserLogin.username + "&pass_cond=eq." + iUserLogin.password, { headers: this.supabaseheaders }).pipe(
            map((user) => {
                console.log(user[0]);
                return user[0];
            }), catchError((err) => {
                console.log(err)
                return err;
            })
        );
    }
    getUserType(user_id: string){
        return this._httpclient.get<any>(this.URL_SUPABASE+"CONDUCTOR?username_cond=eq."+user_id+"&select=id,created_at,user(*),type(*)", { headers: this.supabaseheaders}).pipe(
            map((userInfo) => {
                console.log(userInfo);
                return userInfo;
            })
        )
    }
}