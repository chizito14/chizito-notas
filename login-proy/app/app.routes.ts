import { Routes } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { isAuthenticatedGuard } from './auth/isauthguard';

export const routes: Routes = [
    {
        path:"productos" , component: ProductoComponent, canActivate: [isAuthenticatedGuard]
    },
    {
        path:"loginpage" , component:LoginpageComponent 
    },
    {
        path:"", redirectTo:"loginpage", pathMatch:"full"
    }
];
