import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movil',
  templateUrl: './movil.component.html',
  styleUrls: ['./movil.component.scss'],
  animations: [routerTransition()]
})
export class MovilComponent implements OnInit {

  loadingImge = false;
  loadingImge2 = false;

  logoMovil: any = [];
  newLogoMovil: any = [];

  web: any = [];
  newWebData: any = [];

  viewMovil = false;
  viewWeb = false;

  private closeResult: string;
  private database = '/web/';
  title: string;


  constructor(
    private dbService: DatabaseService,
    private storageService: StorageService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.dbService.getAllData('/movil/').valueChanges().subscribe((res) => {
      this.logoMovil = res;
    });

    this.dbService.getAllData('/web/').valueChanges().subscribe((res) => {
      this.web = res;
    });
  }

  onUploadlogo1(e: any, logo) {
    this.newLogoMovil = logo;
    if (this.newLogoMovil.logo1) {
      this.storageService.deleteImages('/movil/', this.newLogoMovil.nameLogo1);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleReaderLoaded1(e) {
    this.loadingImge = true;
    const base64Image = 'data:image/jpeg;base64,' + btoa(e.target.result);
    const nameImage = Date.now();
    this.storageService.uploadPhoto('/movil/', nameImage + '.jpg', base64Image).then((data) => {
      this.storageService.getDownloadURL('/movil/', nameImage + '.jpg').subscribe((url) => {
        this.newLogoMovil.logo1 = url;
        this.newLogoMovil.nameLogo1 = nameImage;
        this.dbService.addNew('/movil/', this.newLogoMovil).then(() => {
          this.loadingImge = false;
          this.newLogoMovil = [];
          this.toastr.success('logotipo agregado correctamente');
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al agregar el logotipo');
        });
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  onUploadlogo2(e: any, logo) {
    this.newLogoMovil = logo;
    if (this.newLogoMovil.logo2) {
      this.storageService.deleteImages('/movil/', this.newLogoMovil.nameLogo2);
    }
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleReaderLoaded2(e) {
    this.loadingImge = true;
    const base64Image = 'data:image/jpeg;base64,' + btoa(e.target.result);
    const nameImage = Date.now();
    this.storageService.uploadPhoto('/movil/', nameImage + '.jpg', base64Image).then((data) => {
      this.storageService.getDownloadURL('/movil/', nameImage + '.jpg').subscribe((url) => {
        this.newLogoMovil.logo2 = url;
        this.newLogoMovil.nameLogo2 = nameImage;
        this.dbService.addNew('/movil/', this.newLogoMovil).then(() => {
          this.loadingImge = false;
          this.newLogoMovil = [];
          this.toastr.success('logotipo agregado correctamente');
        }).catch((e) => {
          this.toastr.error('Ocurrió un error al agregar el logotipo');
        });
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  openEdit(modulo, title, modal) {
    this.title = title;
    this.newWebData = modulo;
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

  closeModal() {
    this.modalService.dismissAll();
    this.newWebData = [];
  }

  onUploadImageEdit(e: any, modulo) {
    if (modulo.img) {
      this.deleteImage(modulo);
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
        this.newWebData.img = url;
        this.newWebData.nombreImagen = nameImage;
        this.loadingImge = false;
      });
    }).catch((error) => {
      console.log('error');
    });
  }

  editModulo(modulo) {
    this.dbService.addNew(this.database, modulo).then(() => {
      this.modalService.dismissAll();
      this.toastr.success('Cambios guardados correctamente');
    }).catch((e) => {
      this.modalService.dismissAll();
      this.toastr.error('Ocurrió un error al modificar');
    });
  }

  deleteImage(modulo) {
    this.storageService.deleteImages(this.database, modulo.nombreImagen);
  }

  viewM() {
    this.viewMovil ? this.viewMovil = false : this.viewMovil = true;
  }

  viewW() {
    this.viewWeb ? this.viewWeb = false : this.viewWeb = true;
  }

}
