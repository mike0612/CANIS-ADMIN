import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthService, DatabaseService, User } from './../shared';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionService } from 'ng-connection-service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    user = {} as User;
    private regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    private dataUser: any = [];
    modalOption: NgbModalOptions = {};
    title: string;
    status = 'ONLINE';
    isConnected = true;

    constructor(
        private router: Router,
        private auth: AuthService,
        private dbService: DatabaseService,
        private toast: ToastrService,
        private modalService: NgbModal,
        private connectionService: ConnectionService
    ) {
        this.connectionService.monitor().subscribe(isConnected => {
            this.isConnected = isConnected;
        });
    }

    ngOnInit() {
        if (JSON.parse(localStorage.getItem('usuario'))) {
            localStorage.removeItem('usuario');
        }
    }

    validation(modal) {
        if (this.regEx.test(this.user.email)) {
            this.onSubmitLogin(modal);
        } else {
            this.toast.error('Ingrese un correo con formato: "nombre@email.com".', 'Correo inválido');
        }
    }

    private onSubmitLogin(modal) {
        if (this.isConnected) {
            this.title = 'Verificando usuario';
            this.openModal(modal, true);
            this.dbService.getFilterFieldValue('/administracion/', 'correo', this.user.email).valueChanges().subscribe((user) => {
                this.dataUser = user;
                if (this.dataUser.find(res => res.correo === this.user.email)) {
                    if (this.dataUser.find(res => res.tipo === 0)
                        || this.dataUser.find(res => res.tipo === 1)
                        || this.dataUser.find(res => res.tipo === 2)) {
                        this.title = 'Iniciando sesión';
                        const name = this.dataUser.find(res => res.nombre);
                        this.auth.logIn(this.user.email, this.user.password).then(() => {
                            this.openModal(modal, false);
                            localStorage.setItem('usuario', JSON.stringify(this.dataUser));
                            this.toast.success('Bienvenido ' + name.nombre);
                            this.router.navigate(['/estadisticas']);
                        }).catch(() => {
                            this.openModal(modal, false);
                            this.toast.error('Verifique su contraseña', 'Error');
                        });
                    } else {
                        this.openModal(modal, false);
                        this.toast.error('El correo que ingresó no coincide con ninguna cuenta de administrador');
                    }
                } else {
                    this.openModal(modal, false);
                    this.toast.error('El correo que ingresó no coincide con ninguna cuenta');
                }
            });
        } else {
            this.toast.error('No tiene conexión a internet', 'Error');
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
