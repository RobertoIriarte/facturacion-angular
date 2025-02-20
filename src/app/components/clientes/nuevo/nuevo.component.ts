import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { soloTexto, validarCorreo, validarDecimalConDosDecimales } from 'src/app/validators/validatorFn';
import { ClientesService } from 'src/app/service/clientes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.css']
})
export class NuevoComponent {

  isLoading: boolean = false;
  formulario: FormGroup;
  existe: boolean = false;

  constructor(private formBuilder: FormBuilder, 
          private clientesService: ClientesService,
          private router : Router) {
    this.formulario = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.pattern('^[0-9]+[-|‐]{1}[0-9kK]{1}$'), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, soloTexto()]],
      //direccion: ['', [Validators.required]],
      correo: ['', [Validators.required, validarCorreo()]],
      activo: [1],
    });
  }

  onSubmit() {

    if (this.formulario.valid) {
      this.isLoading = true;
      console.log('El formulario es válido. Enviar solicitud...');
    } else {
      Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    const valoresFormulario = this.formulario.value;

    console.log(this.formulario.value)

    var tmp 	= valoresFormulario.rut.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];

    valoresFormulario.rut = rut;
    valoresFormulario.dv = digv;
    valoresFormulario.activo = 1;

    this.clientesService.enviarDatos(valoresFormulario).subscribe(response => {
      console.log('Datos enviados correctamente:', response);
      alert('Datos registrados correctamente');
      this.router.navigate(['/app/cliente']);
    }, error => {
      this.isLoading = false;
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos: los campos no cumplen con los formatos requeridos');	
    });
  }

  validarCodigo(event: any) {
    const input = event.target as HTMLInputElement;

    let rutFormulario = input.value;
    var tmp 	= rutFormulario.split('-');
		var digv	= tmp[1]; 
		var rut 	= tmp[0];
  
    this.existe = false;
  
    const delay = 300;
  
    setTimeout(() => {
      this.clientesService.verificarExistencia(rut).subscribe(data => {
        if ( parseInt(data.data) > 0 ) {	
          this.existe = true;
          console.log('El código ya existe', data.data);

          this.formulario.get('rut')!.setErrors({ 'codigoExistente': true });
        } else {
          this.formulario.get('rut')!.setErrors(null);
          this.existe = false;
        }
      });
    }, delay);
  }


  
}
