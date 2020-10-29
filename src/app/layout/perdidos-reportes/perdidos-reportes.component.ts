import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perdidos-reportes',
  templateUrl: './perdidos-reportes.component.html',
  styleUrls: ['./perdidos-reportes.component.scss'],
  animations: [routerTransition()]
})
export class PerdidosReportesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
