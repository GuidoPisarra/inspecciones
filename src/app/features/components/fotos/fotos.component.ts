import { Component } from '@angular/core';

@Component({
    selector: 'app-fotos',
    templateUrl: './fotos.component.html',
    styleUrl: './fotos.component.scss',
    standalone: false
})
export class FotosComponent {
  fotoTomada: string | null = null;

  abrirCamara() {
    const videoElement = document.querySelector('video');
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        videoElement!.srcObject = stream;
        videoElement!.play();
      })
      .catch((err) => console.error(err));
  }

  tomarFoto() {
    const canvas = document.createElement('canvas');
    const videoElement = document.querySelector('video');
    canvas.width = videoElement!.videoWidth;
    canvas.height = videoElement!.videoHeight;
    const context = canvas.getContext('2d')!;
    context.drawImage(videoElement!, 0, 0, canvas.width, canvas.height);
    this.fotoTomada = canvas.toDataURL('image/png');
  }
}
