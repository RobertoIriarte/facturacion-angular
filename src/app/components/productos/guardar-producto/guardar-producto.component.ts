import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/productos.service';
import { soloTexto, validarDecimalConDosDecimales } from '../../../validators/validatorFn';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-guardar-producto',
  templateUrl: './guardar-producto.component.html',
  styleUrls: ['./guardar-producto.component.css']
})
export class GuardarProductoComponent {

  isLoading: boolean = false;
  categorias: any[] = [];
  categoriaSeleccionada: any; 
  @Input() productosEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  @Output() loading = new EventEmitter();
  productoForm: FormGroup;


  constructor(private fb: FormBuilder, 
              private productoService: ProductoService,
              private categoriasService: CategoriasService) {
    this.listarCategorias();
    this.productoForm = this.fb.group({
      producto_id: '',
      nombre: ['', [Validators.required, soloTexto()]],
      categoria_id: ['1'],
      fechaCreacion: [''],
      precio: ['', [Validators.required, validarDecimalConDosDecimales()]],
      stock: ['', [Validators.required, validarDecimalConDosDecimales()]],
      stockCritico: ['', [Validators.required, validarDecimalConDosDecimales()]],
      activo: [1],
      //fechaElaboracion: ['', [Validators.required]],
      //fechaVencimiento: ['', [Validators.required]],
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productoForm = this.fb.group({
      producto_id: '',
      nombre: ['', [Validators.required, soloTexto()]],
      categoria_id: ['1'],
      fechaCreacion: [''],
      precio: ['', [Validators.required, validarDecimalConDosDecimales()]],
      stock: ['', [Validators.required, validarDecimalConDosDecimales()]],
      stockCritico: ['', [Validators.required, validarDecimalConDosDecimales()]],
      activo: [1],
      //fechaElaboracion: ['', [Validators.required]],
      //fechaVencimiento: ['', [Validators.required]],
    });
    if (changes['productosEditar'] && this.productosEditar) {
      this.productoForm.patchValue(this.productosEditar);
    }
  }
  

  guardar(): void {
    this.loading.emit();
    const valoresFormulario = this.productoForm.value;
    console.log(valoresFormulario);
    if (this.productoForm.valid) {
      
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      this.loading.emit();
      Object.values(this.productoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if(valoresFormulario.categoria_id === "1"){
      console.log(valoresFormulario);
      this.productoService.enviarDatos(valoresFormulario).subscribe(response => {
        console.log('Datos enviados correctamente:', response);
        alert('Datos registrados correctamente');
        this.modoOculto.emit();
      }, error => {
        console.error('Error al enviar datos:', error);
        alert('Error al enviar datos: los campos no cumplen con los formatos requeridos');	
      });
    }else{
      this.productoService.actualizar(valoresFormulario).subscribe(
        response => {
          console.log('Producto editada correctamente:');
          alert('Producto editado correctamente');
          this.modoOculto.emit();
        },
        error => {
          console.error('Error al editar producto:', error);
          alert('Error al editar producto: los campos no cumplen con los formatos requeridos');	
          this.modoOculto.emit();
        }
      )

    }
  }

  seleccionarCategoria(idCategoria: any): void {
    this.categoriaSeleccionada = this.categorias.find(categoria => categoria.categoria_id == idCategoria.value);
  }

  listarCategorias() {
    if(this.categorias.length != 0){
      this.isLoading = false;
      return;
    }
    this.categoriasService.getData().subscribe(data => {
      this.categorias = data;
      this.categoriaSeleccionada = this.categorias[0];
      this.isLoading = false;
    })
  }

}
