import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InicioComponent } from './features/components/inicio/inicio.component';
import { FeatureModule } from "./features/feature.module";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ImagenVehiculoEffects } from './features/components/camera-capture/store/effects/imagen-vehiculo.effects';
import { RootReducer } from './features/components/camera-capture/store';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(RootReducer, {}),
    EffectsModule.forRoot([ImagenVehiculoEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    FeatureModule,
    MatSlideToggleModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch())],
  bootstrap: [AppComponent],

})
export class AppModule { }
