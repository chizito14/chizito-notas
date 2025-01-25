import { User } from '../domain/user'

export interface IUserBackend {
    loginUser(     
        email: string,
        password: string
    ): User
}