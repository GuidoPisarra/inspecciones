import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario-preguntas',
  standalone: false,
  templateUrl: './formulario-preguntas.component.html',
  styleUrl: './formulario-preguntas.component.scss',

})
export class FormularioPreguntasComponent {
  formulario: FormGroup;
  cartaDanio: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      kilometraje: ['', Validators.required],
      cartaDanio: ['', Validators.required],
    });

  }


  goToCameraCapture() {
    this.markAllAsTouched();
    if (this.formulario.valid) {
      this.router.navigate(['/camera-capture']);
    }
  }
  markAllAsTouched() {
    Object.keys(this.formulario.controls).forEach(field => {
      const control = this.formulario.get(field); control?.markAsTouched({ onlySelf: true });
    });
  }
}
