import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlistamientosComponent } from '../../pages/alistamientos/alistamientos.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [NgZorroModule, AlistamientosComponent]
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;
  public userData: any = {};
  public email: string = '';

  public dataService = inject(DataService);
  public authService = inject(AuthService);
  public router = inject(Router);

  constructor() {


  }

  ngOnInit() {
    setTimeout(() => {
      this.userData = this.dataService.userData;
    }, 600);

   }


   logout(){
    this.authService.signOut().then(() => {
      // Limpia userData al cerrar sesión
      this.dataService.userData = {};
      this.userData = this.dataService.userData;
      this.router.navigate(['/login']);
    });
   }

}
