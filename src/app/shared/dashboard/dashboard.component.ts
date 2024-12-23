import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgZorroModule]
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  public userData: any = {};
  public email: string = '';

  public dataService = inject(DataService);

  constructor() {

  }

  async ngOnInit() {
    // Cargar datos del usuario desde el servicio
    const userEmail = localStorage.getItem('email') // Asegúrate de que `email` tenga un valor válido
   // await this.dataService.getUser(userEmail);

   setTimeout(() => {
     this.userData = this.dataService.userData;
   }, 500);


    // Asigna los datos del usuario al componente desde localStorage
  // const storedUserData = localStorage.getItem('userData');

  // // Asegúrate de que `storedUserData` no sea null antes de hacer `JSON.parse`
  // if (storedUserData) {
  //   this.userData = JSON.parse(storedUserData); // Convierte la cadena JSON de vuelta a un objeto
  // } else {
  //   this.userData = {}; // O inicializa como un objeto vacío si no hay datos
  // }
   }
}
