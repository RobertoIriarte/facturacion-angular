import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/env';

@Injectable({
  providedIn: 'root'
})
export class ResportesService {

  private URL_API: string = environment.ApiUrl;
      
  constructor(private http: HttpClient) { }

  getReporteClientes(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/reporte/clientes`);
  }

  getReporteProductos(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/reporte/productos`);
  }

  getReporteVentas(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/reporte/ventas`);
  }
  getReporteIngresos(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/reporte/ingresos`);
  }

  getReporteAnual(): Observable<any> {
    return this.http.get(`${this.URL_API}/api/v1/reporte/anual`);
  }

}
