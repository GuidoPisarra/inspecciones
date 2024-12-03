import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-preguntas',
  templateUrl: './formulario-preguntas.component.html',
  styleUrl: './formulario-preguntas.component.scss'
})
export class FormularioPreguntasComponent {
  pregunta1: string = '';
  pregunta2: string = '';
  pregunta3: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    console.log('Formulario enviado:', {
      pregunta1: this.pregunta1,
      pregunta2: this.pregunta2,
      pregunta3: this.pregunta3,
    });
    this.router.navigate(['/camara']);
  }
}
