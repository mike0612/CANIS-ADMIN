import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas',
  templateUrl: './mascotas.component.html',
  styleUrls: ['./mascotas.component.scss'],
  animations: [routerTransition()]
})
export class MascotasComponent implements OnInit {

  private closeResult: string;
  private database = '/mascotas/';
  title: string;

  filter = [
    { tipo: 'Todos', value: 'Todos' },
    { tipo: 'Caninos', value: 'Canino' },
    { tipo: 'Felinos', value: 'Felino' }
  ];

  tipo = [{ tipo: 'Felino' }, { tipo: 'Canino' }];
  sexo = [{ sexo: 'Macho' }, { sexo: 'Hembra' }];
  talla = [{ t: 'Chico' }, { t: 'Mediano' }, { t: 'Grande' }];

  mascotas: any = [];
  newMascota: any = [];
  mascota: any = [];

  loadingDB = false;
  loadingImge = false;

  constructor(
    private dbService: DatabaseService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit() {
    this.loadingDB = true;
    this.dbService.getFilterFieldValue(this.database, 'status', 'Disponible').valueChanges().subscribe((mascotas) => {
      this.loadingDB = false;
      this.mascotas = mascotas.sort(this.compare);
    });
  }

  compare(a, b) {
    if (a.id < b.id) { return 1; }
    if (a.id > b.id) { return -1; }
    return 0;
  }

  getMascotasFiltro(tipo) {
    if (tipo.value === 'Todos') {
      this.loadingDB = true;
      this.dbService.getFilterFieldValue(this.database, 'status', 'Disponible').valueChanges().subscribe((mascotas) => {
        this.loadingDB = false;
        this.mascotas = mascotas;
      });
    } else {
      this.dbService.getFilterFieldValue(this.database, 'tipo', tipo.value).valueChanges().subscribe((mascotas) => {
        this.loadingDB = false;
        this.mascotas = mascotas;
      });
    }
  }

  openAdd(modal, title) {
    this.title = title;
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(mascota, title, modal) {
    this.title = title;
    this.mascota = mascota;
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModalNuevo(newMascota) {
    if (newMascota.foto) {
      this.deleteImage(newMascota);
    }
    this.modalService.dismissAll();
    this.mascota = [];
    this.newMascota = [];
  }

  closeModal() {
    this.modalService.dismissAll();
    this.mascota = [];
  }

  onUploadImageAdd(e: any, newMascota) {
    if (newMascota.foto) {
      this.deleteImage(newMascota);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedAdd.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleReaderLoadedAdd(e) {
    this.loadingImge = true;
    const base64Image = 'data:image/jpeg;base64,' + btoa(e.target.result);
    const nameImage = Date.now();
    this.storageService.uploadPhoto(this.database, nameImage + '.jpg', base64Image).then(() => {
      this.storageService.getDownloadURL(this.database, nameImage + '.jpg').subscribe((url) => {
        this.newMascota.foto = url;
        this.newMascota.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  onUploadImageEdit(e: any, mascota) {
    if (mascota.foto) {
      this.deleteImage(mascota);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoadedEdit.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleReaderLoadedEdit(e) {
    this.loadingImge = true;
    const base64Image = 'data:image/jpeg;base64,' + btoa(e.target.result);
    const nameImage = Date.now();
    this.storageService.uploadPhoto(this.database, nameImage + '.jpg', base64Image).then((data) => {
      this.storageService.getDownloadURL(this.database, nameImage + '.jpg').subscribe((url) => {
        this.mascota.foto = url;
        this.mascota.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  addMascota() {
    this.newMascota.id = Date.now();
    this.newMascota.folio = ('ADP' + '' + Math.random().toString(10).substr(2, 5));
    this.newMascota.status = 'Disponible';
    this.dbService.addNew(this.database, this.newMascota).then(() => {
      this.modalService.dismissAll();
      this.newMascota = [];
      this.toastr.success('Mascota agregada correctamente');
    }).catch((e) => {
      this.modalService.dismissAll();
      this.toastr.error('Ocurrió un error al agregar la mascota');
    });
  }

  editMascota(mascota) {
    this.dbService.addNew(this.database, mascota).then(() => {
      this.modalService.dismissAll();
      this.toastr.success('Cambios guardados correctamente');
    }).catch((e) => {
      this.modalService.dismissAll();
      this.toastr.error('Ocurrió un error al modificar la mascota');
    });
  }

  deleteMascota(mascota) {
    Swal.fire({
      title: '<h5> Eliminar a ' + mascota.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente la mascota. ' +
        '¿Desea continuar?</p>',
      imageUrl: mascota.foto,
      imageWidth: 350,
      imageHeight: 200,
      imageAlt: 'Custom image',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.dbService.deleteData(this.database, mascota).then(() => {
          this.deleteImage(mascota);
          this.toastr.success('Mascota eliminada correctamente');
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al eliminar la mascota');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Eliminación cancelada');
      }
    });
  }

  deleteImage(mascota) {
    this.storageService.deleteImages(this.database, mascota.nombreImagen);
  }

}
