import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../env/env';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL_API: string = environment.ApiUrl + '/auth/login';

  constructor(private http: HttpClient) { }

  

  login(username: string, password: string): Observable<any> {

    const params = { email: username, password: password };

     return this.http.post<any>(this.URL_API, params).pipe(
        tap( response => {
          if(response.code == 200){
            localStorage.setItem('token', response.data.access_token);
          }
          
        }
      )
     );
     
  }

  // isLoggedIn(): boolean {
  //   // return !!localStorage.getItem('token');
  //   return false
  // }

  

}
