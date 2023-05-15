import { deleteEmployee } from "./requests.js";

/*------------------------------------ New Department - modal Open ------------------------------------------------- */

export function handleNewDepartment() {
  const containerNewDepartment = document.querySelector('.container_createDepartments');
  const closeButton = document.getElementById('CloseModal');


  containerNewDepartment.showModal();

  closeButton.addEventListener('click', () => {
    closeDepartments();
  });
}

export function closeDepartments() {
  const containerNewDepartment = document.querySelector('.container_createDepartments');
  const closeModalDepart = document.getElementById(closeModal)

  containerNewDepartment.close()

}

/*---------------------------- Administrador Department - modal Edita ------------------------------------------------- */

export async function handleEditDepartament() {
  const editButtons = document.querySelectorAll('.editBtn')

  editButtons.forEach(button => {
    button.addEventListener('click', async (event) => {
      const teste = event.target.dataset.id
      console.log(teste)
      /* await updateEmployee(event.target.dataset.id) */
    })
  })
}



/*------------------------------------ Administrador - modal Open ------------------------------------------------- */
export function openModal() {
  const modalToView = document.querySelector('.container_toViewDepartments');
  const closeButton = document.getElementById('CloseModaltoView');


  modalToView.showModal();

  closeButton.addEventListener('click', () => {
    closeModal();
  });
}

export function closeModal() {
  const modalToView = document.querySelector('.container_toViewDepartments');


  modalToView.close();
}

/*------------------------------------ Administrador - modal Open Editar ------------------------------------------- */
export function editItem() {

  const modaleditItem = document.querySelector('.container_editDepartments');
  const closeButton = document.getElementById('CloseEdit');
  if (!modaleditItem.hasAttribute('open')) {
    modaleditItem.showModal();

  }
  console.log('abri modal');


  closeButton.addEventListener('click', () => {
    closeModalEdit();
  });
}

export function closeModalEdit(buttonId) {
  const modaleditItem = document.querySelector('.container_editDepartments');

  const button = document.querySelector(`#${buttonId}`);
  console.log('fechei modal');
  modaleditItem.close();
}
/*------------------------------------ Administrador - modal Open Deletar------------------------------------------ */

export function deleteItem(departmentId) {

  const modal = document.querySelector('#deleteModal');
  const confirmBtn = document.querySelector('#deleteModal .confirmBtn');

  const closeButton = document.getElementById('CloseDel');


  if (!modal.hasAttribute('open')) {
    modal.showModal();
  }

  closeButton.addEventListener('click', () => {
    closeModalDel();
  });
  confirmBtn.addEventListener('click', async () => {
    await deleteDepartment(departmentId);

    closeModalDel();
  });
}

export function closeModalDel(buttonId) {
  const modalDeleteItem = document.querySelector('.container_delDepartments')
  const button = document.querySelector(`#${buttonId}`);

  modalDeleteItem.close();
}


/*------------------------------------ Employees - modal OpenEditar ---------------------------------------- */

export async function handleUpdateEmployee() {
  const modalController = document.querySelector(' .container_editEmployee')
  const inputs = document.querySelectorAll('.inputEdit')
  const updateButton = document.querySelectorAll('.editBtn')

  const submitButton = document.getElementById('updateEmployee')

  const updateEmployeeBody = {}
  let count = 0

  updateButton.forEach(button => {
    button.addEventListener('click', (event) => {
      modalController.showModal
    })
  })
}

/*------------------------------------ Employees - modal open Edit------------------------------------------- */
export function editEmployee() {
  const modaleditEmployee = document.querySelector('.container_editEmployee');
  const closeButton = document.getElementById('EmployeeCloseEdit');
  if (!modaleditEmployee.hasAttribute('open')) {
    modaleditEmployee.showModal();

  }



  closeButton.addEventListener('click', () => {
    closeEdit();
  });
}

export function closeEdit() {
  const modaleditItem = document.querySelector('.container_editEmployee');
  const button = document.querySelector('#EmployeeCloseEdit');


  modaleditItem.close();
}

/*------------------------------------ Employees - modal open delet------------------------------------------- */


export function openDeleteModal(employeeId) {

  const modal = document.querySelector('#deleteModal');
  const confirmBtn = document.querySelector('#deleteModal .confirmBtn');

  const closeButton = document.getElementById('EmployeeCloseDel');

  // Verifica se o diálogo já está aberto
  if (!modal.hasAttribute('open')) {
    modal.showModal();
  }

  closeButton.addEventListener('click', () => {
    closeDeleteModal();
  });

  confirmBtn.addEventListener('click', async () => {
    await deleteEmployee(employeeId);

    closeDeleteModal();
  });
}

export function closeDeleteModal() {
  const modalDeleteEmployee = document.querySelector('.container_delEmployee');

  modalDeleteEmployee.close();
}


