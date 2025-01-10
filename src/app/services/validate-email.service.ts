import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidatorEmailService implements AsyncValidator {

  private APIURL: string = environment.SUPABASE_URL + "/rest/v1";
  private http = inject(HttpClient)


    validate( control: AbstractControl): Observable<ValidationErrors | null> {
      let headers = new HttpHeaders({
        'apikey'       : environment.SUPABASE_KEY,
        'Authorization': environment.authorization,
      })
    const email = control.value.trim().toLowerCase();
    return this.http.get<any[]>(`${this.APIURL}/emails?email=eq.${ email }`, {headers})
                .pipe(
                  // delay(3000),
                  map( resp => {
                    return ( resp.length === 0 )
                        ? { emailExist: 'Este email no esta autorizado, contacta con el administrador' }
                        : null;
                  })
                );

  }
}

