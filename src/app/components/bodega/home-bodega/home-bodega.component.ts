import { Component } from '@angular/core';
import { CategoriasService } from 'src/app/service/categorias.service';
import { ProductoService } from 'src/app/service/productos.service';
import { UnidadMedidaService } from 'src/app/service/unidad-medida.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home-bodega',
  templateUrl: './home-bodega.component.html',
  styleUrls: ['./home-bodega.component.css']
})
export class HomeBodegaComponent {

  isLoading: boolean = false;
  productos: any[] = [];
  categorias: any[] = [];
  medidas: any[] = []; 
  productosEditar: any;
  filtroProductos: any;
  modoOculto: boolean = true;
  
  constructor(private productoService: ProductoService,
              private categoriasService: CategoriasService,
              private medidaService : UnidadMedidaService) {
    
    this.medidaService.getMedidas().subscribe(resp => {
      this.medidas = resp
      this.categoriasService.getData().subscribe(data => {
        this.categorias = data;
        this.getData();
      });
    });
  }

  ngOnInit() {
    this.isLoading = true;
  }
  
  getData(){
    this.productoService.getDataBodega().subscribe(data => {
      this.productos = data;
      this.productos.forEach(producto => {
        producto.categoria = this.categorias.find(categoria => categoria.categoria_id == producto.categoria_id);
        producto.medida = this.medidas.find(medida => medida.medida_id == producto.medida_id);
      });
      this.filtroProductos = data;
      this.isLoading = false;
    })
  }
  
  eliminarPorId(id: number) {
    console.log(id)
    this.productoService.eliminarPorId(id).subscribe(
      (response) => {
      console.log('Producto eliminada correctamente');
      this.getData();
    }, error => {
      console.error('Error al eliminar producto:', error);
    });
  }

  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(this.filtroProductos);
    this.filtroProductos = this.productos.filter( (persona: any) =>
      persona.producto_id.toString().includes(input.value.toLowerCase()) ||
      persona.nombre.toLowerCase().includes(input.value.toLowerCase())
    );
    console.log(this.filtroProductos)
  }

  seleccionarCategoria(idCategoria: any): void {
    //this.categoriaSeleccionada = this.categorias.find(categoria => categoria.categoria_id == idCategoria.value);
    console.log(idCategoria.value)
    console.log(this.filtroProductos);
    if(idCategoria.value == ""){
      this.filtroProductos = this.productos
      return;
    }
    this.filtroProductos = this.productos.filter( (persona: any) =>
      persona.categoria.categoria_id.toString().includes(idCategoria.value)
    );
    console.log(this.filtroProductos)
  }

  toggleModoNuevo(){
    this.editarModoOcuto()
  }

  toggleModoEdicion(persona: any) {
    this.productosEditar = persona;
    this.editarModoOcuto()
  }

  editarModoOcuto(){
    this.modoOculto = !this.modoOculto;
    this.getData();
  }

  clickDelete(name: string, id: number) {
    if(confirm("Esta seguro que desea borrar el producto: "+name)) {
      this.isLoading = true;
      this.eliminarPorId(id)
    }
  }

  setLoading() {
    this.isLoading = !this.isLoading;
  }

  generatePDF() {
    this.isLoading = true;
    const data = document.getElementById('contentToConvert');
    data?.setAttribute("style", "display: block;")
    if(data){
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png');
        //const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const pdf = new jsPDF('p', 'mm', 'letter');
    
        let position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('Reporte-Productos.pdf'); // Generated PDF
        this.isLoading = false;
        data?.setAttribute("style", "display: none;")
      });
    }
  }

}
