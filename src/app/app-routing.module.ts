import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './features/components/inicio/inicio.component';
import { FormularioPreguntasComponent } from './features/components/formulario-preguntas/formulario-preguntas.component';
import { CameraCaptureComponent } from './features/components/camera-capture/camera-capture.component';
import { FinishComponent } from './features/components/finish/finish.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'formulario', component: FormularioPreguntasComponent },
  { path: 'camera-capture', component: CameraCaptureComponent },
  { path: 'finish', component: FinishComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
