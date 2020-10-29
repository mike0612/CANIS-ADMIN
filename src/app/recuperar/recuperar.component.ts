import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService, DatabaseService } from './../shared';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionService } from 'ng-connection-service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss'],
  animations: [routerTransition()]
})
export class RecuperarComponent implements OnInit {


  modalOption: NgbModalOptions = {};
  private regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  dataUser: any = [];
  user: any = [];
  title: string;
  status = 'ONLINE';
  isConnected = true;

  constructor(
    private router: Router,
    private auth: AuthService,
    private dbService: DatabaseService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private connectionService: ConnectionService
  ) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
    });
  }

  ngOnInit() {
  }

  validation(modal) {
    if (this.regEx.test(this.user.correo)) {
      this.onSubmitLogin(modal);      
    } else {
      this.toastr.error('Ingrese un correo con formato: "nombre@email.com".', 'Correo inválido');
    }
  }

  private onSubmitLogin(modal) {
    if (this.isConnected) {
      this.title = 'Verificando usuario';
      this.openModal(modal, true);
      this.dbService.getFilterFieldValue('/administracion/', 'correo', this.user.correo).valueChanges().subscribe((user) => {
        this.dataUser = user;
        if (this.dataUser.find(res => res.correo === this.user.correo)) {
          if (this.dataUser.find(res => res.tipo === 0)
            || this.dataUser.find(res => res.tipo === 1)
            || this.dataUser.find(res => res.tipo === 2)) {
            this.title = 'Generando enlace de recuperación';
            this.auth.recuperar(this.user.correo).then((res) => {
              this.openModal(modal, false);
              this.toastr.success('Hemos enviado un enlace de recuperacion a su correo');
              this.router.navigate(['/login']);
            }).catch(() => {
              this.openModal(modal, false);
              this.toastr.error('Ocurrió un error al enviar el enlace, inténtelo más tarde');
            });
          } else {
            this.openModal(modal, false);
            this.toastr.error('El correo que ingresó no coincide con ninguna cuenta de administrador');
          }
        } else {
          this.openModal(modal, false);
          this.toastr.error('El correo que ingresó no coincide con ninguna cuenta');
        }
      });
    } else {
      this.toastr.error('No tiene conexión a internet', 'Error');
    }
  }

  openModal(modal, data: boolean) {
    if (data) {
      this.modalOption.backdrop = 'static';
      this.modalOption.keyboard = false;
      this.modalOption.centered = true;
      this.modalService.open(modal, this.modalOption);
    } else {
      this.modalService.dismissAll();
    }
  }

}
