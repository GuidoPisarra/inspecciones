import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-capture',
  standalone: false,
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.scss']
})
export class CameraCaptureComponent implements OnInit {
  public photos: string[] = []; // Array de fotos capturadas
  public maxPhotos: number = 5; // Número máximo de fotos permitidas
  public currentPhotoIndex: number = 0; // Índice de la foto mostrada en el slider

  constructor() { }

  ngOnInit(): void {
    this.startCamera();
  }

  capturePhoto() {
    if (this.photos.length < this.maxPhotos) {
      const videoElement = document.querySelector('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // Ajustar el tamaño del canvas al del video
      canvas.width = videoElement!.videoWidth;
      canvas.height = videoElement!.videoHeight;

      // Dibujar la imagen del video en el canvas
      ctx!.drawImage(videoElement!, 0, 0, canvas.width, canvas.height);

      // Convertir el canvas a una imagen
      const photo = canvas.toDataURL('image/jpeg');
      this.photos.push(photo);
    } else {
      alert('Has alcanzado el límite de fotos.');
    }
  }

  startCamera() {
    const videoElement = document.querySelector('video');

    // Acceder a la cámara
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Asignar el stream de la cámara al video
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error al acceder a la cámara: ', err);
      });
  }

  stopCamera() {
    const videoElement = document.querySelector('video');
    const stream = videoElement!.srcObject as MediaStream;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());
    videoElement!.srcObject = null;
  }

  clearPhotos() {
    this.photos = [];
  }

  // Funciones para mover entre las fotos en el slider
  showNextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  showPreviousPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }


}
