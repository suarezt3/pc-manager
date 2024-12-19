import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { timer } from 'rxjs';
import { DataService } from '../../services/data.service';




@Component({
  standalone: true,
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgZorroModule]
})
export class FormLoginComponent implements OnInit {

  public formLogin!: FormGroup;
  public isLoginView: boolean = true; // Cambia esto según la lógica de tu aplicación
  public isLoader: boolean = false;
  public textErrorResp!: string;
  public isErrorResp: boolean = false;
  public isAutenticado: boolean = false;

  //Injecciones
  public fb = inject(FormBuilder);
  public authSupabase = inject(AuthService);
  public dataService = inject(DataService);
  public router = inject(Router);

  constructor() { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email    : ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.minLength(6)]],
      username: ['', this.isLoginView ? null : Validators.required], // Requerido solo si no está en vista de inicio de sesión
      rol: ['', this.isLoginView ? null : Validators.required], // Requerido solo si no está en vista de inicio de sesión
      is_active: [false]
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


  /**
   * The `toggleView` funcion que carga si es login o resgitro de un usuario.
   */
  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  /**
   *
   * @returns Inicio de sesion
   */
  async login() {
    this.isLoader = true;
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

        this.textErrorResp = "Credenciales incorrectas";
        this.isErrorResp = true;
        this.isLoader = false;
        timer(4000).subscribe(() => {
          this.isErrorResp = false;
        });
        return; // Salir de la función si hay un error
      }

      // Aquí puedes manejar el caso exitoso
      console.log("Inicio de sesión exitoso", data);

      // localStorage.setItem('token', JSON.stringify(data.session?.access_token));
      this.isLoader = false;
      this.router.navigate(['/dashboard']);

    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      this.formLogin.reset();
    }
  }


  /**
   *
   * @returns Registro
   */
  async register() {
    this.isLoader = true;
    this.formLogin.markAllAsTouched();
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;

    try {
      const { data, error } = await this.authSupabase.signUp(email, password);

      if (error) {
        // Manejar el error según sea necesario
        console.error("Error durante el registro:", error.message);
        if (error.message === "Database error saving new user") {
          this.textErrorResp = `Disculpa tenemos un probema interno, intenta de nuevo más tarde`;
          this.isErrorResp = true;
          this.isLoader = false;
          timer(4000).subscribe(() => {
            this.isErrorResp = false;
          });
        } else if (error.message === "User already registered") {
          this.textErrorResp = `Ya existe un usuario con el correo: ${email}`;
          this.isErrorResp = true;
          this.isLoader = false;
          timer(4000).subscribe(() => {
            this.isErrorResp = false;
          });
        }
        return; // Salir de la función si hay un error
      }

      // Aquí puedes manejar el caso exitoso
      console.log("Registro exitoso", data);
      this.isLoader = false;
      console.log("ROL", data?.user?.role);
      let rol = data?.user?.role;

      if (rol === "authenticated") {
        this.isAutenticado = true;

        const dataUser = {
          username: this.formLogin.value.username,
          email: this.formLogin.value.email,
          rol: this.formLogin.value.rol,
          is_active: true
        }

        this.dataService.createUser(dataUser)

        setTimeout(() => {
          this.isAutenticado = false; // Ocultar mensaje de éxito
          window.location.href = '/login'; // Redirigir al login
        }, 2500);
      }

    } catch (err) {
      console.error("Error inesperado:", err);
    } finally {
      this.formLogin.reset();
    }
  }



}
