import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClientesService } from 'src/app/service/clientes.service';
import { FacturasService } from 'src/app/service/facturas.service';
import { ProductoService } from 'src/app/service/productos.service';
import { cantidadMayorQueCero } from 'src/app/validators/validatorFn';

@Component({
  selector: 'app-ver-factura',
  templateUrl: './ver-factura.component.html',
  styleUrls: ['./ver-factura.component.css']
})
export class VerFacturaComponent {

  isLoading: boolean = false;
  clientes: any[] = [];
  productos: any[] = [];
  datosCabecera: any = {};
  detCabecera: any = {};
  clienteSeleccionado: any; 
  productoSeleccionado: any; 
  formulario: FormGroup;
  productosForm!: FormGroup;
  listProductos: any[] = [];
  modoOculto: boolean = true;

  subtotal: number = 0;
  porcentajeIva: number = 19;
  igv: number = 0;
  total: number = 0;
  stockProducto = '';
  hayStock = true;

  constructor(
              private formBuilder: FormBuilder, 
              private clienteComponent: ClientesService, 
              private facturasService: FacturasService, 
              private productoService: ProductoService,
              private _route: ActivatedRoute
              ) {
    this.isLoading=true;
    this.listarClientes();
    
    this.formulario = this.formBuilder.group({
      numFactura: ['', [Validators.required]],
      cliente: ['', [Validators.required, ]],
      rut: [''],
      razonSocial: ['', [Validators.required, ]],
      correo: ['', [Validators.required, ]],
      
    });

    this.productosForm = this.formBuilder.group({
      codProducto: ['', [Validators.required]],
      nombreProducto: ['', [Validators.required]],
      precioProducto: ['', [Validators.required, ]],
      cantidadProducto: [1, [Validators.required, cantidadMayorQueCero() ]],
    });
  }
  
  
  ngOnInit(){
    
  }

  getCabeceraById(id: string){
    this.facturasService.getFacturaById(+id).subscribe(
      resp => {
        console.log(resp)
        this.datosCabecera = resp;
        this.seleccionarCliente(this.datosCabecera.rutCliente);
        this.detCabecera = this.datosCabecera.detFactura;
        this.detCabecera.forEach((det: { precio: any; cantidad: any; codigoProducto: any; }) => {
          console.log(det);
          let prod = this.productos.filter(prod => prod.producto_id === det.codigoProducto )[0]
          const producto = {
            "codProducto": det.codigoProducto,
            "nombreProducto": prod.nombre,
            "precioProducto": det.precio,
            "cantidadProducto": det.cantidad
          };
          this.agregarProducto(producto);
        });
        this.isLoading=false;
      }
    );
  }

  seleccionarCliente(idCliente: any): void{
    console.log(idCliente)
    this.clienteSeleccionado = this.clientes.find(cliente => cliente.rut == idCliente);
  }

  agregarProducto(producto: any){   
    this.listProductos.push(producto);
    console.log("producto ",producto);
    this.subtotal = this.listProductos.reduce((total, producto) => total + producto.precioProducto, 0);
    this.calcularValores(this.listProductos);
  }

  calcularValores( list: any){
    this.subtotal = list.reduce((total: any, producto: any) => total + (producto.precioProducto * producto.cantidadProducto), 0);
    this.igv = this.subtotal * (this.porcentajeIva / 100);
    this.total = this.subtotal + this.igv;

    console.log(this.subtotal)
  }

  seleccionarProdcuto(idProducto: any): void{
    this.productoSeleccionado = this.productos.find( producto => producto.producto_id == idProducto.value);
    
  }

  listarClientes() {
    this.clienteComponent.getData().subscribe(data => {
      this.clientes = data;
      this.clientes.forEach( cliente => cliente.rut += '-'+cliente.dv);
      this.listarProductos();
    })
  }

  listarProductos() {
    this.productoService.getDataVentas().subscribe(data => {
      this.productos = data;
      this._route.paramMap.subscribe(
        params => {
          let idFactura = params.get('id');
          if(idFactura){
            this.getCabeceraById(idFactura);
          }
        }
      );
    })
  }

}
