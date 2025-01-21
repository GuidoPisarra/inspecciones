import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ImagenVehiculo } from '../../models/ImagenVehiculo';


export const ImagenVehiculoActions = createActionGroup({
  source: 'ImagenVehiculo',
  events: {

    'Load Imagen Vehiculo': emptyProps(),
    'Load Imagen Vehiculo Success': props<{ photos: ImagenVehiculo[] }>(),
    'Load Imagen Vehiculo Failure': props<{ error: Error }>(),

    'Create Imagen Vehiculo': props<{ photo: ImagenVehiculo }>(),
    'Create Imagen Vehiculo Success': props<{ data: ImagenVehiculo }>(),
    'Create Imagen Vehiculo Failure': props<{ error: Error }>(),


  },
});
