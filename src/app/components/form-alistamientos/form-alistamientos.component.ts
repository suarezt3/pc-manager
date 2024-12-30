import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { DataService } from '../../services/data.service';



@Component({
  standalone: true,
  selector: 'app-form-alistamientos',
  templateUrl: './form-alistamientos.component.html',
  styleUrls: ['./form-alistamientos.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgZorroModule]
})
export class FormAlistamientosComponent implements OnInit {

  public date = null;
  public isEnglish = false;
  public formAlistamientos!: FormGroup;
  public selectedFile: File | null = null;
  public uploading = false;
  public fileList: NzUploadFile[] = [];
  public fb = inject(FormBuilder);
  public messageService = inject(NzMessageService);
  public dataService = inject(DataService);


  constructor() { }


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



  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };


 async handleUpload(){
  console.log("FILE", this.fileList);
  if (this.fileList.length > 1) {
    this.messageService.error('Solo se permite cargar un archivo.');
    return;
  }

    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    this.uploading = true;
    const result = await this.dataService.uploadDocument( this.fileList[0].name ,formData);
    if (result.error) {
        this.messageService.error(result.error.message);
    } else {
      this.messageService.success('Documento cargado correctamente');
      console.log("DATA", result.docUpload);
      this.fileList = [];

    }
    this.uploading = false;
  }

}
