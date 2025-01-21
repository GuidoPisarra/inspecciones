import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenVehiculo } from '../camera-capture/models/ImagenVehiculo';
import { Store } from '@ngrx/store';
import { selectImagenVehiculo } from '../camera-capture/store/selectors/imagen-vehiculo.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-finish',
  standalone: false,

  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {

  imagenesVehiculo$: Observable<ImagenVehiculo[]>;

  constructor(

    private store: Store
  ) {

    this.imagenesVehiculo$ = this.store.select(selectImagenVehiculo);
  }

  ngOnInit(): void {
    this.imagenesVehiculo$.subscribe((imagen) => {
      console.log(imagen);
    });
  }
}
