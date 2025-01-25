import { LoginUseCase } from "./application/login-use-case";
import { UserBackend } from './infraestructure/user-backend'

const backend = new UserBackend( { post: () => { console.log('Backend Sending') } } )
const useCase = new LoginUseCase( backend )

useCase.execute({
    email: 'chizito@gmail.com',
    password: 'fullcheestris'
})