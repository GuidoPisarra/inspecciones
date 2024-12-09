import { Component, OnInit } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

@Component({
  selector: 'app-camera-capture',
  standalone: false,
  templateUrl: './camera-capture.component.html',
  styleUrls: ['./camera-capture.component.scss']
})
export class CameraCaptureComponent implements OnInit {
  public photos: string[] = [];
  public maxPhotos: number = 5;
  public currentPhotoIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startCamera();
  }

  capturePhoto() {
    if (this.photos.length < this.maxPhotos) {
      const videoElement = document.querySelector('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!videoElement || !ctx) {
        console.error('No se pudo capturar la foto: elemento o contexto no disponible.');
        return;
      }

      // Ajustar el tamaño del canvas al tamaño del video
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Dibujar la imagen del video en el canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Obtener la imagen como base64
      const photo = canvas.toDataURL('image/jpeg');
      this.photos.push(photo);

      // Analizar la imagen capturada con COCO-SSD
      this.analyzePhoto(canvas);
    } else {
      alert('Has alcanzado el límite de fotos.');
    }
  }


  /*   startCamera() {
      const videoElement = document.querySelector('video');
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoElement) {
            videoElement.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error al acceder a la cámara: ', err);
        });
    } */

  startCamera() {
    const videoElement = document.querySelector('video');

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput'); // Filtramos solo las cámaras
        const backCamera = videoDevices.find(device => device.label.toLowerCase().includes('back'));

        let constraints: MediaStreamConstraints = {
          video: {
            facingMode: { ideal: 'environment' }
          }
        };

        if (backCamera) {
          constraints = {
            video: {
              deviceId: { exact: backCamera.deviceId }
            }
          };
        }

        navigator.mediaDevices.getUserMedia(constraints)
          .then((stream) => {
            if (videoElement) {
              videoElement.srcObject = stream;
            }
          })
          .catch((err) => {
            console.error('Error al acceder a la cámara: ', err);
          });
      })
      .catch((err) => {
        console.error('Error al enumerar los dispositivos: ', err);
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



  analyzePhoto(canvas: HTMLCanvasElement) {
    cocoSsd.load().then((model) => {
      model.detect(canvas).then((predictions) => {
        if (predictions.length === 0) {
          alert('No se detectaron objetos en la foto.');
          return;
        }

        let alertMessage = 'Objetos detectados:\n';

        predictions.forEach((prediction, index) => {
          alertMessage += `\nObjeto ${index + 1}:\n`;
          alertMessage += `- Clase: ${prediction.class}\n`;
          alertMessage += `- Confianza: ${(prediction.score * 100).toFixed(2)}%\n`;
          alertMessage += `- Rectángulo: [${prediction.bbox.join(', ')}]\n`;
        });

        alert(alertMessage);
      }).catch((err) => {
        alert('Error al analizar la foto: ' + err.message);
      });
    }).catch((err) => {
      alert('Error al cargar el modelo COCO-SSD: ' + err.message);
    });
  }

}
