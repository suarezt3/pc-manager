import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
import { log } from 'console';
import { Router } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule]
})
export class FormLoginComponent implements OnInit {

  public formLogin!: FormGroup;
  public isLoginView: boolean = true;

  //Injecciones
  public fb = inject(FormBuilder);
  public authSupabase = inject(AuthService);
  public router = inject(Router);

  constructor() { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  /**
   *
   * @param field valida los campos del formulario
   * @returns
   */
  invalidField( field: string ) {
    return this.formLogin.get(field)?.invalid
            && this.formLogin.get(field)?.touched;
  }

  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  async login() {
    this.formLogin.markAllAsTouched();
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;

    try {
      const { data, error } = await this.authSupabase.signIn(email, password);
      console.log("DATA", data);
      console.log("ERROR", error);

      if (error) {
        // Manejar el error según sea necesario
        console.error("Error durante el inicio de sesión:", error);
        return; // Salir de la función si hay un error
      }

      // Aquí puedes manejar el caso exitoso
      console.log("Inicio de sesión exitoso", data);

      localStorage.setItem('token', JSON.stringify(data.session?.access_token));
      this.router.navigate(['/dashboard']);

    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      this.formLogin.reset();
    }
  }


  async register() {
    this.formLogin.markAllAsTouched();
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;

    try {
      const { data, error } = await this.authSupabase.signUp(email, password);
      console.log("DATA", data);
      console.log("ERROR", error);

      if (error) {
        // Manejar el error según sea necesario
        console.error("Error durante el registro:", error);
        return; // Salir de la función si hay un error
      }

      // Aquí puedes manejar el caso exitoso
      console.log("Registro exitoso", data);
      window.location.href = '/login';

    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      this.formLogin.reset();
    }
  }



}
