import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner-max-screen',
  standalone: false,
  templateUrl: './spinner-max-screen.component.html',
  styleUrl: './spinner-max-screen.component.scss'
})
export class SpinnerMaxScreenComponent {
  @Input() visible: boolean = false;
}


