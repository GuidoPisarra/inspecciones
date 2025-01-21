import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { of } from 'rxjs';
import { ImagenVehiculoService } from '../../../../../core/services/imagen-vehiculo.service';
import { ImagenVehiculoActions } from './../actions/imagen-vehiculo.actions';


@Injectable()
export class ImagenVehiculoEffects {


  loadImagenesVehiculo$: Actions<Action<string>>;
  createImagenVehiculo$: Actions<Action<string>>;


  constructor(
    private actions$: Actions,
    private _imagenVehiculoService: ImagenVehiculoService,
  ) {

    this.loadImagenesVehiculo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ImagenVehiculoActions.loadImagenVehiculo),
        mergeMap(() =>
          this._imagenVehiculoService.getImagenes().pipe(
            map((imagenes) => ImagenVehiculoActions.loadImagenVehiculoSuccess({ photos: imagenes })),
            catchError((error) => of(ImagenVehiculoActions.loadImagenVehiculoFailure({ error })))
          )
        )
      )
    );

    this.createImagenVehiculo$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ImagenVehiculoActions.createImagenVehiculo),
        concatMap((action) =>
          this._imagenVehiculoService.createImagen(action.photo).pipe(
            map((newPhoto) => ImagenVehiculoActions.createImagenVehiculo({ photo: newPhoto })),
            catchError((error) =>
              of(ImagenVehiculoActions.createImagenVehiculoFailure({ error }))
            )
          )
        )
      )
    );


  }
}
