import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FotosComponent } from './components/fotos/fotos.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InicioComponent } from './components/inicio/inicio.component';


@NgModule({
  declarations: [
    FormularioPreguntasComponent,
    FotosComponent,
    SpinnerComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule
  ],

})
export class FeatureModule { }
