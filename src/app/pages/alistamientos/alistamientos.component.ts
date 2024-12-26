import { Component, OnInit } from '@angular/core';
import { TableAlistamientosComponent } from '../../components/table-alistamientos/table-alistamientos.component';

@Component({
  standalone: true,
  selector: 'app-alistamientos',
  templateUrl: './alistamientos.component.html',
  styleUrls: ['./alistamientos.component.css'],
  imports: [TableAlistamientosComponent],
})
export class AlistamientosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
