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

  login() {
    console.log("LOGIN", this.formLogin.value);
  }



}
