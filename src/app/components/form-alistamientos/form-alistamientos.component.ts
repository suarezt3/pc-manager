import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';

@Component({
  standalone: true,
  selector: 'app-form-alistamientos',
  templateUrl: './form-alistamientos.component.html',
  styleUrls: ['./form-alistamientos.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgZorroModule]
})
export class FormAlistamientosComponent implements OnInit {

  date = null;
  isEnglish = false;

  public formAlistamientos!: FormGroup;

  constructor() { }

  public fb = inject(FormBuilder);


  ngOnInit() {

    this.formAlistamientos = this.fb.group({
      id_tecnico: [''],
      date: [''],
      description: [''],
      document_acta: [''],
      opco: [''],
      usuario: [''],
      serial: [''],
      plate: [''],
      model_pc: [''],
      ticket: ['']
  });





  }
}
