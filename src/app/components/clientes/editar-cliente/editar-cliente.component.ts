import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';
import { soloTexto, validarCorreo, validarDecimalConDosDecimales } from '../../../validators/validatorFn';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {

  
  @Input() personaEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  @Output() loading = new EventEmitter();
  personaForm: FormGroup;


  constructor(private fb: FormBuilder, private clienteService: ClientesService) {
    this.personaForm = this.fb.group({
      cliente_id: '',
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+[-|‐]{1}[0-9kK]{1}$'), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, soloTexto()]],
      correo: ['', [Validators.required, validarCorreo()]],
      fechaCreacion: ['', [Validators.required]],
    });    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personaEditar'] && this.personaEditar) {
      this.personaForm.patchValue(this.personaEditar);
    }
  }
  

  guardar(): void {
    this.loading.emit()
    const valoresFormulario = this.personaForm.value;
    
    if (this.personaForm.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      
      Object.values(this.personaForm.controls).forEach(control => {
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

    console.log("Persona editada ", valoresFormulario);
    
    this.clienteService.actualizar(valoresFormulario).subscribe(
      response => {
        console.log('Persona editada correctamente:', response);
        alert('Cliente editado correctamente');
        // window.location.reload();
        this.modoOculto.emit();
      },
      error => {
        console.error('Error al editar persona:', error);
        alert('Error al editar cliente: los campos no cumplen con los formatos requeridos');	
      }
    )
  }

}
