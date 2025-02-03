
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router)
  const token = localStorage.getItem('token');
  
    if ( !token ) {
        router.navigateByUrl('loginpage')
        return false
    } else {
        return true 
    }

}
