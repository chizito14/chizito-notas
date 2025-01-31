
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [  
    FormsModule,
    //ReactiveFormsModule,
 ],
  templateUrl: './app.component.html',
  
  styleUrl: './app.component.scss'
}) 

export class AppComponent  {

nombre: string = '';
contra: string = ''

}

 