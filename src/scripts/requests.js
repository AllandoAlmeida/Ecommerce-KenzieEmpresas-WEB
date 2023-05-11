import { toast } from "./toast.js"

const authToken = JSON.parse(localStorage.getItem('@kenzieEmpresa:authToken')) || ""
console.log(authToken)
const baseUrl = 'http://localhost:3333'
const requestHeaders = {
    'Content-Type': 'application/json',
     Authorization: `Bearer ${authToken}`
  }
  
  export const red = '#df1545'
  export const green = '#168821'

  /*-------------------------------------------------- Login --------------------------------------------------- */

  export async function loginResquest(loginBody) {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(loginBody),
    });
  
    if (response.ok) {
      const responseJson = await response.json();
      const { authToken, isAdm } = responseJson;
      localStorage.setItem('@kenzieEmpresa:authToken', JSON.stringify(authToken));
      localStorage.setItem('@kenzieEmpresa:isAdm', JSON.stringify(isAdm));
      console.log(responseJson);
      if (isAdm) {
        toast(green, 'Login realizado com sucesso.');
        setTimeout(() => {
          location.replace('./adminPage.html');
        }, 2000);
      } else {
        setTimeout(() => {
          location.replace('./src/pages/employee.html');
        }, 2000);
      }
      return authToken;
    } else {
      const errorJson = await response.json();
      toast(red, errorJson.message);
      console.log(errorJson.message);
      return null;
    }
  }

/*-----------------------------Home Page - requisição lista de Categorias-------------------------------------------- */ 

export const getAllCategories = async () =>{
    const allCategories = await fetch(`${baseUrl}/categories/readAll`, {
        method:'GET'
    })
    .then(reponse => reponse.json())
    return allCategories
}

/*-----------------------------Home Page - requisição lista de empresas------------------------------------------------ */

export const getAllCompanies = async () => {
    const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
        method:'GET'
    })
    .then(response => response.json())
    return  allCompanies
}

/*-----------------------------Home Page - requisição lista de empresas (select)----------------------------------------- */

export const readByCategory = async (categoryName) => {
    const readCategory = await fetch(`${baseUrl}/companies/readByCategory/${categoryName}`, {
        method:'GET'
    })
    .then(response => response.json())

    return readCategory;
}


/*------------------------------------ Register Page - Criar Usuário----------------------------------------------------- */

 export async function createUser(userBody) {
  const user = await fetch(`${baseUrl}/employees/create`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userBody),
  })
  .then(async (response) => {
    if(response.ok){
      toast(green, 'Cadastro realizado com Sucesso.');    
        setTimeout(() => {
        location.replace('./');
      }, 2000);
    }else {
      const responseJson = await response.json();
      toast(red, responseJson.message); 
      console.log(responseJson.message);
    }
  })
  return user
}

/*------------------------------------ Administrador - lista departamentos----------------------------------------------- */

  export async function listDepartments() {
   
      const response = await fetch(`${baseUrl}/departments/readAll`, {
        method: "GET",
        headers: requestHeaders,
      });
  
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      } else {
        const errorJson = await response.json();
        toast(red, errorJson.message + '.');
        console.log(errorJson.message);
        return null;
      }
    };

    /*------------------------------------ Administrador - lista departamentos----------------------------------------------- */

  export async function readByCompany(companyId) {
   
    const response = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`, {
      method: "GET",
      headers: requestHeaders,
    });

    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } else {
      const errorJson = await response.json();
      toast(red, errorJson.message + '.');
      console.log(errorJson.message);
      return null;
    }
  };

    /*------------------------------------ Administrador - Colaboradores ----------------------------------------------- */
  
    export async function listEmployees() {
   
      const response = await fetch(`${baseUrl}/employees/readAll`, {
        method: "GET",
        headers: requestHeaders,
      });
  
      if (response.ok) {
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson;
      } else {
        const errorJson = await response.json();
        toast(red, errorJson.message + '.');
        console.log(errorJson.message);
        return null;
      }
    } 
