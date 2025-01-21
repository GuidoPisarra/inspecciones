import { createFeature, createReducer, on } from '@ngrx/store';
import { ImagenVehiculo } from '../../models/ImagenVehiculo';
import { ImagenVehiculoActions } from '../actions/imagen-vehiculo.actions';


export const courseFeatureKey = 'course';

export interface State {
  imagenes: ImagenVehiculo[];
  isLoadingImagenVehiculo: boolean;
  loadImagenVehiculoError: Error | null;

}

export const initialState: State = {
  imagenes: [],
  isLoadingImagenVehiculo: false,
  loadImagenVehiculoError: null,
};

export const reducer = createReducer(
  initialState,
  on(ImagenVehiculoActions.loadImagenVehiculo, (state) => {
    return {
      ...state,
      isLoadingCourses: true,
    };
  }),
  on(ImagenVehiculoActions.loadImagenVehiculoSuccess, (state, { photos }) => {
    return {
      ...state,
      imagenes: photos,
      isLoadingCourses: false,
    };
  }),
  on(ImagenVehiculoActions.loadImagenVehiculoFailure, (state) => {
    return {
      ...state,
      isLoadingRegisterCourses: false,
    };
  }),
  on(ImagenVehiculoActions.createImagenVehiculo, (state, { photo }) => {
    return {
      ...state,
      imagenes: [...state.imagenes, photo],
      isLoadingRegisterCourses: true,

    };
  }),
  on(ImagenVehiculoActions.createImagenVehiculoSuccess, (state, { data }) => {
    return {
      ...state,
      imagenes: [...state.imagenes, data],
      isLoadingRegisterCourses: false,

    };
  }),
  on(ImagenVehiculoActions.createImagenVehiculoFailure, (state, { error }) => {
    return {
      ...state,
      loadImagenVehiculoError: error,
      isLoadingRegisterCourses: false,

    };
  }),
);

export const ImagenVehiculoFeature = createFeature({
  name: courseFeatureKey,
  reducer
});
