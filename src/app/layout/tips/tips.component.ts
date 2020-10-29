import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
  animations: [routerTransition()]
})
export class TipsComponent implements OnInit {

  private closeResult: string;
  private database = '/tips/';
  title: string;

  tips: any = [];
  newTip: any = [];
  tip: any = [];

  loadingDB = false;
  loadingImge = false;

  constructor(
    private dbService: DatabaseService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadingDB = true;
    this.dbService.getAllData(this.database).valueChanges().subscribe((tips) => {
      this.loadingDB = false;
      this.tips = tips.sort(this.compare);
    });
  }

  compare(a, b) {
    if (a.id < b.id) { return 1; }
    if (a.id > b.id) { return -1;}
    return 0;
  }


  openAdd(modal, title) {
    this.title = title;
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(tip, title, modal) {
    this.title = title;
    this.tip = tip;
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

  closeModalNuevo(newTip) {
    if (newTip.foto) {
      this.deleteImage(newTip);
    }
    this.modalService.dismissAll();
    this.tip = [];
    this.newTip = [];
  }

  closeModal() {
    this.modalService.dismissAll();
    this.tip = [];
  }

  onUploadImageAdd(e: any, newTip) {
    if (newTip.foto) {
      this.deleteImage(newTip);
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
        this.newTip.foto = url;
        this.newTip.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  onUploadImageEdit(e: any, tip) {
    if (tip.foto) {
      this.deleteImage(tip);
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
        this.tip.foto = url;
        this.tip.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  addTip() {
    this.newTip.id = Date.now();
    this.newTip.folio = ('TP' + '' + Math.random().toString(10).substr(2, 5));
    this.dbService.addNew(this.database, this.newTip).then(() => {
      this.modalService.dismissAll();
      this.newTip = [];
      this.toastr.success('Tip agregado correctamente');
    }).catch((e) => {
      this.toastr.error('Ocurrió un error al agregar el tip');
    });
  }

  editTip(tip) {
    this.dbService.addNew(this.database, tip).then(() => {
      this.modalService.dismissAll();
      this.toastr.success('Cambios guardados correctamente');
    }).catch((e) => {
      this.toastr.error('Ocurrió un error al modificar el tip');
    });
  }

  deleteTip(tip) {
    Swal.fire({
      title: '<h5> Eliminar el tip ' + tip.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente el tip. ' +
        '¿Desea continuar?</p>',
      imageUrl: tip.foto,
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
        this.dbService.deleteData(this.database, tip).then(() => {
          this.deleteImage(tip);
          this.toastr.success('Tip eliminado correctamente');
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al eliminar el tip');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel ) {
        this.toastr.warning('Eliminación cancelada');
      }
    });
  }

  deleteImage(tip) {
    this.storageService.deleteImages(this.database, tip.nombreImagen);
  }

}
