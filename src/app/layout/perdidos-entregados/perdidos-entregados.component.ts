import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perdidos-entregados',
  templateUrl: './perdidos-entregados.component.html',
  styleUrls: ['./perdidos-entregados.component.scss'],
  animations: [routerTransition()]
})
export class PerdidosEntregadosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
