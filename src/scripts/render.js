import { getAllCategories, getAllCompanies, listDepartments, readByCategory, listEmployees, readByCompany, requestHiring, dismissEmployee, profile, requestCompanyProfile, requestDepartmentProfile, requestEmployeesOutOfwork, } from './requests.js'
import { handleToDeleteDepartment, handleToViewDepartment, handleToEditDepartment, handleToEditEmployee, handleToDeleteEmployee } from './buttons.js';
import { openDeleteModal, closeDeleteModal, deleteItem } from './modal.js';


/*------------------------------------------------ Home Pages ------------------------------------------------------- */
/*------------------------------------ renderizar lista de categorias ----------------------------------------------- */

export const renderSelect = async () => {
  const categories = await getAllCategories();
  const select = document.getElementById('category');


  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.innerText = 'Selecionar Setor';
  select.appendChild(defaultOption);

  categories.sort((a, b) => a.name.localeCompare(b.name));

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.innerText = category.name;
    select.appendChild(option);
  });
};

export const renderCompanies = async () => {
  const companies = await getAllCompanies();

  const categories = await getAllCategories();

  const container = document.querySelector(' .list__companies--item');

  container.innerHTML = '';

  companies.forEach(company => {
    const companyDiv = listCompany(company, categories);
    if (companyDiv instanceof Node) {
      container.appendChild(companyDiv);
    }
  })

}

/*------------------------------------ Captura o valor do change do Select ------------------------------------------- */


export const renderCategoryName = async () => {
  const select = document.getElementById('category');

  select.addEventListener('change', async (event) => {
    const selectedName = event.target.options[event.target.selectedIndex].text;

    const companies = await readByCategory(selectedName);
    await renderByCategory(companies);
    return companies
  });
};


export const renderByCategory = async (array) => {
  const container = document.querySelector(' .list__companies--item');
  container.innerHTML = '';

  await array.forEach(category => {
    const companyDiv = listCategory(category);
    if (companyDiv instanceof Node) {
      container.appendChild(companyDiv);
    }
  })
}


/*------------------------------------ Criação dos Cards Company ----------------------------------------------------- */

export function listCompany(company, category) {
  const container = document.querySelector(' .list__companies--item');
  const sectionCompany = document.createElement('div')
  const companyCard = document.createElement('h1');
  const companySector = document.createElement('button')

  sectionCompany.className = 'list__company--item'
  companyCard.className = 'text-1'
  companySector.className = 'sectionBtn btnSetor'
  companySector.id = company.category_id
  const categoryId = company.category_id;

  const categoryDepartment = category.find(c => c.id === categoryId)
  companySector.innerText = categoryDepartment ? categoryDepartment.name : 'Categoria não localizada'
  companyCard.innerText = company.name;


  sectionCompany.append(companyCard, companySector)

  container.appendChild(sectionCompany)

}


/*------------------------------------ Criação dos lista Category ----------------------------------------------------- */



export function listCategory(category) {
  const container = document.querySelector(' .list__companies--item');
  const categoryDiv = document.createElement('div');
  const categoryName = document.createElement('h1');
  const categoryDescription = document.createElement('p');

  categoryDiv.className = 'list__categoryFilter';
  categoryName.className = 'text-1';
  categoryDescription.className = 'descriptionCategory';

  categoryName.innerText = category.name;
  categoryDescription.innerText = `Descrição: ${category.description}`;

  categoryDiv.append(categoryName, categoryDescription);

  container.appendChild(categoryDiv);
}

/*------------------------------------ Administrador - lista departamentos----------------------------------------------- */

export const renderDepartments = async () => {
  const allDepartments = await listDepartments();
  const allCompanies = await getAllCompanies();
  const container = document.querySelector('.container__departments');
  container.innerHTML = '';

  allDepartments.forEach(department => {
    const departmentDiv = createDepartmentElement(department, allCompanies);
    if (departmentDiv instanceof Node) {
      container.appendChild(departmentDiv);
    }
  });


  handleToViewDepartment();
  handleToEditDepartment();
  handleToDeleteDepartment();
};


export const createDepartmentElement = (department, allCompanies) => {
  const CardDepartment = document.createElement('div');
  const sectionDepartment = document.createElement('ul');
  const nameDepartment = document.createElement('li');
  const descriptionDepartment = document.createElement('li');
  const nameCompany = document.createElement('li');
  const navCrud = document.createElement('ul');

  const viewDepartment = document.createElement('img');
  const editDepartment = document.createElement('img');
  const deleteDepartment = document.createElement('img');

  CardDepartment.className = 'departmentsCard'
  sectionDepartment.className = 'container__cardDescription'
  navCrud.className = 'container__option'
  viewDepartment.className = 'viewBtn'
  editDepartment.className = 'editBtn'
  deleteDepartment.className = 'deleteBtnDepartment'

  nameDepartment.innerText = department.name;
  descriptionDepartment.innerText = department.description;
  nameCompany.id = department.company_id;
  const companyId = department.company_id;

  nameDepartment.className = 'text-3'
  nameCompany.className = 'text-2'
  descriptionDepartment.className = 'text-2'


  const company = allCompanies.find(c => c.id === companyId);
  nameCompany.innerText = company ? company.name : 'Nome da empresa não encontrado';


  viewDepartment.id = `viewBtn-${department.id}`;
  editDepartment.id = `editBtn-${department.id}`;
  deleteDepartment.id = `deleteBtn-${department.id}`;

  deleteDepartment.addEventListener('click', () => {
    deleteItem(department.id);
  });


  viewDepartment.dataset.id = department.id;
  editDepartment.dataset.id = department.id;
  deleteDepartment.dataset.id = department.id;


  viewDepartment.src = '/src/assets/visualizar.svg';
  viewDepartment.alt = 'Visualizar';
  editDepartment.src = '/src/assets/editar.svg';
  editDepartment.alt = 'Editar';
  deleteDepartment.src = '/src/assets/deletar.svg';
  deleteDepartment.alt = 'Excluir';
  const delModal = document.createElement('button');
  delModal.dataset.id = department.id;
  delModal.innerText = 'Excluir';
  delModal.addEventListener('click', async () => {
    const departmentId = department.id;

    await deleteDepartment(departmentId);
    closeDeleteModal(); 
  });



  sectionDepartment.append(nameDepartment, descriptionDepartment, nameCompany);

  navCrud.append(viewDepartment, editDepartment, deleteDepartment);

  CardDepartment.append(sectionDepartment, navCrud);

  return CardDepartment;
}

/*------------------------------------ Administrador - Contratação - Departamentos  ----------------------------------------------- */



/*------------------------------------ Administrador - Select Company ----------------------------------------------- */

export const renderSelectCompanies = async () => {
  const companies = await getAllCompanies();


  const select = document.getElementById('company');


  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.innerText = 'Selecionar Empresa';

  defaultOption.className = 'list_company__option'
  select.appendChild(defaultOption);

  companies.sort((a, b) => a.name.localeCompare(b.name));

  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company.id;
    option.innerText = company.name;
    select.appendChild(option);
  });
}


/*------------------------------------ Administrador - Select Company new Departments----------------------------------------------- */

export const renderSelectCompaniesNewDepartment = async () => {
  const companies = await getAllCompanies();


  const select = document.getElementById('companyNewDepartment');

  select.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.innerText = 'Selecionar Empresa';
  select.appendChild(defaultOption);

  companies.sort((a, b) => a.name.localeCompare(b.name));

  companies.forEach(company => {
    const option = document.createElement('option');
    option.value = company.id;
    option.innerText = company.name;
    select.appendChild(option);
  });
}
/*------------------------------------ Captura empresa do change do Select ------------------------------------------- */


let selectedCompanyName = '';
let allCompanies = [];

export const renderCompanyName = async () => {
  const select = document.getElementById('company');

  select.addEventListener('change', async (event) => {
    const selectedCompanyId = event.target.value;

    if (selectedCompanyId === '') {
      renderDepartments()
    } else {

      const companyId = await readByCompany(selectedCompanyId);

      const selectedCompany = allCompanies.find((company) => company.id === selectedCompanyId);
      selectedCompanyName = selectedCompany ? selectedCompany.name : '';

      await renderCompanyID(companyId);
      return companyId;

    }
  });
};


/*------------------------------------ Filtro de empresa de change do Select ------------------------------------------- */


export const renderCompanyID = async (companyId) => {
  allCompanies = await getAllCompanies();
  const container = document.querySelector('.container__departments');
  container.innerHTML = '';

  if (!companyId || companyId.length === 0) {
    const message = document.createElement('h1');
    message.innerText = `Não há departamentos associados a empresa ${selectedCompanyName}.`;
    message.classList.add('noDepartments-message');
    container.appendChild(message);
  } else {
    companyId.forEach((department) => {
      const departmentDiv = createDepartmentElement(department, allCompanies);
      if (departmentDiv instanceof Node) {
        container.appendChild(departmentDiv);
      }
    });
  }
};



/*------------------------------------ Administrador - Colaboradores ----------------------------------------------- */

export const renderEmployees = async () => {
  const allEmployees = await listEmployees();
  const allCompanies = await getAllCompanies();
  const container = document.querySelector('.container__employees');
  container.innerHTML = '';

  allEmployees.forEach((employee) => {
    const employeeDiv = createListEmployee(employee, allCompanies);
    if (employeeDiv instanceof Node) {
      container.appendChild(employeeDiv);
    }
  });

  handleToEditEmployee();
  handleToDeleteEmployee();
};


export function createListEmployee(employee, allCompanies) {
  const CardEmployee = document.createElement('div');
  const sectionEmployee = document.createElement('ul');
  const nameEmployee = document.createElement('li');
  const nameCompany = document.createElement('li');
  const navCrud = document.createElement('ul');
  const editEmployee = document.createElement('img');
  const deleteEmployee = document.createElement('img');

  CardEmployee.className = 'employeeCard';
  sectionEmployee.className = 'employeeCard__data';
  navCrud.className = 'employeeCard__menu';

  editEmployee.className = 'editBtn';
  deleteEmployee.className = 'deleteBtn';

  nameEmployee.innerText = employee.name;
  nameCompany.id = employee.company_id;

  nameEmployee.className = 'text-3';
  nameCompany.className = 'text-3';

  const companyId = employee.company_id;
  const company = allCompanies.find(c => c.id === companyId);
  const companyName = company ? company.name : 'Nenhuma empresa/departamento associada';

  if (companyName === 'Nenhuma empresa/departamento associada') {
    nameCompany.classList.add('red-text');
  }

  nameCompany.innerText = companyName;
  editEmployee.id = `editBtn-${employee.id}`;
  deleteEmployee.id = `deleteBtn-${employee.id}`;

  deleteEmployee.addEventListener('click', () => {
    openDeleteModal(employee.id);
  });

  editEmployee.dataset.id = employee.id;
  deleteEmployee.dataset.id = employee.id;

  editEmployee.src = '/src/assets/editar.svg';
  editEmployee.alt = 'Editar';
  deleteEmployee.src = '/src/assets/deletar.svg';
  deleteEmployee.alt = 'Excluir';
  const deleteBtnModal = document.createElement('button');
  deleteBtnModal.dataset.id = employee.id;
  deleteBtnModal.innerText = 'Excluir';
  deleteBtnModal.addEventListener('click', async () => {
    const employeeId = employee.id;

    await deleteEmployee(employeeId);
    closeDeleteModal();
  });


  sectionEmployee.append(nameEmployee, nameCompany);
  navCrud.append(editEmployee, deleteEmployee);
  CardEmployee.append(sectionEmployee, navCrud);

  return CardEmployee;
}


export const renderEmployeeHiring = async (buttonId) => {
  const container = document.querySelector('.hireEmployee');

  container.innerHTML = '';

  try {
    const allEmployees = await listEmployees();
    const allCompanies = await getAllCompanies();
    const allDepartments = await listDepartments();

    const department = allDepartments.find((dep) => dep.id === buttonId);

    if (department) {
      const employeesOfDepartment = allEmployees.filter(
        (employee) => employee.department_id === department.id
      );

      const departmentDiv = patchHireEmployee(department, allCompanies, employeesOfDepartment, requestHiring);


      if (departmentDiv instanceof Node) {
        container.appendChild(departmentDiv);
      }
    }
  } catch (error) {
    console.error('Erro ao obter dados:', error);
  }
};




export const renderSelectEmployeesId = async () => {
  const select = document.getElementById('selectEmployees');
  select.addEventListener('change', (event) => {
    const selectedEmployeeId = event.target.value;

  });
};



export const renderSelectListEmployees = async () => {
  const employeesOutOfWork = await requestEmployeesOutOfwork();
  console.log(employeesOutOfWork)
  const selectEmployees = document.getElementById('selectEmployees');



  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.innerText = 'Selecionar Funcionário';
  selectEmployees.appendChild(defaultOption);

  employeesOutOfWork.sort((a, b) => a.name.localeCompare(b.name));

  employeesOutOfWork.forEach((employee) => {
    const option = document.createElement('option');
    option.value = employee.id;
    option.innerText = employee.name;
    selectEmployees.appendChild(option);
  });
}



export const patchHireEmployee = (department, allCompanies, employees, requestHiring) => {
  const cardDepartment = document.createElement('ul');
  const nameDepartment = document.createElement('li');
  const descriptionDepartment = document.createElement('li');
  const nameCompany = document.createElement('li');
  const divSelecBtn = document.createElement('div');
  const selectEmployees = document.createElement('select');
  const divCards = document.createElement('div')

  cardDepartment.className = 'container__cardDescription';
  selectEmployees.id = 'selectEmployees';
  nameDepartment.className = 'hireEmployee-title'
  descriptionDepartment.className = 'hireEmployee-description'
  nameCompany.className = 'hireEmployee-company'
  divSelecBtn.className = 'hireAnEmployee__items'
  divCards.className = 'divCards'

  renderSelectListEmployees()

  const companyId = department.company_id;
  const company = allCompanies.find((c) => c.id === companyId);
  nameCompany.innerText = company ? company.name : 'Nome da empresa não encontrado';
  nameDepartment.innerText = department.name;
  descriptionDepartment.innerText = department.description;
  nameCompany.id = department.company_id;



  const containerCardEmployees = document.createElement('div');
  containerCardEmployees.className = 'containerCard';

  if (employees.length === 0) {
    const divMessage = document.createElement('div')
    divMessage.className = 'message'
    const noEmployeesMessage = document.createElement('p');
    noEmployeesMessage.innerText = 'Esse departamento não tem colaboradores associados a ele.';
    noEmployeesMessage.className = 'message-notFound text-1'

    divMessage.appendChild(noEmployeesMessage);
    containerCardEmployees.appendChild(divMessage);
  } else {
    employees.forEach((employee) => {

      const cardEmployee = document.createElement('ul');
      const nameEmployee = document.createElement('li');
      const companyName = document.createElement('li');
      const dismissButton = document.createElement('button');

      cardEmployee.className = 'containerCard__items'


      nameEmployee.className = 'title-2'
      companyName.className = 'text-3'

      nameEmployee.innerText = employee.name;
      const company = allCompanies.find((c) => c.id === employee.company_id);
      companyName.innerText = company ? company.name : 'Nome da empresa não encontrado';

      dismissButton.innerText = 'Desligar';
      dismissButton.className = 'dimissButton text-2'
      dismissButton.addEventListener('click', async () => {

        await dismissEmployee(employee.id);
        closeModalEdit()

      });

      cardEmployee.appendChild(nameEmployee);
      cardEmployee.appendChild(companyName);
      cardEmployee.appendChild(dismissButton);
      divCards.appendChild(cardEmployee);
      containerCardEmployees.appendChild(divCards);
    });
  }

  const btnHireEmployee = document.createElement('button');
  btnHireEmployee.id = 'hireAnEmployee'
  btnHireEmployee.innerText = 'Contratar';
  btnHireEmployee.addEventListener('click', async () => {
    const selectedEmployeeId = selectEmployees.value;
    if (selectedEmployeeId) {
      const hiringBody = {
        department_id: department.id,
      };
      await requestHiring(selectedEmployeeId, hiringBody);
      const updatedEmployees = await listEmployees();
      const employeesOfDepartment = updatedEmployees.filter(
        (employee) => employee.department_id === department.id
      );
      renderEmployees(employeesOfDepartment);
    }
  });

  divSelecBtn.appendChild(selectEmployees);
  divSelecBtn.appendChild(btnHireEmployee);
  cardDepartment.appendChild(nameDepartment);
  cardDepartment.appendChild(descriptionDepartment);
  cardDepartment.appendChild(nameCompany);
  cardDepartment.appendChild(divSelecBtn);
  cardDepartment.appendChild(containerCardEmployees);

  return cardDepartment;
};


export const renderDepartmentById = async (buttonId) => {
  const allDepartments = await listDepartments();
  const container = document.querySelector('.updateDepartment__title');
  container.innerHTML = '';
  const department = allDepartments.find((dep) => dep.id === buttonId);
  if (department) {
    const departmentDiv = updateDepartmentById(department);
    if (departmentDiv instanceof Node) {

      const departmentContainer = document.createElement('div');
      departmentContainer.innerHTML = '';
      departmentContainer.appendChild(departmentDiv);

      container.appendChild(departmentContainer);
    }
  }
};

export const updateDepartmentById = (department) => {
  const departmentContainer = document.createElement('div');
  const h1 = document.createElement('h1');

  h1.className = 'modalEdit-title title-1';
  h1.innerText = department.name;

  departmentContainer.appendChild(h1);

  return departmentContainer;
};



/*------------------------------------ Employee - perfil ----------------------------------------------- */

export const renderUser = async () => {
  const userProfile = await profile();

  const company_id = userProfile.company_id;
  const department_id = userProfile.department_id;

  const company = await requestCompanyProfile(company_id);
  const department = await requestDepartmentProfile(department_id);

  renderUserProfile(userProfile, company, department);
};

export const renderUserProfile = (userProfile, company, department) => {
  const container = document.querySelector('.container_main');

  container.innerHTML = '';

  const sectionProfile = document.createElement('ul');
  const username = document.createElement('li');
  const email = document.createElement('li');

  username.textContent = userProfile.name;
  email.textContent = userProfile.email;

  sectionProfile.className = 'section_Profile';
  username.className = 'section_Profile__title title-1';
  email.className = 'section_Profile__email text-1';

  if (userProfile.company_id === null) {

    const containerNotHired = document.createElement('div');
    const notHired = document.createElement('p');
    notHired.textContent = 'Você ainda não foi contratado';
    containerNotHired.style.display = 'flex';
    containerNotHired.className = 'NotHired';
    notHired.className = 'NotHired__paragrafh title-1';



    sectionProfile.append(username, email);
    containerNotHired.appendChild(notHired);
    container.append(sectionProfile, containerNotHired);
  } else {
    const containerCompany = document.createElement('div');
    const sectionCompany = document.createElement('div');
    const contractingCompany = document.createElement('ul');
    const nameCompany = document.createElement('li');
    const nameDepartment = document.createElement('li');
    const span = document.createElement('span');
    const containerWorkFriends = document.createElement('div');


    containerCompany.className = 'containerCompany';
    sectionCompany.className = 'sectionCompany';
    contractingCompany.className = 'contractingCompany';
    nameCompany.className = 'nameCompany title-1';
    nameDepartment.className = 'nameDepartmenty title-1';
    containerWorkFriends.className = 'containeWorkFriends';

    span.className = 'nameDepartmenty title-1';
    span.textContent = ' - ';


    nameCompany.textContent = company.name;
    nameDepartment.textContent = department.name;


    sectionProfile.append(username, email);
    containerCompany.append(sectionCompany, containerWorkFriends);
    sectionCompany.appendChild(contractingCompany);
    contractingCompany.append(nameCompany, span, nameDepartment);

    container.append(sectionProfile, containerCompany);


    const companyEmployees = company.employees;
    companyEmployees.forEach((employee) => {
      const workFriend = document.createElement('li');
      workFriend.className = 'workFriends title-2';
      workFriend.textContent = employee.name;

      const cardWorkFriends = document.createElement('ul');
      cardWorkFriends.className = 'cardWorkFriends';
      cardWorkFriends.appendChild(workFriend);
      containerWorkFriends.appendChild(cardWorkFriends);
    });
  }
};

document.addEventListener('DOMContentLoaded', renderUser);
