import { toast } from "./toast.js"

const authToken = JSON.parse(localStorage.getItem('@kenzieEmpresa:authToken')) || ""

const baseUrl = 'http://localhost:3333'
const requestHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${authToken}`
}

export const red = '#df1545'
export const green = '#168821'

export const loginBody = {}

/*-------------------------------------------------- Login ---------------------------------------------------------- */

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

    if (isAdm) {
      toast(green, 'Login realizado com sucesso.');
      setTimeout(() => {
        location.replace('./dashboard.html');
      }, 2000);
    } else {
      setTimeout(() => {
        location.replace('./employee.html');
        renderUser();
      }, 2000);
    }
    return authToken;
  } else {
    const errorJson = await response.json();
    toast(red, errorJson.message);

    return null;
  }
}

/*-----------------------------Home Page - requisição lista de Categorias--------------------------------------------- */

export const getAllCategories = async () => {
  const allCategories = await fetch(`${baseUrl}/categories/readAll`, {
    method: 'GET'
  })
    .then(reponse => reponse.json())
  return allCategories
}

/*-----------------------------Home Page - requisição lista de empresas----------------------------------------------- */

export const getAllCompanies = async () => {
  const allCompanies = await fetch(`${baseUrl}/companies/readAll`, {
    method: 'GET'
  })
    .then(response => response.json())
  return allCompanies
}

/*-----------------------------Home Page - requisição lista de empresas (select)-------------------------------------- */

export const readByCategory = async (categoryName) => {
  const readCategory = await fetch(`${baseUrl}/companies/readByCategory/${categoryName}`, {
    method: 'GET'
  })
    .then(response => response.json())

  return readCategory;
}



/*------------------------------------ Administrador - Novo departamentos----------------------------------------------- */

export async function createNewDepartment(departmentBody) {
  const user = await fetch(`${baseUrl}/departments/create`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(departmentBody),
  })
    .then(async (response) => {
      if (response.ok) {
        toast(green, 'Cadastro realizado com Sucesso.');
        setTimeout(() => {
        closeModal()
        }, 2000);
      } else {
        const responseJson = await response.json();
        toast(red, responseJson.message);

      }
    })
  return user
}

/*------------------------------------ Administrador - Alterar Departamentos--------------------------------------------- */

export async function requestUpdateDepartment(department_id, updateDepartmentBody) {
  const response = await fetch(`${baseUrl}/departments/update/${department_id}`, {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify(updateDepartmentBody)
  });

  if (response.ok) {
    const responseJson = await response.json();
    setTimeout(() => {
      toast(green, 'Atualização realizada com sucesso.');
    }, 2000);
    return responseJson;
  } else {
    const errorResponse = await response.json();
    toast(red, errorResponse.message);

    return null;
  }
}

/*------------------------------------ Administrador - Excluir Departamentos--------------------------------------------- */

export async function deleteDepartment(departmentId) {
  const delDepartment = await fetch(`${baseUrl}/departments/delete/${departmentId}`, {
    method: 'DELETE',
    headers: requestHeaders,
  })
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json();
        setTimeout(() => {
          toast(green, 'Departamento excluido com sucesso.');
        }, 2000);
        return responseJson;
      } else {
        const responseJson = await response.json();
        toast(red, responseJson.message);

        return null;
      }
    })
  return employeeId
}


/*------------------------------------ Administrador - lista departamentos  --------------------------------------------- */

export async function listDepartments() {

  const response = await fetch(`${baseUrl}/departments/readAll`, {
    method: "GET",
    headers: requestHeaders,
  });

  if (response.ok) {
    const responseJson = await response.json();
    return responseJson;
  } else {
    const errorJson = await response.json();
    toast(red, errorJson.message + '.');

    return null;
  }
};



/*------------------------------------ Administrador - lista Empresas --------------------------------------------------- */

export async function readByCompany(companyId) {

  const response = await fetch(`${baseUrl}/departments/readByCompany/${companyId}`, {
    method: "GET",
    headers: requestHeaders,
  });

  if (response.ok) {
    const responseJson = await response.json();

    return responseJson;
  } else {
    const errorJson = await response.json();
    toast(red, errorJson.message + '.');

    return null;
  }
};



/*------------------------------------ Administrador - Listar Colaboradores --------------------------------------------- */

export async function listEmployees() {

  const response = await fetch(`${baseUrl}/employees/readAll`, {
    method: "GET",
    headers: requestHeaders,
  });

  if (response.ok) {
    const responseJson = await response.json();

    return responseJson;
  } else {
    const errorJson = await response.json();
    toast(red, errorJson.message + '.');

    return null;
  }
}



/*------------------------------------ Administrador - Contratar funcionarios ------------------------------------------ */

export async function requestHiring(employee_id, hiringBody) {
  const employeeId = await fetch(`${baseUrl}/employees/hireEmployee/${employee_id}`, {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify(hiringBody)
  })
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json();
        setTimeout(() => {
          toast(green, 'Contrataçao realizada com sucesso.');
        }, 2000);
        return responseJson;
      } else {
        const responseJson = await response.json();
        toast(red, responseJson.message);

        return null;
      }
    })
  return employeeId
}




/*------------------------------------ Criação de Usuários/Colaboradores -------------------------------------------------- */

export async function createUser(userBody) {
  const user = await fetch(`${baseUrl}/employees/create`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(userBody),
  })
    .then(async (response) => {
      if (response.ok) {
        toast(green, 'Cadastro realizado com Sucesso.');
        setTimeout(() => {
          location.replace('./login.html');
        }, 2000);
      } else {
        const responseJson = await response.json();
        toast(red, responseJson.message);

      }
    })
  return user
}

/*------------------------------------ Atualização de Usuários/colaboradores ------------------------------------------------ */

export async function requestUpdateEmployee(employee_id, updateEmployeeBody) {
  const response = await fetch(`${baseUrl}/employees/updateEmployee/${employee_id}`, {
    method: 'PATCH',
    headers: requestHeaders,
    body: JSON.stringify(updateEmployeeBody)
  });

  if (response.ok) {
    const responseJson = await response.json();
    setTimeout(() => {
      toast(green, 'Cadastro realizado com sucesso.');
    }, 2000);
    return responseJson;
  } else {
    const errorResponse = await response.json();
    toast(red, errorResponse.message);

    return null;
  }
}



/*------------------------------------ Exclusão de Usuários/Funcionarios ---------------------------------------------------- */



export async function deleteEmployee(employeeId) {
  const delEmployee = await fetch(`${baseUrl}/employees/deleteEmployee/${employeeId}`, {
    method: 'DELETE',
    headers: requestHeaders,
  })
    .then(async (response) => {
      if (response.ok) {
        const responseJson = await response.json();
        setTimeout(() => {
          toast(green, 'Cadastro realizado com sucesso.');
        }, 2000);
        return responseJson;
      } else {
        const responseJson = await response.json();
        toast(red, responseJson.message);

        return null;
      }
    })
  return employeeId
}

/*----------------------------- Desligar funcionarios departamentoDesligamento de Colaboradores-------------------------------- */



export const dismissEmployee = async (employeeId) => {
  try {
    const response = await fetch(`${baseUrl}/employees/dismissEmployee/${employeeId}`, {
      method: 'PATCH',
      headers: requestHeaders
    });

    if (response.ok) {
      toast(green, 'Funcionário desligado com sucesso.');
    } else {
      const responseJson = await response.json();
      toast(red, responseJson.message);

    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

/*----------------------------- Colaborador logado -------------------------------------------------------------------------- */


export const profile = async () => {
  try {
    const response = await fetch(`${baseUrl}/employees/profile`, {
      method: 'GET',
      headers: requestHeaders
    });

    if (response.ok) {
      const responseJson = await response.json();

      toast(green, 'Funcionário logado com sucesso.');
      return responseJson;
    } else {
      const responseJson = await response.json();
      toast(red, responseJson.message);

    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
};

/*----------------------------- Colaborador logado buscar empresa pelo ID ------------------------------------------------------- */

export const requestCompanyProfile = async (companyId) => {
  try {
    const response = await fetch(`${baseUrl}/companies/readById/${companyId}`, {
      method: 'GET',
      headers: requestHeaders
    });

    if (response.ok) {
      const responseJson = await response.json();
      return responseJson;
    } else {
      const responseJson = await response.json();

    }
  } catch (error) {
    console.error('Erro na requisição da empresa:', error);
  }
};

/*----------------------------- Colaborador logado buscar departamento pelo ID --------------------------------------------------- */

export const requestDepartmentProfile = async (departmentId) => {
  try {
    const response = await fetch(`${baseUrl}/departments/readById/${departmentId}`, {
      method: 'GET',
      headers: requestHeaders

    });

    if (response.ok) {
      const responseJson = await response.json();

      return responseJson;
    } else {
      const responseJson = await response.json();

    }
  } catch (error) {
    console.error('Erro na requisição do departamento:', error);
  }
};


/*----------------------------- Colaboradores nao contratados pelo ID ----------------------------------------------------------- */


export const requestEmployeesOutOfwork = async () => {
  try {
    const response = await fetch(`${baseUrl}/employees/outOfWork`, {
      method: 'GET',
      headers: requestHeaders

    });

    if (response.ok) {
      const responseJson = await response.json();
      console.log(responseJson)

      return responseJson;
    } else {
      const responseJson = await response.json();

    }
  } catch (error) {
    console.error('Erro na requisição do departamento:', error);
  }
};



