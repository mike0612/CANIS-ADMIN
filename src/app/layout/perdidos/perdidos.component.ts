import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService, StorageService } from './../../shared';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perdidos',
  templateUrl: './perdidos.component.html',
  styleUrls: ['./perdidos.component.scss'],
  animations: [routerTransition()]
})
export class PerdidosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
