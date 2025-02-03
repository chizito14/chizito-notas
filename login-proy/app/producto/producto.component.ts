import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [
    HttpClientModule
  ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss'
})
export class ProductoComponent implements OnInit{
  router = inject (Router)
  ngOnInit(): void {
    this.getData()
  }
  lista: Producto[]  = []

 http=inject(HttpClient)
 
 private Urlpedirproducto = 'http://192.168.0.108/product/findmany?page=0&perPage=10';
 
 getData() {
  const token = localStorage.getItem('token');
  const headers =  { 'Authorization': 'Bearer ' + token}

  return this.http.get<any>(this.Urlpedirproducto, {headers : headers}).subscribe({
    next: (res) => {
      this.lista = res 
    }
  })
}

regresar(){
  this.router.navigateByUrl ("loginpage")
}

}


interface Producto {
  
    id: string
    image: string[],
    name: string,
    price: string
  
}