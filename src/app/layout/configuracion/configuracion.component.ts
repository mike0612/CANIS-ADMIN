import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, AuthService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss'],
  animations: [routerTransition()]
})
export class ConfiguracionComponent implements OnInit {

  private closeResult: string;
  private database = '/administracion/';
  title: string;

  usuarios: any = [];
  newUsuario: any = [];
  usuario: any = [];
  pass: any = [];
  modulos: any = [];

  loadingDB = false;
  loadingImge = false;
  errorMail = false;
  errorMailExiste = false;
  errorPass = false;

  private regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor(
    private dbService: DatabaseService,
    private auth: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadingDB = true;
    this.dbService.getFilterFieldValue(this.database, 'tipo', 2).valueChanges().subscribe((usuarios) => {
      this.loadingDB = false;
      this.usuarios = usuarios;
    });
  }

  openAdd(modal, title) {
    this.title = title;
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(usuario, title, modal) {
    this.title = title;
    this.usuario = usuario;
    this.modulos = usuario.modulos;
    this.modalService.open(modal).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.errorMail = false;
      this.errorMailExiste = false;
      this.errorPass = false;
      this.usuario = [];
      this.newUsuario = [];
      this.modulos = [];
      this.pass = [];
      return 'by pressing ESC';

    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.errorMail = false;
      this.errorMailExiste = false;
      this.errorPass = false;
      this.usuario = [];
      this.newUsuario = [];
      this.modulos = [];
      this.pass = [];
      return 'by clicking on a backdrop';
    } else {
      this.errorMail = false;
      this.errorMailExiste = false;
      this.errorPass = false;
      this.usuario = [];
      this.newUsuario = [];
      this.modulos = [];
      this.pass = [];
      return `with: ${reason}`;
    }
  }

  closeModalNuevo() {
    this.errorMail = false;
    this.errorMailExiste = false;
    this.errorPass = false;
    this.modalService.dismissAll();
    this.usuario = [];
    this.newUsuario = [];
    this.modulos = [];
    this.pass = [];
  }

  closeModal() {
    this.modalService.dismissAll();
    this.usuario = [];
    this.modulos = [];
  }

  validation() {
    if (this.regEx.test(this.newUsuario.correo)) {
      this.errorMail = false;
      if (this.pass.password.length > 5 && this.pass.confirmarPass.length > 5) {
        this.errorPass = false;
        if (this.pass.password === this.pass.confirmarPass) {
          this.errorPass = false;
          if (!this.usuarios.find(res => res.correo === this.newUsuario.correo)) {
            this.addUsuario();
          } else {
            this.errorMailExiste = true;
          }
        } else {
          this.errorPass = true;
        }
      } else {
        this.errorPass = true;
      }
    } else {
      this.errorMail = true;
    }
  }

  addUsuario() {
    this.auth.registro(this.newUsuario.correo, this.pass.password).then((res) => {
      this.newUsuario.id = res.user.uid;
      this.newUsuario.tipo = 2;
      this.newUsuario.folio = ('ADTC' + '' + Math.random().toString(10).substr(2, 5));
      this.newUsuario.modulos = this.modulos;
      this.dbService.addNew(this.database, this.newUsuario).then(() => {
        this.modalService.dismissAll();
        this.newUsuario = [];
        this.toastr.success('Usuario agregado correctamente');
      }).catch(() => {
        this.modalService.dismissAll();
        this.toastr.error('Ocurrió un error al agregar el usuario');
      });
    }).catch(() => {
      this.modalService.dismissAll();
      this.toastr.error('Ocurrió un error al crear la cuenta');
    });
  }





  editUsuario(usuario) {
    this.dbService.addNew(this.database, usuario).then(() => {
      this.modalService.dismissAll();
      this.toastr.success('Cambios guardados correctamente');
    }).catch((e) => {
      this.modalService.dismissAll();
      this.toastr.error('Ocurrió un error al modificar el usuario');
    });
  }



}
