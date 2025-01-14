import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormAlistamientosComponent } from '../form-alistamientos/form-alistamientos.component';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { log } from 'console';



@Component({
  standalone: true,
  selector: 'app-table-alistamientos',
  templateUrl: './table-alistamientos.component.html',
  styleUrls: ['./table-alistamientos.component.css'],
  imports: [ReactiveFormsModule, FormsModule, NgZorroModule, FormAlistamientosComponent],

})
export class TableAlistamientosComponent implements OnInit {

  public formAsignacion!: FormGroup;
  public visible = false;
  public isVisible = false;
  public data: any[] = [];
  public userData: any = {};
  public loadingData: boolean = false;
  public dataPerfiles: any = {};
  public usuarioActual: any = {};

  public fb             = inject(FormBuilder)
  public dataService    = inject(DataService);
  public messageService = inject(NzMessageService);

  constructor() {
    const storedUserData = localStorage.getItem('userData');
  if (storedUserData) {
    this.userData = JSON.parse(storedUserData);
  } else {
    console.warn('No se encontraron datos de usuario en localStorage');
  }
   }

  ngOnInit() {

    this.formAsignacion = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      tecnico: ['', [Validators.required]],
    });


  this.dataService.getPerfiles().then((perfiles) => {
    this.dataPerfiles = perfiles
  })

    this.dataService.getAlistamientos().then((result) => {
      this.data = result.alistamientos ?? [];
    });

  }

  // Método para manejar el evento de creación de alistamiento
  onAlistamientoCreado() {
    this.loadAlistamientos(); // Carga de nuevo los alistamientos
  }


  /**
   *
   * @param field valida los campos del formulario
   */
  invalidField( field: string ) {
    return this.formAsignacion.get(field)?.invalid
            && this.formAsignacion.get(field)?.touched;
  }


  async loadAlistamientos() {
    this.loadingData = true;
    const result = await this.dataService.getAlistamientos();
    this.data = result.alistamientos ?? [];
    this.loadingData = false;
  }

  getButtonText() {
    return this.userData?.rol === 'Administrador' ? 'Asignar alistamiento' : 'Nuevo alistamiento';
  }

  /**
   * Para abrir el drawer
   */
  async openDrawer(id?: string) {
    console.log("ID", id);

    if (id) {
      try {
        const result = await this.dataService.getAsignacion(id);
        this.usuarioActual = result;
        console.log("RESULT", result);
      } catch (error) {
        console.error("Error al obtener la asignación:", error);
        // Puedes manejar el error de acuerdo a tus necesidades, como mostrar un mensaje al usuario
      }
    }

    this.visible = true;
  }
  /**
   * Para cerrar el drawer
   */
  close(): void {
    this.visible = false;
  }

  /**
   * Para mostrar el modal
   */
  showModal(): void {
    this.isVisible = true;
  }

 async handleOk() {
  this.formAsignacion.markAllAsTouched();
  if (this.formAsignacion.valid) {
    const formData = {
      usuario: this.formAsignacion.get('usuario')?.value.toLowerCase(),
      tecnico: this.formAsignacion.get('tecnico')?.value,
      status: "Pendiente",
    };
   const result = await this.dataService.createalistamiento(formData);
   console.log("ASIGNACION", result);

   this.messageService.success('Tarea asignada correctamente!');
   await this.loadAlistamientos();
    this.isVisible = false;
    this.formAsignacion.reset();
  }

 }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
