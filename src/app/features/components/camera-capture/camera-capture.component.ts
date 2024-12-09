import { Component, OnInit } from '@angular/core';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { ImagenVehiculo } from './models/ImagenVehiculo';

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
  protected imagenesVehiculo: ImagenVehiculo[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadModel();
    this.startCamera();
  }

  async loadModel() {
    try {
      const model = await cocoSsd.load();
      alert('Modelo cargado correctamente');
    } catch (error) {
      alert('Error al cargar el modelo');
    }
  }

  base64ToFile(dataUrl: string, filename: string): File {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // crear canvas
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // convertir base64
      const photo = canvas.toDataURL('image/jpeg');
      this.photos.push(photo);

      // Convertir a file
      const file = this.base64ToFile(photo, 'captured_photo.jpg');

      // Analizar la imagen
      this.analyzePhoto(canvas, file);
    } else {
      alert('Has alcanzado el límite de fotos.');
    }
  }

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

  analyzePhoto(canvas: HTMLCanvasElement, file: File) {
    cocoSsd.load()
      .then((model) => {
        return model.detect(canvas);
      })
      .then((predictions) => {
        if (predictions.length === 0) {
          alert('No se detectaron objetos en la fotooooooooooooooo.');
          return;
        }
        predictions.forEach((prediction) => {
          const confianza = parseFloat((prediction.score * 100).toFixed(2));
          const nuevaImagen = new ImagenVehiculo(file, confianza, prediction.class);
          if (nuevaImagen.esValida()) {
            this.imagenesVehiculo.push(nuevaImagen);
            alert(`La imagen . ${confianza} ${prediction.class}`);
          } else {
            alert(`La imagen no corresponde a un vehículo. ${confianza} ${prediction.class}`);
            return;
          }
        });

        console.log('Imágenes y datos guardados:', this.imagenesVehiculo);
      })
      .catch((error) => {
        console.error('Error durante la detección de objetos:', error);
        alert(`Ocurrió un error al analizar la imagen: ${error.message || error}`);
      });
  }

  protected clearPhotos() {
    this.photos = [];
  }

  protected showNextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  protected showPreviousPhoto() {
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

}
