import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './../../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    usuario: any = [];

    @Output() collapsedEvent = new EventEmitter<boolean>();

    constructor(
        private translate: TranslateService, 
        public router: Router,
        private auth: AuthService,
        private toast: ToastrService,
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
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = '';
        this.pushRightClass = 'push-right';
        this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }


    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    changeLang(language: string) {
        this.translate.use(language);
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
                    this.toast.success('La sesión se cerró correctamente')
                }).catch(() =>{
                    this.toast.error('Ocurrió un error al cerrar la sesión');
                })
            }
        });
    }
}
