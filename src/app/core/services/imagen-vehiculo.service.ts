import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ImagenVehiculo } from '../../features/components/camera-capture/models/ImagenVehiculo';


@Injectable({
  providedIn: 'root'
})
export class ImagenVehiculoService {
  private clases: ImagenVehiculoService[] = [];
  private baseURL = environment.baseURL;

  constructor(
    private _httpClient: HttpClient

  ) { }


  getImagenes(): Observable<ImagenVehiculo[]> {
    return this._httpClient.get<ImagenVehiculo[]>(`${this.baseURL}/imagenes`);
  }

  createImagen(data: ImagenVehiculo): Observable<ImagenVehiculo> {
    return this._httpClient.post<ImagenVehiculo>(`${this.baseURL}/agregarImagen`, {
      ...data
    });
  }

}
