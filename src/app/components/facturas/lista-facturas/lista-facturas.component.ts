import { Component } from '@angular/core';
import { ClientesService } from 'src/app/service/clientes.service';
import { FacturasService } from 'src/app/service/facturas.service';
@Component({
  selector: 'app-lista-facturas',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class ListaFacturasComponent {

  isLoading: boolean = false;
  facturas: any;
  personaEditar: any;
  facturasFiltradas: any;
  modoOculto: boolean = true;
  constructor(private facturasService: FacturasService) {
  }
  ngOnInit() {
    this.isLoading = true;
    this.getData();
  }
  
  getData(){
    this.facturasService.getData().subscribe(data => {
      this.facturas = data;
      this.facturasFiltradas = data;
      this.isLoading = false;
    })
  }

  buscar(texto: Event) {
    const input = texto.target as HTMLInputElement;
    console.log(this.facturasFiltradas)
    this.facturasFiltradas = this.facturas.filter( (factura: any) =>
      factura.idFcatura.toString().includes(input.value.toLowerCase()) ||
      factura.numeroFactura.toString().includes(input.value.toLowerCase()) ||
      factura.rutCliente.toString().includes(input.value.toLowerCase()) ||
     factura.subtotal.toString().includes(input.value.toLowerCase()) ||
     factura.igv.toString().includes(input.value.toLowerCase()) ||
     factura.total.toString().includes(input.value.toLowerCase())
    );
  }

  verFactura(factura_id: number){

  }


}
