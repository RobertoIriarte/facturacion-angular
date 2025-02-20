import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloTexto, validarCorreo } from '../../../validators/validatorFn';
import { ProveedoresService } from 'src/app/service/proveedores.service';

@Component({
  selector: 'app-guardar-proveedor',
  templateUrl: './guardar-proveedor.component.html',
  styleUrls: ['./guardar-proveedor.component.css']
})
export class GuardarProveedorComponent {

  @Input() proveedorGuardar: any = {};
  @Output() modoOculto = new EventEmitter();
  @Output() loading = new EventEmitter();
  proveedorForm: FormGroup;


  constructor(private fb: FormBuilder, private proveedoresService: ProveedoresService) {
    this.proveedorForm = this.fb.group({
      proveedor_id: '',
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+[-|‐]{1}[0-9kK]{1}$'), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, soloTexto()]],
      correo: ['', [Validators.required, validarCorreo()]],
      fechaCreacion: ['', [Validators.required]],
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.proveedorForm = this.fb.group({
      proveedor_id: '',
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+[-|‐]{1}[0-9kK]{1}$'), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, soloTexto()]],
      correo: ['', [Validators.required, validarCorreo()]],
      fechaCreacion: ['', [Validators.required]],
    });
    if (changes['proveedorGuardar'] && this.proveedorGuardar) {
      this.proveedorForm.patchValue(this.proveedorGuardar);
    }
    console.log("onchange");
  }
  

  guardar(): void {
    this.loading.emit();
    const valoresFormulario = this.proveedorForm.value;
    
    if (this.proveedorForm.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      this.loading.emit();
      Object.values(this.proveedorForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    var tmp 	= valoresFormulario.rut.split('-');
    var digv	= tmp[1]; 
    var rut 	= tmp[0];

    valoresFormulario.rut = rut;
    valoresFormulario.dv = digv;
    valoresFormulario.activo = 1;

    console.log("Proveedor editada ", valoresFormulario);

    if(valoresFormulario.proveedor_id === ""){
      this.proveedoresService.enviarDatos(valoresFormulario).subscribe(
        response => {
          console.log('Proveedor guardada correctamente:', response);
          alert('Proveedor guardado correctamente');
          // window.location.reload();
          this.modoOculto.emit();
        },
        error => {
          console.error('Error al editar Proveedor:', error);
          alert('Error al editar Proveedor: los campos no cumplen con los formatos requeridos');	
        }
      )
    }else{
      this.proveedoresService.actualizar(valoresFormulario).subscribe(
        response => {
          console.log('Proveedor editada correctamente:', response);
          alert('Proveedor editado correctamente');
          // window.location.reload();
          this.modoOculto.emit();
        },
        error => {
          console.error('Error al editar proveedor:', error);
          alert('Error al editar Proveedor: los campos no cumplen con los formatos requeridos');	
        }
      )
    }
    
  }

}
