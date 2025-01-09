import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormAlistamientosComponent } from '../form-alistamientos/form-alistamientos.component';
import { DataService } from '../../services/data.service';



@Component({
  standalone: true,
  selector: 'app-table-alistamientos',
  templateUrl: './table-alistamientos.component.html',
  styleUrls: ['./table-alistamientos.component.css'],
  imports: [NgZorroModule, FormAlistamientosComponent],

})
export class TableAlistamientosComponent implements OnInit {

  public visible = false;
  public isVisible = false;
  public data: any[] = [];
  public userData: any = {};
  public loadingData: boolean = false;
  public dataService = inject(DataService);

  constructor() { }

  ngOnInit() {

    console.log(this.dataService.userData);
    this.userData = this.dataService.userData;

    this.dataService.getAlistamientos().then((result) => {
      console.log("RESULT", result.alistamientos);
      this.data = result.alistamientos ?? [];
    });

  }


  getButtonText() {
    return this.userData.rol === 'Administrador' ? 'Asignar alistamiento' : 'Nuevo alistamiento';
  }

  /**
   * Para abrir el drawer
   */
  open(): void {
    this.visible = true;
  }

  /**
   * Para cerrar el drawer
   */
  close(): void {
    this.visible = false;
  }

  /**
   * Para mostrar el modal
   */
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
