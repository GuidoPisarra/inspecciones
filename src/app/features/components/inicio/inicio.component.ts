import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  standalone: false
})
export class InicioComponent {
  protected autoImage: string = 'assets/images/auto-detras-inicio.png';
  protected cargando: boolean = false;

  constructor(
    private route: Router
  ) { }

  start(): void {
    if (!this.cargando) {
      this.autoImage = 'assets/images/auto-detras.png';
      this.cargando = true;
      setTimeout(() => {
        this.cargando = false;
        this.route.navigate(['/formulario'])
      }, 3000)
    }
  }
}
