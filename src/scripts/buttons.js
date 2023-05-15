import { loginResquest, createUser, createNewDepartment, listDepartments, requestUpdateEmployee, requestUpdateDepartment } from "./requests.js"
import { toast } from "./toast.js"
import { openModal, editItem, deleteItem, editEmployee, openDeleteModal, handleNewDepartment, closeModal, closeModalEdit} from "./modal.js"
import { /* renderDepartmentById, */ renderDepartmentById, renderDepartments, renderEmployeeHiring, renderEmployees } from "./render.js";

/*------------------------------------ Logout -------------------------------------------------------------------------- */

export function logout() {
  const button = document.getElementById('logout');
  button.addEventListener('click', function (event) {
    localStorage.clear(); // Limpa o local storage
    location.replace('/');

  });
}

/*------------------------------------ HomePage ir pagina login ---------------------------------------------------------- */

export function handleLoginPage() {
  const button = document.querySelector('.btn__openLogin')
  button.addEventListener('click', function (event) {

    location.replace('./src/pages/login.html');


  })
}

export function handleRegisterPage() {
  const button = document.getElementById('register')
  button.addEventListener('click', function (event) {

    location.replace('./src/pages/register.html');

  })
}

/*------------------------------------ Login - captura dados para logar----------------------------------------------------- */

export function handleLogin() {
  const inputs = document.querySelectorAll('.inputForm')
  /* const select = document.querySelector('#companyNewDepartment') */
  const button = document.querySelector('.btn-formLogin')
  let loginBody = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if (input.value.trim() == '') {
        count++
        input.value = ''
      }
      loginBody[input.name] = input.value
    })

    if (count !== 0) {
      count = 0
      return toast(red, 'por favor preencha os campos necessários')

    } else {
      const token = await loginResquest(loginBody)

      inputs.forEach((input) => {
        input.value = ''
      })
      return token
    }
  })
}
/*------------------------------------ Register - Criar usuarios ----------------------------------------------------------- */

export function handleCreateUser() {
  const inputs = document.querySelectorAll('.inputForm')
  const button = document.querySelector('.btn-formLogin')
  let userBody = {}
  let count = 0

  button.addEventListener('click', async (event) => {
    event.preventDefault()

    inputs.forEach(input => {
      if (input.value.trim() == '') {
        count++
        input.value = ''
      }
      userBody[input.name] = input.value
    })

    if (count !== 0) {
      count = 0
      return toast(red, 'por favor preencha os campos necessários')

    } else {
      await createUser(userBody)
    }
  })
}

/*------------------------------------ Criar um novo departamento ----------------------------------------------------------- */


export function handleCreateNewDepartment(closeModal) {
  const inputs = document.querySelectorAll('.InputCreateNewDepartment');
  const select = document.querySelector('#companyNewDepartment');
  const button = document.querySelector('.ButtonCreateNewDepartment');
  const closeButton = document.getElementById('btnCreate');
  let departmentBody = {};
  let count = 0;
  let selectedId = null;

  select.addEventListener('change', (event) => {
    selectedId = event.target.value;
  });

  button.addEventListener('click', async (event) => {
    event.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() === '') {
        count++;
        input.value = '';
      }
      departmentBody[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;
      return toast(red, 'Por favor, preencha os campos necessários');
    } else {
      if (selectedId === null) {
        return toast(red, 'Selecione um departamento');
      } else {
        departmentBody['company_id'] = selectedId;
        await createNewDepartment(departmentBody);

        inputs.forEach((input) => {
          input.value = '';
        });

        closeModal();

        setTimeout(() => {
          closeModal();
        }, 3000);
      }
    }
  });

  // Adiciona o evento de clique ao botão para fechar o modal
  closeButton.addEventListener('click', () => {
    closeModal();
  });
}

// Chamada da função handleCreateNewDepartment passando closeModal como parâmetro
handleCreateNewDepartment(closeModal);


/*------------------------------------ Administrador - modal ----------------------------------------------- */

export function handleCreateDepartment() {
  const container = document.querySelector('.container_createDepartments');
  const button = document.getElementById('createDepartments')

  button.addEventListener('click', (event) => {


    handleNewDepartment()

  })
}


/*------------------------------------ Administrador - modal Abrir Visualização ----------------------------------- */

export const handleToViewDepartment = async () => {
  const allDepartments = await listDepartments();
  const container = document.querySelector('.container__departments');
  let buttonId = {}

  container.addEventListener('click', (event) => {
    event.preventDefault()
    const target = event.target.closest('.viewBtn');
    if (target) {
      buttonId = target.dataset.id;



      openModal(buttonId);
      renderEmployeeHiring(buttonId)
    }
  });
}

/*------------------------------------ Administrador - modal Abrir Editar ----------------------------------- */


export function handleToEditDepartment() {
  const container = document.querySelector('.container__departments');
  const input = document.getElementById('InputEdit');
  const submitButton = document.getElementById('btnEdit');
  let buttonId;

  container.addEventListener('click', async (event) => {
    const target = event.target.closest('.editBtn');
    if (target) {
      buttonId = target.dataset.id;

      await renderDepartmentById(buttonId);
      editItem();
    }
  });

  submitButton.addEventListener('click', async (evt) => {
    evt.preventDefault();

    if (input.value.trim() === '') {
      return toast(red, 'Por favor, preencha os campos necessários');
    }

    const updateDepartmentBody = {
      description: input.value.trim()
    };



    await requestUpdateDepartment(buttonId, updateDepartmentBody);

    input.value = '';
    closeModalEdit();

    renderDepartments();
  });
}

/*------------------------------------ Administrador - modal Abrir Exclusão ----------------------------------- */

export function handleToDeleteDepartment() {
  const container = document.querySelector('.container__departments');

  container.addEventListener('click', (event) => {
    const target = event.target.closest('.deleteBtn');
    if (target) {
      const buttonId = target.dataset.id;


      deleteItem(buttonId);
    }
  });
}


/*------------------------------------ Employees - modal Abrir Editar----------------------------------------------- */

export function handleToEditEmployee() {
  const container = document.querySelector('.container__employees');
  const inputs = document.querySelectorAll('.inputEdit');
  const submitButton = document.getElementById('updateEmployee');
  const updateEmployeeBody = {};
  let count = 0;
  let buttonId;

  container.addEventListener('click', (event) => {
    const target = event.target.closest('.editBtn');
    if (target) {
      buttonId = target.dataset.id;

      editEmployee();
    }
  });

  submitButton.addEventListener('click', async (evt) => {


    inputs.forEach(({ value, name }) => {
      if (value.trim() === '') {
        count++;
      }
      updateEmployeeBody[name] = value;

    });



    if (count !== 0) {
      return toast(red, 'Por favor, preencha os campos necessários');
    } else {

      await requestUpdateEmployee(buttonId, updateEmployeeBody);

      inputs.forEach((input) => {
        input.value = '';
        closeModal()

      });
      renderEmployees()
    }
  });
}


/*------------------------------------ Employees - modal Abrir Excluir----------------------------------------------- */

export function handleToDeleteEmployee() {
  const container = document.querySelector('.container__employees');

  container.addEventListener('click', (event) => {
    const target = event.target.closest('.deleteBtn');
    if (target) {
      const buttonId = target.dataset.id;


      openDeleteModal(buttonId);
    }
  });
}


