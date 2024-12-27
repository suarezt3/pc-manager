import { Component, OnInit } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormAlistamientosComponent } from '../form-alistamientos/form-alistamientos.component';



@Component({
  standalone: true,
  selector: 'app-table-alistamientos',
  templateUrl: './table-alistamientos.component.html',
  styleUrls: ['./table-alistamientos.component.css'],
  imports: [NgZorroModule, FormAlistamientosComponent],

})
export class TableAlistamientosComponent implements OnInit {

  public visible = false;

  constructor() { }

  ngOnInit() {
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
