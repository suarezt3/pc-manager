import { Injectable, inject } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public supabaseClient = inject(SupabaseService).supabaseClient

constructor() { }

 async createUser(data: any) {
   const { data: user, error } = await this.supabaseClient.from('perfiles').insert(data);
   return { user, error }; // Devuelve los datos y el error, si es necesario
 }
}
