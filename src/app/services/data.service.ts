import { Injectable, inject, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { log } from 'console';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  public userData: any = []

  public supabaseClient = inject(SupabaseService).supabaseClient


constructor() {
    // Intenta cargar los datos del usuario desde localStorage al iniciar el servicio
   // const storedUserData = localStorage.getItem('userData');
   // console.log("storeUSERDATA", storedUserData);


      //this.userData = storedUserData ? JSON.parse(storedUserData) : []; // Convierte la cadena JSON de vuelta a un objeto

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
 * @param data ensertar datos de un usuario en la base de datos
 * @returns
 */
 async createalistamiento(data: any) {
  const { data: user, error } = await this.supabaseClient.from('alistamientos').insert(data);
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
  localStorage.setItem('userData', JSON.stringify(this.userData[0]));
  localStorage.setItem('id_user', JSON.stringify(this.userData[0].id));

  return { perfil, error }; // Devuelve los datos y el error, si es necesario

}


async getTecnico(id: string) {
  const { data: tecnico, error } = await this.supabaseClient.from('perfiles').select("*").eq('id', id);
  return { tecnico, error }; // Devuelve los datos y el error, si es necesario
}


/**
 *
 * @returns Para traer los datos de los alistamientos
 */
async getAlistamientos() {
  const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    this.userData = JSON.parse(storedUserData);
  } else {
    console.warn('No se encontraron datos de usuario en localStorage');
  }
  try {
    // Definir filtro base
    const filtro = this.userData.rol === "Administrador"
      ? {} // Administradores ven todo
      : { id_tecnico: this.userData?.id }; // Técnicos solo ven sus registros

    // Obtener los datos desde Supabase
    const { data: alistamientos, error } = await this.supabaseClient
      .from('alistamientos')
      .select("*")
      .match(filtro); // Aplicar filtro dinámico

    // Manejar errores
    if (error) {
      console.error('Error obteniendo alistamientos:', error);
      throw new Error('No se pudieron obtener los alistamientos.');
    }

    return { alistamientos, error: null }; // Devolver los datos
  } catch (error) {
    return { alistamientos: null, error }; // Manejar errores generales
  }
}


//para subir el documento
async uploadDocument(fileName: string, doc: any) {
  console.log("DOC", doc);
  const { data: docUpload, error } = await this.supabaseClient.storage.from('documentos').upload(fileName, doc); // Usamos el nombre del archivo
  return { docUpload, error }; // Devuelve los datos y el error, si es necesario
}


//Para descargar el documento
async downloadDocument(pathDocument: string) {
  console.log("PATHDOCUMENT", pathDocument);
  const { data, error } = await this.supabaseClient.storage.from('documentos').download(pathDocument); // Usamos el nombre del archivo
  console.log("RESPUESTA", data);

  return { data, error }; // Devuelve los datos y el error, si es necesario
}


//para obtener la URL del documento
// async getDocumentUrl(pathDocument: string) {
//   console.log("PATHDOCUMENT", pathDocument);
//   const { data } = await this.supabaseClient.storage.from("documentos").getPublicUrl(pathDocument); // Usamos el nombre del archivo
//   console.log("URL", data);

//   return { data}; // Devuelve los datos y el error, si es necesario
// }

}
