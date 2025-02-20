import { Component } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent {

  isLoading: boolean = false;
  clientes: any ; 
  personaEditar: any;
  filtroClientes: any;
  modoOculto: boolean = true;

  constructor(private clientesService: ClientesService) {
  }
  ngOnInit() {
    this.isLoading = true;
    this.getData();
  }
  
  getData(){
    this.clientesService.getData().subscribe(data => {
      //console.log(data);
      this.clientes = data;
      this.filtroClientes = data;
      this.isLoading = false;
    })
  }
  
  eliminarPorId(id: number) {
    this.isLoading = true;
    console.log(id)
    this.clientesService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Persona eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar persona:', error);
      this.isLoading = false;
    });
  }
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    //console.log(input.value);
    //console.log(this.clientes);
    this.filtroClientes = this.clientes.filter( (cleinte: any) =>
      cleinte.cliente_id.toString().includes(input.value.toLowerCase()) ||
      cleinte.rut.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      //cleinte.direccion.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.correo.toLowerCase().includes(input.value.toLowerCase())
    );
    //console.log(this.filtroClientes)
  }

  toggleModoEdicion(persona: any) {
    this.personaEditar = persona;
    this.personaEditar.rut += '-'+this.personaEditar.dv;
    this.editarModoOcuto()
    console.log("algoooo*", this.personaEditar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }

  setLoading() {
    this.isLoading = !this.isLoading;
  }

  clickDelete(name: string, id: number) {
    if(confirm("Esta seguro que desea borrar el cliente: "+name)) {
      this.isLoading = true;
      this.eliminarPorId(id)
    }
  }

}
