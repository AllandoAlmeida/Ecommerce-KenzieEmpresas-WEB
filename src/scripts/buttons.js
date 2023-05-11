import { loginResquest, createUser } from "./requests.js"
import { toast } from "./toast.js"


export function handleLoginPage () {
    const button = document.querySelector('.btn__openLogin')
    button.addEventListener('click', function(event){
        console.log(event)
        location.replace('./src/pages/login.html');

    })
}


export function handleLogin() {
    const inputs = document.querySelectorAll('.inputForm')
    const button = document.querySelector('.btn-formLogin')
    let loginBody = {}
    let count = 0

    button.addEventListener('click', async(event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value.trim() ==''){
                count++
                input.value = ''
            }
            loginBody[input.name] = input.value
        })
        
        if(count !== 0){
            count = 0
            return toast(red, 'por favor preencha os campos necessários')
            
        } else{
            const token = await loginResquest(loginBody)
            return token
        }
    })
}

export function handleCreateUser() {
    const inputs = document.querySelectorAll('.inputForm')
    const button = document.querySelector('.btn-formLogin')
    let userBody = {}
    let count = 0

    button.addEventListener('click', async(event) => {
        event.preventDefault()

        inputs.forEach(input => {
            if(input.value.trim() ==''){
                count++
                input.value = ''
            }
            userBody[input.name] = input.value
        })
        
        if(count !== 0){
            count = 0
            return toast(red, 'por favor preencha os campos necessários')
            
        } else{
            await createUser(userBody)
        }
    })
}