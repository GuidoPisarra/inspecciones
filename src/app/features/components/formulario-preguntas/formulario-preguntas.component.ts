import { HttpErrorResponse } from '@angular/common/http';
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
  passwordInputType: 'password' | 'text' = 'password';
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  togglePasswordInputType(): void {

  }

  login(): void {

  }

  onSubmit(): void {

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
