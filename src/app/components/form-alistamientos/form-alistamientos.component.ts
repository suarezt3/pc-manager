import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
import { log } from 'console';



@Component({
  standalone: true,
  selector: 'app-form-alistamientos',
  templateUrl: './form-alistamientos.component.html',
  styleUrls: ['./form-alistamientos.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, NgZorroModule]
})
export class FormAlistamientosComponent implements OnInit {

  @Output() alistamientoCreado = new EventEmitter<any>(); // envia el evento al padre

  public data: any[] = [];
  public date                      = null;
  public isEnglish                 = false;
  public formAlistamientos!: FormGroup;
  public selectedFile: File | null = null;
  public uploading                 = false;
  public fileList: NzUploadFile[]  = [];
  public id_acta!: string;
  public status!: string;
  public path_acta!: string;
  // public urlDownload!: string;
  public fb                        = inject(FormBuilder);
  public messageService            = inject(NzMessageService);
  public dataService               = inject(DataService);

  private URL_STORAGE = environment.SUPABASE_URL_STORAGE

  constructor() { }


  ngOnInit() {

    this.formAlistamientos = this.fb.group({
      id_tecnico: [''],
      date: ['', [Validators.required]],
      description: [''],
      document_acta: [''],
      opco: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      serial: ['', [Validators.required]],
      plate: ['', [Validators.required]],
      model_pc: [''],
      ticket: ['']
   });

  }


  /**
   * Metodo para actualizar la data de la tabla cuando se crea un nuevo alistamiento
   */
  async loadAlistamientos() {
    const result = await this.dataService.getAlistamientos();
    this.data = result.alistamientos ?? []; // Carga de nuevo los alistamientos
    console.log("DATA", this.data);
  }

  /**
   *
   * @param field valida los campos del formulario
   * @returns
   */
  invalidField( field: string ) {
    return this.formAlistamientos.get(field)?.invalid
            && this.formAlistamientos.get(field)?.touched;
  }




 async enviar() {
    this.path_acta = `${this.URL_STORAGE}${this.path_acta}`;

    this.formAlistamientos.markAllAsTouched();
    if(this.formAlistamientos.invalid) {
      this.messageService.error('Por favor, rellene los campos requeridos.');
      return;
    }else if(!this.id_acta) {
      this.messageService.error('Es obligatorio subir el acta.');
      return;
    }

    this.status = "Finalizado";

    const id_tecnico = JSON.parse(localStorage.getItem('id_user') || 'null');
    const tecnico = JSON.parse(localStorage.getItem('tecnico') || 'null');
    const dataForm = {
      id_tecnico: id_tecnico,
      date: this.formAlistamientos.get('date')?.value,
      description: this.formAlistamientos.get('description')?.value,
      document_acta: this.path_acta,
      opco: this.formAlistamientos.get('opco')?.value,
      usuario: this.formAlistamientos.get('usuario')?.value,
      serial: this.formAlistamientos.get('serial')?.value.toUpperCase(),
      plate: this.formAlistamientos.get('plate')?.value,
      model_pc: this.formAlistamientos.get('model_pc')?.value,
      ticket: this.formAlistamientos.get('ticket')?.value.toUpperCase(),
      status: this.status,
      tecnico: tecnico
    };

  await  this.dataService.createalistamiento(dataForm);
  this.alistamientoCreado.emit(dataForm);
  await this.loadAlistamientos();
    this.formAlistamientos.reset();
    this.id_acta = '';
    this.messageService.success('Datos enviados correctamente');

    console.log("DATAFORM",dataForm);
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
      this.id_acta = result.docUpload?.id ?? '';

      this.path_acta = result.docUpload?.path ?? '';
      this.fileList = [];

    }
    this.uploading = false;
  }


  // downloadActa() {
  //   this.dataService.getDocumentUrl(this.path_acta).then((result) => {
  //     console.log("RESULT", result);
  //     this.urlDownload = result.data.publicUrl;
  //   });
  // }


}
