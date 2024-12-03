import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InicioComponent } from './features/components/inicio/inicio.component';
import { FormularioPreguntasComponent } from './features/components/formulario-preguntas/formulario-preguntas.component';
import { FotosComponent } from './features/components/fotos/fotos.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FormularioPreguntasComponent,
    FotosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
