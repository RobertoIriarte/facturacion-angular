import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { FacturaComponent } from './factura/factura.component';
import { NuevoComponent } from '../components/clientes/nuevo/nuevo.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ListaFacturasComponent } from '../components/facturas/lista-facturas/lista-facturas.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BodegaComponent } from './bodega/bodega.component';
import { VerFacturaComponent } from '../components/facturas/ver-factura/ver-factura.component';

const routes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'cliente',
      component: ClienteComponent
    },
    {
      path: 'cliente/nuevo',
      component: NuevoComponent
    },
    {
      path: 'producto',
      component: ProductoComponent
    },
    {
      path: 'factura',
      component: FacturaComponent
    },
    {
      path: 'lista-factura',
      component: ListaFacturasComponent
    },
    {
      path: 'categoria',
      component: CategoriaComponent
    },
    {
      path: 'proveedor',
      component: ProveedorComponent
    },
    {
      path: 'bodega',
      component: BodegaComponent
    },
    {
      path: 'ver-factura/:id',
      component: VerFacturaComponent
    },

    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
