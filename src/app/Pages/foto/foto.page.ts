import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.page.html',
  styleUrls: ['./foto.page.scss'],
  standalone: false
})
export class FotoPage implements OnInit {
  imageUrl: string = ''; // Variable para almacenar la imagen seleccionada

  constructor(private actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  // Método para mostrar el ActionSheet
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecciona una opción',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Seleccionar de Galería',
          icon: 'images',
          handler: () => {
            this.selectFromGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Acción cancelada');
          }
        }
      ]
    });

    await actionSheet.present();
  }

  // Método para tomar una foto
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera // Usa Camera para tomar foto
      });

      if (image.dataUrl) {
        this.imageUrl = image.dataUrl; // Actualiza la imagen en la UI
      }
    } catch (error) {
      console.error('Error al tomar foto:', error);
    }
  }

  // Método para seleccionar una foto de la galería
  async selectFromGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos // Abre la galería
      });

      if (image.dataUrl) {
        this.imageUrl = image.dataUrl; // Actualiza la imagen en la UI
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    }
  }
}
