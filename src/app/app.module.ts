import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteComponent } from './page/cliente/cliente.component';
import { ProductoComponent } from './page/producto/producto.component';
import { FacturaComponent } from './page/factura/factura.component';
import { MenuComponent } from './components/menu/menu.component';

import { Cod404Component } from './components/cod404/cod404.component';
import { NuevoComponent } from './components/clientes/nuevo/nuevo.component';
import { HomeClienteComponent } from './components/clientes/home-cliente/home-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeProductoComponent } from './components/productos/home-producto/home-producto.component';
import { EditarClienteComponent } from './components/clientes/editar-cliente/editar-cliente.component';
import { LoginComponent } from './page/login/login.component';
import { PageModule } from './page/page.module';
import { CabfacturaComponent } from './components/facturas/cabfactura/cabfactura.component';
import { ListaFacturasComponent } from './components/facturas/lista-facturas/lista-facturas.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingSpinnersComponent } from './components/loading-spinners/loading-spinners.component';
import { HomeProveedorComponent } from './components/proveedores/home-proveedor/home-proveedor.component';
import { GuardarProveedorComponent } from './components/proveedores/guardar-proveedor/guardar-proveedor.component';
import { HomeCategoriaComponent } from './components/categorias/home-categoria/home-categoria.component';
import { GuardarCategoriaComponent } from './components/categorias/guardar-categoria/guardar-categoria.component';
import { CategoriaComponent } from './page/categoria/categoria.component';
import { ProveedorComponent } from './page/proveedor/proveedor.component';
import { HomeDashboardComponent } from './components/dashboard/home-dashboard/home-dashboard.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HomeBodegaComponent } from './components/bodega/home-bodega/home-bodega.component';
import { GuardarBodegaComponent } from './components/bodega/guardar-bodega/guardar-bodega.component';
import { BodegaComponent } from './page/bodega/bodega.component';
import { GuardarProductoComponent } from './components/productos/guardar-producto/guardar-producto.component';
import { PopupConfirmationComponent } from './components/popup-confirmation/popup-confirmation.component';
import { VerFacturaComponent } from './components/facturas/ver-factura/ver-factura.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    ProductoComponent,
    FacturaComponent,
    MenuComponent,
    CategoriaComponent,
    ProveedorComponent,
    HomeClienteComponent,
    Cod404Component,
    NuevoComponent,
    HomeProductoComponent,
    GuardarProductoComponent,
    EditarClienteComponent,
    LoginComponent,
    CabfacturaComponent,
    ListaFacturasComponent,
    LoadingSpinnersComponent,
    HomeProveedorComponent,
    GuardarProveedorComponent,
    HomeCategoriaComponent,
    GuardarCategoriaComponent,
    DashboardComponent,
    HomeDashboardComponent,
    HomeBodegaComponent,
    BodegaComponent,
    GuardarBodegaComponent,
    PopupConfirmationComponent,
    VerFacturaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // PageModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
