import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Cambia 'token' por el nombre de tu token

    if (token) {
      return true; // Permitir el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirigir a la vista de login
      return false; // Bloquear el acceso a la ruta
    }
  }
}
