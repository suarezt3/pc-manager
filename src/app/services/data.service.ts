import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userData: any = []

  public supabaseClient = inject(SupabaseService).supabaseClient


constructor() {
    // Intenta cargar los datos del usuario desde localStorage al iniciar el servicio
    const storedUserData = localStorage.getItem('userData');

      this.userData = storedUserData ? JSON.parse(storedUserData) : []; // Convierte la cadena JSON de vuelta a un objeto

 }

/**
 *
 * @param data ensertar datos de un usuario en la base de datos
 * @returns
 */
 async createUser(data: any) {
   const { data: user, error } = await this.supabaseClient.from('perfiles').insert(data);
   return { user, error }; // Devuelve los datos y el error, si es necesario
 }


 /**
  *
  * @param
  * @returns Para traer la informacion del usuario al iniciar sesion
  */
 async getUser(emailUSer: any) {
  const { data: perfil, error } = await this.supabaseClient.from('perfiles').select("*").eq('email', emailUSer);
  this.userData = perfil;
  console.log("USERDATA", this.userData[0]);
  // Guarda los datos en localStorage
  localStorage.setItem('userData', JSON.stringify(this.userData));

  return { perfil, error }; // Devuelve los datos y el error, si es necesario

}


}
