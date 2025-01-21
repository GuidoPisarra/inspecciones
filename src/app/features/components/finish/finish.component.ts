import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenVehiculo } from '../camera-capture/models/ImagenVehiculo';
import { Store } from '@ngrx/store';
import { selectImagenVehiculo } from '../camera-capture/store/selectors/imagen-vehiculo.selector';
import { map, Observable } from 'rxjs';


interface ImagenVehiculoView {
  url: string;
  confianza: number;
  clase: string;
}

@Component({
  selector: 'app-finish',
  standalone: false,
  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {

  imagenesVehiculo$: Observable<ImagenVehiculoView[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.imagenesVehiculo$ = this.store.select(selectImagenVehiculo).pipe(
      map(imagenes => imagenes.map(imagen => ({
        url: imagen.getArchivo()?.toString() ?? '',
        confianza: imagen.getConfianza() ?? 0,
        clase: imagen.getClase() ?? ''
      })))
    );
  }

  ngOnInit(): void {

  }
}
