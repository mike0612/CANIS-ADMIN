import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { DatabaseService } from './../../shared';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.component.html',
  styleUrls: ['./denuncias.component.scss'],
  animations: [routerTransition()]
})
export class DenunciasComponent implements OnInit {

  private database = '/denuncias/';
  title: string;

  denuncias: any = [];
  denuncia: any = [];

  loadingDB = false;
  loadingImge = false;

  table = true;
  info = false;

  constructor(
    private dbService: DatabaseService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.loadingDB = true;
    this.dbService.getAllData(this.database).valueChanges().subscribe((res) => {
      this.loadingDB = false;
      this.denuncias = res.sort(this.compare);
    });
  }

  compare(a, b) {
    if (a.id < b.id) { return 1; }
    if (a.id > b.id) { return -1;}
    return 0;
  }


  viewInfo(denuncia) {
    this.table = false;
    this.info = true;
    this.denuncia = denuncia;
  }

  viewTable() {
    this.table = true;
    this.info = false;
    this.denuncia = [];
  }


  deleteMascota(denuncia) {
    Swal.fire({
      title: '<h5> Eliminar la denuncia con folio: ' + denuncia.folio + '?</h5>',
      html:
        '<p>Esta acción eliminará de forma permanente la denuncia. ' +
        '¿Desea continuar?</p>',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#03215e',
      cancelButtonColor: '#a8a8a8',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.dbService.deleteData(this.database, denuncia).then(() => {
          this.toastr.success('Denuncia eliminada');
        });
      }
    });
  }

  exportPDF() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4');
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('DENUNCIA_' + this.denuncia.folio + '.pdf');
    });
  }

}
