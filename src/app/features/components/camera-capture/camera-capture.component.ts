import { Component, OnInit } from '@angular/core';

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

      canvas.width = videoElement!.videoWidth;
      canvas.height = videoElement!.videoHeight;

      ctx!.drawImage(videoElement!, 0, 0, canvas.width, canvas.height);

      const photo = canvas.toDataURL('image/jpeg');
      this.photos.push(photo);
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


}
