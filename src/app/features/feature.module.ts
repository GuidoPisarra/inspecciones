import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormularioPreguntasComponent } from './components/formulario-preguntas/formulario-preguntas.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CameraCaptureComponent } from './components/camera-capture/camera-capture.component';
import { SpinnerMaxScreenComponent } from './components/spinner-max-screen/spinner-max-screen.component';

@NgModule({
  declarations: [
    FormularioPreguntasComponent,
    SpinnerComponent,
    CameraCaptureComponent,
    SpinnerMaxScreenComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule,
    MatSlideToggleModule

  ],
  exports: [
    SpinnerComponent,
  ],
})
export class FeatureModule { }
