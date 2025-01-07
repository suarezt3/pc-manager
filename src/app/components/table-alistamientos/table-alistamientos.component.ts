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
  public data: any[] = [];
  public dataService = inject(DataService);

  constructor() { }

  ngOnInit() {
    this.dataService.getAlistamientos().then((result) => {
      console.log("RESULT", result.alistamientos);
      this.data = result.alistamientos ?? [];

    });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

}
