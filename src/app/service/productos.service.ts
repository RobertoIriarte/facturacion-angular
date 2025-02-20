import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
import { ResponseData } from '../interface/interfaces';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URL_API: string = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  getDataVentas(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/api/v1/productos/ventas`);
  }

  getDataBodega(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/api/v1/productos/bodega`);
  }

  enviarDatos(datos: any) {
    return this.http.post(`${this.URL_API}/api/v1/productos/guardar`, datos);
  }

  eliminarPorId(id: number) {
    const url = `${this.URL_API}/api/v1/productos/eliminar/${id}`;
    return this.http.delete(url);
  }

  actualizar(datos: any) {
    return this.http.put(`${this.URL_API}/api/v1/productos/actualizar`, datos);
  }

  verificarExistencia(cod: string) {
    return this.http.get<ResponseData>(`${this.URL_API}/api/v1/productos/verificar-cod-producto/${cod}`);
  }
  disminuirStock(detalles: any) {
    return this.http.post(`${this.URL_API}/api/v1/productos/disminuir-stock`, detalles);
  }

}
