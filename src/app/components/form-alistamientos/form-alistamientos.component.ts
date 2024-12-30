import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadModule } from 'ng-zorro-antd/upload';
import { DataService } from '../../services/data.service';

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
  selectedFile: File | null = null;

  constructor() { }

  public fb = inject(FormBuilder);
  public messageService = inject(NzMessageService);
  public dataService = inject(DataService);


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }



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


  async uploadFile() {
    if (this.selectedFile) {
      try {
        const result = await this.dataService.uploadDocument(this.selectedFile);
        console.log('File uploaded successfully:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }



  // handleChange(event: NzUploadChangeParam): void {
  //   if (event.file.status !== 'uploading') {
  //     console.log( "DOCUMENTO", event.file, event.fileList);
  //     this.dataService.uploadDocument(event.file)
  //     .then((res) => {
  //       console.log("RES", res);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR", err);
  //     });
  //   }
  //   if (event.file.status === 'done') {
  //     this.messageService.success(`${event.file.name} file uploaded successfully`);
  //   } else if (event.file.status === 'error') {
  //     this.messageService.error(`${event.file.name} file upload failed.`);
  //   }
  // }


  enviar() {




    const id_tecnico = JSON.parse(localStorage.getItem('id_user') || 'null');
    const dataForm = {
      id_tecnico: id_tecnico,
      date: this.formAlistamientos.get('date')?.value,
      description: this.formAlistamientos.get('description')?.value,
      document_acta: this.formAlistamientos.get('document_acta')?.value,
      opco: this.formAlistamientos.get('opco')?.value,
      usuario: this.formAlistamientos.get('usuario')?.value,
      serial: this.formAlistamientos.get('serial')?.value,
      plate: this.formAlistamientos.get('plate')?.value,
      model_pc: this.formAlistamientos.get('model_pc')?.value,
      ticket: this.formAlistamientos.get('ticket')?.value
    };

    console.log(dataForm);
  }
}
