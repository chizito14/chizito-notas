import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  
    HttpClientModule
 ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
}) 

export class AppComponent  {

private Urlpedirproducto = 'http://192.168.0.106/product/findmany?page=0&perPage=10';
private Urllogin = 'http://192.168.0.106/login';

  //constructor(private http: HttpClient) { }

  http=inject(HttpClient)

  getData() {
    return this.http.get<any>(this.Urlpedirproducto).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  postData() {
    return this.http.post<any>(this.Urllogin, {
      email: this.nombre,
      password: this.contra
    }).subscribe({
      next : (e) => {
        console.log(e)
        localStorage.setItem('token', e.token);
         console.log(localStorage.getItem('token'))
      }
    })
  }
}
 