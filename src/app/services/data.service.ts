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
  * @param email para buscar los emails de un usuario
  */
 async getEmails(email: any) {
  const { data: user, error } = await this.supabaseClient.from('emails').select("*").eq('email', email);
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
  localStorage.setItem('tecnico', JSON.stringify(this.userData[0].username));

  return { perfil, error }; // Devuelve los datos y el error, si es necesario

}


async getTecnico(id: string) {
  const { data: tecnico, error } = await this.supabaseClient.from('perfiles').select("*").eq('id', id);
  return { tecnico, error }; // Devuelve los datos y el error, si es necesario
}


async getPerfiles() {
  try {
    // Realiza la consulta a la tabla 'perfiles'
    const { data: perfiles, error } = await this.supabaseClient.from('perfiles').select("*");

    // Manejo de errores
    if (error) {
      console.error('Error al obtener perfiles:', error);
      throw new Error('No se pudieron obtener los perfiles');
    }

    // Devolver solo los datos si no hay error
    return perfiles;
  } catch (err) {
    // Manejo de cualquier error adicional
    console.error('Error en getPerfiles:', err);
    throw err; // Vuelve a lanzar el error para que se maneje en otro lugar si es necesario
  }
}


/**
 *
 * @param id para obtener la asignacion de un alistamiento
 */
async getAsignacion(id?: string) {
  // Validar el ID
  if (!id) {
    throw new Error("El ID es requerido");
  }

  // Realizar la consulta
  const { data: usuario, error } = await this.supabaseClient
    .from('alistamientos')
    .select("*")
    .eq('id', id)

  // Manejo de errores
  if (error) {
    console.error("Error al obtener la asignación:", error);
    throw new Error("No se pudo obtener la asignación");
  }

  return usuario; // Solo devuelve el usuario si no hay error
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
      : { tecnico: this.userData?.username }; // Técnicos solo ven sus registros

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
