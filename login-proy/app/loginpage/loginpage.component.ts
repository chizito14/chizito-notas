import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [RouterOutlet,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.scss'
})
export class LoginpageComponent {
 private fb = inject(FormBuilder)

  public loginForm: FormGroup<any> = this.fb.group<any>({
    email: new FormControl('ruraima@gmail.com', { validators: [Validators.required] }),
    password: new FormControl('1234567', { validators: [Validators.required] }),
  })
  http=inject(HttpClient)
  
  private Urllogin = 'http://192.168.0.108/login';
  private router = inject(Router)

  postData() {
    return this.http.post<any>(this.Urllogin, {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe({
      next : (e) => {
        localStorage.setItem('token', e.token);
        this.router.navigateByUrl ("productos")
      }
    })
  }

}
