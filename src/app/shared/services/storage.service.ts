import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private afs: AngularFireStorage) { }

    /**************************
        Subir imagenes
    **************************/
    uploadPhoto(database, photoName, image) {
        return this.afs.ref(database + photoName).putString(image, 'data_url');
    }

    /**************************
        Obtener Nombre Imagen
    **************************/
    getDownloadURL(database, photoName) {
        return this.afs.ref(database + photoName).getDownloadURL();
    }

    /**************************
        Eliminar Imagenes
    **************************/
    deleteImages(database, photoName) {
        return this.afs.ref(database + photoName + '.jpg').delete();
    }

}
