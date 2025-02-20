import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/service/productos.service';
import { soloTexto, validarDecimalConDosDecimales } from '../../../validators/validatorFn';
import { CategoriasService } from 'src/app/service/categorias.service';
import { UnidadMedidaService } from 'src/app/service/unidad-medida.service';

@Component({
  selector: 'app-guardar-bodega',
  templateUrl: './guardar-bodega.component.html',
  styleUrls: ['./guardar-bodega.component.css']
})
export class GuardarBodegaComponent {

  isLoading: boolean = false;
  categorias: any[] = [];
  medidas: any[] = []; 
  categoriaSeleccionada: any; 
  medidaSeleccionada: any; 
  @Input() productosEditar: any = {};
  @Output() modoOculto = new EventEmitter();
  @Output() loading = new EventEmitter();
  productoForm: FormGroup;


  constructor(private fb: FormBuilder, 
              private productoService: ProductoService,
              private categoriasService: CategoriasService,
              private medidaService : UnidadMedidaService) {
    this.listarCategorias();
    this.listarMedidas();
    this.productoForm = this.fb.group({
      producto_id: '',
      //codigo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      nombre: ['', [Validators.required, soloTexto()]],
      categoria_id: [''],
      fechaCreacion: [''],
      precio: ['0'],
      stock: ['', [Validators.required, validarDecimalConDosDecimales()]],
      medida_id: [''],
      activo: [1],
      fechaElaboracion: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productoForm = this.fb.group({
      producto_id: '',
      //codigo: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      nombre: ['', [Validators.required, soloTexto()]],
      categoria_id: [''],
      fechaCreacion: [''],
      precio: ['0'],
      stock: ['', [Validators.required, validarDecimalConDosDecimales()]],
      medida_id: [''],
      activo: [1],
      fechaElaboracion: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
    });
    if (changes['productosEditar'] && this.productosEditar) {
      this.productoForm.patchValue(this.productosEditar);
      this.seleccionarCategoriaProd(this.productosEditar.categoria_id);
      this.seleccionarMedidaProd(this.productosEditar.medida_id);
    }
  }

  guardar(): void {
    this.loading.emit();
    const valoresFormulario = this.productoForm.value;
    console.log(valoresFormulario);
    valoresFormulario.categoria_id = this.categoriaSeleccionada.categoria_id;
    valoresFormulario.medida_id = this.medidaSeleccionada.medida_id;
    if (this.productoForm.valid) {
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      this.loading.emit();
      Object.values(this.productoForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    if(valoresFormulario.producto_id === ""){
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

  seleccionarCategoriaProd(idCategoria: any): void {
    console.log(idCategoria)
    this.categoriaSeleccionada = this.categorias.find(categoria => categoria.categoria_id == idCategoria);
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

  seleccionarMedida(idMedida: any): void {
    this.medidaSeleccionada = this.medidas.find(medida => medida.medida_id == idMedida.value);
  }

  seleccionarMedidaProd(idMedida: any): void {
    console.log(idMedida)
    this.medidaSeleccionada = this.medidas.find(medida => medida.medida_id == idMedida);
  }

  listarMedidas() {
    if(this.medidas.length != 0){
      this.isLoading = false;
      return;
    }

    this.medidaService.getMedidas().subscribe(resp => {
      this.medidas = resp;
      this.medidaSeleccionada = this.medidas[0];
      this.isLoading = false;
    });
  }

}
