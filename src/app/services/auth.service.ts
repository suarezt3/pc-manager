import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public supabaseClient = inject(SupabaseService).supabaseClient


constructor() { }



// Método para iniciar sesión
async signIn(email: string, password: string) {
  const { data, error } = await this.supabaseClient.auth.signInWithPassword({ email, password });
  console.log("DATA", data);
  localStorage.setItem('token', JSON.stringify(data.session?.access_token));
  return { data, error }; // Devuelves los datos y el error, si es necesario
  //return await this.supabaseClient.auth.signInWithPassword({ email, password });
}

// Método para registrarse
async signUp(email: string, password: string) {
  const { data, error } = await this.supabaseClient.auth.signUp({ email, password });
  console.log("DATA", data);
  console.log("ERROR", error);
  return { data, error }; // Devuelves los datos y el error, si es necesario

  // return await this.supabaseClient.auth.signUp({ email, password });
}

// Método para cerrar sesión
async signOut() {
  return await this.supabaseClient.auth.signOut();
}


}
