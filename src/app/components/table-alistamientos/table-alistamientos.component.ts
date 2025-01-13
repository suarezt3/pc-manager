import { Component, OnInit, inject } from '@angular/core';
import { NgZorroModule } from '../../ng-zorro/ng-zorro.module';
import { FormAlistamientosComponent } from '../form-alistamientos/form-alistamientos.component';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';



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
  public dataPerfiles: any = {}

  public fb = inject(FormBuilder)
  public dataService = inject(DataService);

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
    console.log("PERFILES", this.dataPerfiles);

  })

    this.dataService.getAlistamientos().then((result) => {
      console.log("RESULT", result.alistamientos);
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
    console.log("USERDATA", this.userData);

    return this.userData?.rol === 'Administrador' ? 'Asignar alistamiento' : 'Nuevo alistamiento';
  }

  /**
   * Para abrir el drawer
   */
  open(): void {
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
    console.log(this.formAsignacion.value);
    const formData = {
      usuario: this.formAsignacion.get('usuario')?.value,
      tecnico: this.formAsignacion.get('tecnico')?.value,
      status: "Pendiente",
    };
   await this.dataService.createalistamiento(formData);
   await this.loadAlistamientos();
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
