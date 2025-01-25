import { IUserBackend } from '../application/user-backend.interface'
import { User } from '../domain/user';

export class UserBackend implements IUserBackend {

    url: string = 'http://backend-deploy/login'

    constructor(
        private readonly http: any
    ) {}

    loginUser( email: string, password: string ): User {
        return this.http.post(this.url, {
            email: email,
            password: password
        })
    }

}