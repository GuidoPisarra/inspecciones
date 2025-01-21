import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromImagenVehiculo from '../reducers/imagen-vehiculo.reducer';

export const selectImagenVehiculoState = createFeatureSelector<fromImagenVehiculo.State>(
  fromImagenVehiculo.courseFeatureKey
);

export const selectImagenVehiculo = createSelector(
  selectImagenVehiculoState,
  (state) => state.imagenes
);

export const selectLoadImagenVehiculoError = createSelector(
  selectImagenVehiculoState,
  (state) => state.loadImagenVehiculoError
);

export const selectIsLoadingCourses = createSelector(
  selectImagenVehiculoState,
  (state) => state.isLoadingImagenVehiculo
);


