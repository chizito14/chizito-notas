import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  lista:Tarea[]=[]

  generateRandomId(): string {
    return 'id-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
  }

  anadir(){
    this.lista.push({
      fecha:new Date(),
      titulo:"hacer proyecto",
      descripcion:"no hice el proyectoooooooooooo",
      id:this.generateRandomId()
    })
  }
  eliminar(parametro:string){
    const filteredItems = this.lista.filter(i => i.id !== parametro)
    this.lista=filteredItems

  }
  modificar(){

  }
}

interface Tarea {
  fecha:Date
  descripcion:string
  titulo:string
  id:string
}