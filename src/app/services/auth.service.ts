import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

public USER_ID: string = '';

public supabaseClient = inject(SupabaseService).supabaseClient


constructor() { }



// Método para iniciar sesión
async signIn(email: string, password: string) {
  const { data, error } = await this.supabaseClient.auth.signInWithPassword({ email, password });
  localStorage.setItem('token', JSON.stringify(data.session?.access_token));
  localStorage.setItem('email', JSON.stringify(data.user?.email));
  this.USER_ID = data.user?.id ?? '';
  console.log("DATA", data);
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
