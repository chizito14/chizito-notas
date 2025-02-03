import { RouterOutlet } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
 export class AppComponent {
  lista: Tarea[]=[]
  
  titulo:string = "" 
  descripcion:string = ""

  generateRandomId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }

  anadir() {
    this.lista.push(
      {fecha: new Date(),
      titulo:  this.titulo,
      descripcion: this.descripcion,
      id:this.generateRandomId ()}
    )

  }

  eliminar(parametro:string){
    this.lista = this.lista.filter(item => item.id !== parametro);
    
  }
  titulomodificar: string = ""
  descripcionmoficiar: string = ""
  errorboleano:boolean = false
  errortext: string = ""

  modificar(parametro:string){
    if(this.titulomodificar.length === 0 ){
      this.errorboleano = true
      this.errortext= "no se puede modificar sin texto el titulo"
    }
    else

      {const buscar = this.lista.filter(item => item.id === parametro);
      buscar[0].descripcion = this.descripcionmoficiar
      buscar[0].titulo = this.titulomodificar
      buscar[0].fecha = new Date ()
      this.errorboleano = false
    }

  }
  
}

interface Tarea {
  fecha: Date
  titulo:string
  descripcion: string
  id:string
}

  