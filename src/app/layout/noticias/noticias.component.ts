import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.scss'],
  animations: [routerTransition()]
})
export class NoticiasComponent implements OnInit {

  private closeResult: string;
  private database = '/noticias/';
  title: string;
  fecha: string;

  noticias: any = [];
  newNoticia: any = [];
  noticia: any = [];

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
    this.dbService.getAllData(this.database).valueChanges().subscribe((noticias) => {
      this.loadingDB = false;
      this.noticias = noticias.sort(this.compare);
    });
    this.getFecha();
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

  openEdit(noticia, title, modal) {
    this.title = title;
    this.noticia = noticia;
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

  closeModalNuevo(newNoticia) {
    if (newNoticia.foto) {
      this.deleteImage(newNoticia);
    }
    this.modalService.dismissAll();
    this.noticia = [];
    this.newNoticia = [];
  }

  closeModal() {
    this.modalService.dismissAll();
    this.noticia = [];
  }

  onUploadImageAdd(e: any, newNoticia) {
    if (newNoticia.foto) {
      this.deleteImage(newNoticia);
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
        this.newNoticia.foto = url;
        this.newNoticia.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  onUploadImageEdit(e: any, noticia) {
    if (noticia.foto) {
      this.deleteImage(noticia);
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
        this.noticia.foto = url;
        this.noticia.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  addNoticia() {
    this.newNoticia.id = Date.now();
    this.newNoticia.folio = ('NTC' + '' + Math.random().toString(10).substr(2, 5));    
    this.dbService.addNew(this.database, this.newNoticia).then(() => {
      this.modalService.dismissAll();
      this.newNoticia = [];
      this.toastr.success('Noticia agregada correctamente');
    }).catch((e) => {
      this.toastr.error('Ocurrió un error al agregar la noticia');
    });
  }

  editNoticia(noticia) {
    this.dbService.addNew(this.database, noticia).then(() => {
      this.modalService.dismissAll();
      this.toastr.success('Cambios guardados correctamente');
    }).catch((e) => {
      this.toastr.error('Ocurrió un error al modificar la noticia');
    });
  }

  deleteNoticia(noticia) {
    Swal.fire({
      title: '<h5> Eliminar la noticia ' + noticia.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente la noticia. ' +
        '¿Desea continuar?</p>',
      imageUrl: noticia.foto,
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
        this.dbService.deleteData(this.database, noticia).then(() => {
          this.deleteImage(noticia);
          this.toastr.success('Noticia eliminada correctamente');
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al eliminar la noticia');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.warning('Eliminación cancelada');
      }
    });
  }

  deleteImage(noticia) {
    this.storageService.deleteImages(this.database, noticia.nombreImagen);
  }

  getFecha() {
    const meses = new Array
      ('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
        'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre');
    const f = new Date();
    this.fecha = (f.getDate() + '/' + meses[f.getMonth()] + '/' + f.getFullYear());
  }

}
