import { Component, OnInit } from '@angular/core';
import Chart, { ChartType } from 'chart.js/auto';
import { ResportesService } from 'src/app/service/resportes.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit  {

    isLoading: boolean = false;
    clientes: number = 0;
    productos: number = 0;
    ventas: number = 0;
    ingresos: number = 0;
    reporteAnual: any;
    chartBar!: Chart;
    chartPie!: Chart;

    constructor(private resportes: ResportesService) {}

    ngOnInit(): void {
      this.isLoading = true;
      this.reportes();
      //this.dataBar();
      //this.dataPie();
    }

    reportes(){
      this.resportes.getReporteClientes().subscribe(resp => {
        //console.log("reporte cliente",resp)
        this.clientes = resp
        this.resportes.getReporteProductos().subscribe(resp => {
          //console.log("reporte productos",resp)
          this.productos = resp
          this.resportes.getReporteVentas().subscribe(resp => {
            //console.log("reporte ventas",resp)
            this.ventas = resp
            this.resportes.getReporteIngresos().subscribe(resp => {
              //console.log("reporte ingresos",resp)
              this.ingresos = resp
              this.resportes.getReporteAnual().subscribe(resp => {
                //console.log("reporte ingresos",resp)
                this.reporteAnual = resp
                this.dataBar();
                this.isLoading = false;
              }, error => {
                console.error('Error al obtener reporte ingresos:', error);
                this.isLoading = false;
              });
            }, error => {
              console.error('Error al obtener reporte ingresos:', error);
              this.isLoading = false;
            });
          }, error => {
            console.error('Error al obtener reporte ventas:', error);
            this.isLoading = false;
          });
        }, error => {
          console.error('Error al obtener reporte productos:', error);
          this.isLoading = false;
        });
      }, error => {
        console.error('Error al obtener reporte clientes:', error);
        this.isLoading = false;
      });
    }

    dataBar(){
      const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Ventas',
          data: [this.reporteAnual.enero, this.reporteAnual.febrero, this.reporteAnual.marzo, this.reporteAnual.abril, 
                 this.reporteAnual.mayo, this.reporteAnual.junio, this.reporteAnual.julio, this.reporteAnual.agosto, 
                 this.reporteAnual.septiembre, this.reporteAnual.octubre, this.reporteAnual.noviembre, this.reporteAnual.diciembre],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1
        }]
      };
      
      // Creamos la gráfica
      this.chartBar = new Chart("chartBar", {
        type: 'bar' as ChartType, // tipo de la gráfica 
        data // datos 
      })
    }

    dataPie(){
      const data = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'Vendidos',
          data: [300, 50, 100],
          backgroundColor: [
            'rgba(255, 99, 132,0.7)',
            'rgba(54, 162, 235,0.7)',
            'rgba(255, 205, 86,0.7)'
          ],
          hoverOffset: 4
        }]
      };
      // Creamos la gráfica
      this.chartPie = new Chart("chartPie", {
        type: 'pie' as ChartType, // tipo de la gráfica 
        data // datos 
      })
    }

}
