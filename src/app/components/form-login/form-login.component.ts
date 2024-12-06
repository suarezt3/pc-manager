import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../../services/supabase.service';
import { AuthService } from '../../services/auth.service';
import { log } from 'console';

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

  constructor() { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: [''],
      password: ['']
    })
  }


  toggleView() {
    this.isLoginView = !this.isLoginView;
  }

  login() {
    let email = this.formLogin.value.email;
    let password = this.formLogin.value.password;
    console.log("INPUTS",email, password);
    this.authSupabase.signUp(email, password)
    .then((response) => {
      console.log("RESPONSE", response);
    })
    .catch((error) => {
      console.log("ERROR", error);
    })
  }

  register() {

  }



}
