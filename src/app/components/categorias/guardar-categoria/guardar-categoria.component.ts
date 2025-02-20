import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { soloTexto, validarCorreo, validarDecimalConDosDecimales } from '../../../validators/validatorFn';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-guardar-categoria',
  templateUrl: './guardar-categoria.component.html',
  styleUrls: ['./guardar-categoria.component.css']
})
export class GuardarCategoriaComponent {

  @Input() categoriaGuardar: any = {};
  @Output() modoOculto = new EventEmitter();
  @Output() loading = new EventEmitter();
  categoriaForm: FormGroup;


  constructor(private fb: FormBuilder, private categoriasService: CategoriasService) {
    this.categoriaForm = this.fb.group({
      categoria_id: '',
      nombre: ['', [Validators.required, soloTexto()]],
      descripcion: ['', [Validators.required, soloTexto()]]
    });    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.categoriaForm = this.fb.group({
      categoria_id: '',
      nombre: ['', [Validators.required, soloTexto()]],
      descripcion: ['', [Validators.required, soloTexto()]]
    });
    if (changes['categoriaGuardar'] && this.categoriaGuardar) {
      this.categoriaForm.patchValue(this.categoriaGuardar);
    }
  }
  

  guardar(): void {
    this.loading.emit()
    const valoresFormulario = this.categoriaForm.value;
    
    if (this.categoriaForm.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      this.loading.emit();
      Object.values(this.categoriaForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    console.log("Categoria editada ", valoresFormulario);
    
    if(valoresFormulario.categoria_id === ""){
      this.categoriasService.enviarDatos(valoresFormulario).subscribe(
        response => {
          console.log('Categoria guardada correctamente:', response);
          alert('Categoria guardada correctamente');
          // window.location.reload();
          this.modoOculto.emit();
        },
        error => {
          console.error('Error al editar Categoria:', error);
          alert('Error al guardar categoria: los campos no cumplen con los formatos requeridos');	
        }
      )
    }else{
      this.categoriasService.actualizar(valoresFormulario).subscribe(
        response => {
          console.log('Categoria editada correctamente:', response);
          alert('Categoria editado correctamente');
          // window.location.reload();
          this.modoOculto.emit();
        },
        error => {
          console.error('Error al editar Categoria:', error);
          alert('Error al editar Categoria: los campos no cumplen con los formatos requeridos');	
        }
      )
    }
    
    
  }

}
