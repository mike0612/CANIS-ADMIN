import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService, DatabaseService } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    public pushRightClass: string;
    usuario: any = [];
    solicitudes: any = [];
    denuncias: any = [];

    constructor(
        private translate: TranslateService,
        public router: Router,
        private auth: AuthService,
        private dbService: DatabaseService,
        private toast: ToastrService
    ) {

        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
        this.dbService.getAllData('/solicitudesMascotas/').valueChanges().subscribe((res) => {
            this.solicitudes = res;
        });
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        Swal.fire({
            title: '<h5> Está seguro que desea salir??</h5>',
            type: 'warning',
            animation: false,
            showCancelButton: true,
            confirmButtonColor: '#03215e',
            cancelButtonColor: '#a8a8a8',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                this.auth.logOut().then(() => {
                    localStorage.removeItem('usuario');
                    this.router.navigate(['/login']);
                    this.toast.success('La sesión se cerró correctamente');
                }).catch(() => {
                    this.toast.error('Ocurrió un error al cerrar la sesión');
                });
            }
        });
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
