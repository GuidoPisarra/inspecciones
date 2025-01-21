import { ActionReducerMap } from '@ngrx/store';
import { imagenVehiculoFeatureName, State as ImagenVehiculoState, reducer as ImagenVehiculoReducer } from './reducers/imagen-vehiculo.reducer';

interface RootState {
  [imagenVehiculoFeatureName]: ImagenVehiculoState;
}

const RootReducer: ActionReducerMap<RootState> = {
  [imagenVehiculoFeatureName]: ImagenVehiculoReducer,
};

export { RootReducer };
