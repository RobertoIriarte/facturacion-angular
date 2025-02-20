import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/service/categorias.service';

@Component({
  selector: 'app-home-categoria',
  templateUrl: './home-categoria.component.html',
  styleUrls: ['./home-categoria.component.css']
})
export class HomeCategoriaComponent {

  isLoading: boolean = false;
  categorias: any ; 
  categoriaGuardar: any;
  filtroCategoria: any;
  modoOculto: boolean = true;

  constructor(private categoriasService: CategoriasService) {}
  ngOnInit() {
    this.isLoading = true;
    this.getData();
  }
  
  getData(){
    this.categoriasService.getData().subscribe(data => {
      console.log(data);
      this.categorias = data;
      this.filtroCategoria = data;
      this.isLoading = false;
    })
  }
  
  eliminarPorId(id: number) {
    console.log(id)
    this.categoriasService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Categoria eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar categoria:', error);
    });
  }
  
  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    this.filtroCategoria = this.categorias.filter( (cleinte: any) =>
      cleinte.categoria_id.toString().includes(input.value.toLowerCase()) ||
      cleinte.nombre.toLowerCase().includes(input.value.toLowerCase()) ||
      cleinte.descripcion.toLowerCase().includes(input.value.toLowerCase())
    );
  }

  toggleModoNuevo() {
    this.categoriaGuardar = {};
    this.editarModoOcuto()
    console.log("Categoria*", this.categoriaGuardar);
  }

  toggleModoEdicion(categoria: any) {
    this.categoriaGuardar = categoria;
    //this.personaEditar.rut += '-'+this.personaEditar.dv;
    this.editarModoOcuto()
    console.log("Categoria*", this.categoriaGuardar);
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }

  clickDelete(name: string, id: number) {
    if(confirm("Esta seguro que desea borrar la categoria: "+name)) {
      this.isLoading = true;
      this.eliminarPorId(id)
    }
  }

  setLoading() {
    this.isLoading = !this.isLoading;
  }

}
