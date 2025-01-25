import { IUserBackend } from "./user-backend.interface";

export interface LoginDto {
    email: string
    password: string
}

export class LoginUseCase {
    
    constructor(
        private readonly backend: IUserBackend
    ) {}
    
    execute( entry: LoginDto ): boolean {
        const result = this.backend.loginUser( entry.email, entry.password )
        if ( result ) return true
        else return false
    }

    
}