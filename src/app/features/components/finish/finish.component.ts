import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagenVehiculo } from '../camera-capture/models/ImagenVehiculo';

@Component({
  selector: 'app-finish',
  standalone: false,

  templateUrl: './finish.component.html',
  styleUrl: './finish.component.scss'
})
export class FinishComponent {

  imagenesVehiculo: ImagenVehiculo[] = [];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Acceder a los datos del state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.imagenesVehiculo = navigation.extras.state['imagenesVehiculo'];
      console.log(this.imagenesVehiculo);
    }
  }
}
