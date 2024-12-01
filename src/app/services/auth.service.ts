import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public supabaseClient = inject(SupabaseService).supabaseClient


constructor() { }



// Método para iniciar sesión
async signIn(email: string, password: string) {
  return await this.supabaseClient.auth.signInWithPassword({ email, password });
}

// Método para registrarse
async signUp(email: string, password: string) {
  return await this.supabaseClient.auth.signUp({ email, password });
}

// Método para cerrar sesión
async signOut() {
  return await this.supabaseClient.auth.signOut();
}


}
