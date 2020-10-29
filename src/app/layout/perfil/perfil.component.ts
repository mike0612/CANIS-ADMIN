import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import { Administrador, DatabaseService, AuthService } from './../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  animations: [routerTransition()]
})
export class PerfilComponent implements OnInit {

  user = {} as Administrador;
  userTemp: any = [];
  pass: any = [];
  database = '/administracion/';
  private regEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  constructor(
    private dbService: DatabaseService,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('usuario'));
  }

  editUser(user) {
    Swal.fire({
      html:
        '<p>Esta a punto de guardar los datos de perfil.' +
        ' Se cerrará la sesión para establecer los cambios.' +
        ' ¿Deséa continuar?</p>',
      type: 'question',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.dbService.addNew(this.database, user).then(() => {
          this.toastr.success('Cambios guardados correctamente');
          this.auth.logOut().then(() => {
            // localStorage.removeItem('usuario');
            this.router.navigate(['/login']);
          }).catch(() => {
            this.toastr.error('Ocurrió un error al cerrar la sesión');
          });
        }).catch((e) => {
          this.toastr.error('Ocurrió un error intente más tarde', 'Error');
        });
      }
    });
  }

  cambiarPass() {
    if (this.pass.password.length > 5 && this.pass.confirmarPass.length > 5) {
      if (this.pass.password === this.pass.confirmarPass) {
        Swal.fire({
          html:
            '<p>La contraseña actual se cambiará.' +
            ' ¿Deséa continuar?</p>',
          type: 'question',
          animation: false,
          showCancelButton: true,
          confirmButtonColor: '#03215e',
          cancelButtonColor: '#a8a8a8',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.auth.changePass(this.pass.password).then(() => {
              this.pass = [];
              this.toastr.success('La contraseña fué cambiada correctamente');
            }).catch(() => {
              this.toastr.error('Ocurrió un error al cambiar la contraseña, inténtelo más tarde');
            });
          }
        });
      } else {
        this.toastr.error('Las contraseñas no coinciden');
      }
    } else {
      this.toastr.error('La contraseña debe tener una longitud mayor a 6');
    }
  }

  cambiarMail(user) {
    if (this.regEx.test(user.correo)) {
      Swal.fire({
        title: '<h5 style="font-size: 17px;">' +
          'Su correo actual se cambiará por:<br>' + user.correo + '</h5>',
        html:
          '<p style="font-size: 15px;"> ' +
          ' En su próximo inicio de sesión debera usar su nuevo correo.' +
          ' Para aplicar los cambios se cerrará la sesión actual ' +
          '¿Desea continuar?</p>',
        animation: false,
        showCancelButton: true,
        confirmButtonColor: '#03215e',
        cancelButtonColor: '#a8a8a8',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.auth.updateEmail(user.correo).then(() => {
            this.dbService.addNew(this.database, user).then(() => {
              this.auth.logOut().then(() => {
                // localStorage.removeItem('usuario');
                this.toastr.success('El correo se actualizó correctamente');
                this.router.navigate(['/login']);
              }).catch(() => {
                this.toastr.error('Ocurrió un error al cerrar la sesión');
              });
            }).catch(() => {
              this.toastr.error('Ocurrió un error al cambiar el correo');
            });
          }).catch(() => {
            this.toastr.error('Ocurrió un error al cambiar el correo,' +
              ' inténte más tarde, , revise su conexió a internet o inténte con otro correo');
          });
        }
      });
    } else {
      this.toastr.error('Ingrese un correo con formato: "nombre@email.com".', 'Correo inválido');
    }
  }

  update(user) {
    this.auth.updateEmail(user.correo).then(() => {
      this.dbService.addNew(this.database, user).then(() => {
        this.auth.logOut().then(() => {
          // localStorage.removeItem('usuario');
          this.toastr.success('El correo se actualizó correctamente');
          this.router.navigate(['/login']);
        }).catch(() => {
          this.toastr.error('Ocurrió un error al cerrar la sesión');
        });
      }).catch(() => {
        this.toastr.error('Ocurrió un error al cambiar el correo');
      });
    }).catch(() => {
      this.toastr.error('Ocurrió un error al cambiar el correo, inténte más tarde');
    });
  }

  eliminarCuenta(user) {
    Swal.fire({
      html:
        '<p>La cuenta se eliminará permanentemente.' +
        ' ¿Está seguro que deséa continuar?</p>',
      type: 'question',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.auth.deleteAccount().then(() => {
          this.dbService.deleteData(this.database, user).then(() => {
            this.auth.logOut().then(() => {
              localStorage.removeItem('usuario');
              this.router.navigate(['/login']);
            }).catch(() => {
              this.toastr.error('Ocurrió un error al cerrar la sesión');
            });
          }).catch(() => {
            this.toastr.error('Ocurrió un error al cambiar el correo, inténte más tarde');
          });
        }).catch(() => {
          this.toastr.error('Ocurrió un error al cambiar el correo, inténte más tarde');
        });
      }
    });
  }

  clear() {

  }

}

