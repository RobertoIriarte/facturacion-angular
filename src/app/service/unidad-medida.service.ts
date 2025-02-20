import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  private URL_API: string = environment.ApiUrl;
        
  constructor(private http: HttpClient) { }

  getMedidas(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/medida`);
  }
}
