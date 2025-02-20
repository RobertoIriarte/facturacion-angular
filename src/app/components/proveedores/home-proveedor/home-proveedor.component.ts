import { Component } from '@angular/core';
import { ProveedoresService } from '../../../service/proveedores.service';

@Component({
  selector: 'app-home-proveedor',
  templateUrl: './home-proveedor.component.html',
  styleUrls: ['./home-proveedor.component.css']
})
export class HomeProveedorComponent {

  isLoading: boolean = false;
  proveedores: any ; 
  proveedorGuardar: any;
  filtroProveedor: any;
  modoOculto: boolean = true;

  constructor(private proveedoresService: ProveedoresService) {}
  ngOnInit() {
    this.isLoading = true;
    this.getData();
  }
  
  getData(){
    this.proveedoresService.getData().subscribe(data => {
      console.log(data);
      this.proveedores = data;
      this.filtroProveedor = data;
      this.isLoading = false;
    })
  }
  
  eliminarPorId(id: number) {
    console.log(id)
    this.proveedoresService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Categoria eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar categoria:', error);
    });
  }
  
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    this.filtroProveedor = this.proveedores.filter( (proveedor: any) =>
      proveedor.proveedor_id.toString().includes(input.value.toLowerCase()) ||
      proveedor.rut.toLowerCase().includes(input.value.toLowerCase()) ||
      proveedor.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      //cleinte.direccion.toLowerCase().includes(input.value.toLowerCase()) ||
      proveedor.correo.toLowerCase().includes(input.value.toLowerCase())
    );
  }

  toggleModoNuevo() {
    this.proveedorGuardar = {};
    this.editarModoOcuto()
    console.log("Proveedor*", this.proveedorGuardar);
  }

  toggleModoEdicion(categoria: any) {
    this.proveedorGuardar = categoria;
    this.proveedorGuardar.rut += '-'+this.proveedorGuardar.dv;
    this.editarModoOcuto()
    console.log("Categoria*", this.proveedorGuardar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }

  setLoading() {
    this.isLoading = !this.isLoading;
  }

}
