import {getAllCategories, getAllCompanies, listDepartments, readByCategory, listEmployees, readByCompany} from './requests.js'


/*------------------------------------ renderizar lista de categorias ----------------------------------------------- */ 

export const renderSelect = async () => {
    const categories = await getAllCategories();
    const select = document.getElementById('category');
    console.log(select)

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

  export const renderCompanies = async () =>{
    const companies = await getAllCompanies();
    const container = document.querySelector(' .list__companies--item');
  
    container.innerHTML = '';
    
    companies.forEach(company =>{
      const companyDiv = listCompany(company);
      if(companyDiv instanceof Node){
        container.appendChild(companyDiv);
      } 
    })

  }
  
/*------------------------------------ Captura o valor do change do Select ------------------------------------------- */  
  
  
  export const renderCategoryName = async () => {
    const select = document.getElementById('category');
    
    select.addEventListener('change', async (event) => {
      const selectedName = event.target.options[event.target.selectedIndex].text;
      console.log(selectedName);
      const companies = await readByCategory(selectedName);  
      await renderByCategory(companies);
      return companies
    });
  };
  
  
  export const renderByCategory = async (array) =>{
    const container = document.querySelector(' .list__companies--item');
    container.innerHTML = '';
    
    await array.forEach( category =>{
      const companyDiv = listCategory(category);
      if(companyDiv instanceof Node){
        container.appendChild(companyDiv);
      } 
    })
  }


/*------------------------------------ Criação dos Cards Company ----------------------------------------------------- */
  
    export function listCompany(company){
      const container = document.querySelector(' .list__companies--item');
      const sectionCompany = document.createElement('div')
      const companyCard = document.createElement('h1');
      const companySector = document.createElement('button')
  
      sectionCompany.className = 'list__company--item'
      companyCard.className = 'text-1'
      companySector.className = 'sectionBtn btnSetor'
      companySector.id = company.category_id
  
      companyCard.innerText = company.name;
      companySector.innerText = 'Setor';
  
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
  console.log(allDepartments)
  const container = document.querySelector('.container__departments');
  container.innerHTML = '';

  allDepartments.forEach(department => {
    const departmentDiv = createDepartmentElement(department, allCompanies);
    if (departmentDiv instanceof Node) {
      container.appendChild(departmentDiv);
    }
  });
};


export const createDepartmentElement = (department, allCompanies) =>  {
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



  nameDepartment.innerText = department.name;
  descriptionDepartment.innerText = department.description;
  nameCompany.id = department.company_id;
  const companyId = department.company_id;

  /* renderizar o nome da empresa pelo ID */
  const company = allCompanies.find(c => c.id === companyId);
  nameCompany.innerText = company ? company.name : 'Nome da empresa não encontrado';
  viewDepartment.id = department.id;
  editDepartment.id = department.id;
  deleteDepartment.id = department.id;

  viewDepartment.src = '/src/assets/visualizar.svg';
  viewDepartment.alt = 'Visualizar';
  editDepartment.src = '/src/assets/editar.svg';
  editDepartment.alt = 'Editar';
  deleteDepartment.src = '/src/assets/deletar.svg';
  deleteDepartment.alt = 'Excluir';

  sectionDepartment.append(nameDepartment, descriptionDepartment, nameCompany);
  navCrud.append(viewDepartment, editDepartment, deleteDepartment);

  CardDepartment.append(sectionDepartment, navCrud);

  return CardDepartment;
}

/*------------------------------------ Administrador - Colaboradores ----------------------------------------------- */

export const renderEmployees = async ()=>{
  const AllEmployees = await listEmployees();
  const allCompanies = await getAllCompanies();
  const container = document.querySelector(' .container__employees');
  container.innerHTML = '';

  AllEmployees.forEach(employee => {
    const employeeDiv = createListEmployee(employee, allCompanies);
    if (employeeDiv instanceof Node) {
      container.appendChild(employeeDiv);
    }
  });
};

export function createListEmployee(employee, allCompanies) {
  const CardEmployee = document.createElement('div');
  const sectionEmployee = document.createElement('ul');
  const nameEmployee = document.createElement('li');
  const nameCompany = document.createElement('li');
  const navCrud = document.createElement('ul');
  const editEmployee = document.createElement('img');
  const deleteEmployee = document.createElement('img');


  CardEmployee.className = 'employeeCard'
  sectionEmployee.className = 'employeeCard__data'
  navCrud.className = 'employeeCard__menu'



  nameEmployee.innerText = employee.name;
  nameCompany.id = employee.company_id;

  const companyId = employee.company_id;
  const company = allCompanies.find(c => c.id === companyId);
  const companyName = company ? company.name : 'Nenhuma empresa/departamento associada';

  if (companyName === 'Nenhuma empresa/departamento associada') {
    nameCompany.classList.add('red-text'); 
    }

  nameCompany.innerText = companyName;
  editEmployee.id = employee.id;
  deleteEmployee.id = employee.id;

  
  editEmployee.src = '/src/assets/editar.svg';
  editEmployee.alt = 'Editar';
  deleteEmployee.src = '/src/assets/deletar.svg';
  deleteEmployee.alt = 'Excluir';

  sectionEmployee.append(nameEmployee, nameCompany);
  navCrud.append( editEmployee, deleteEmployee);

  CardEmployee.append(sectionEmployee, navCrud);

  return CardEmployee;
}


/*------------------------------------ Administrador - Select Company ----------------------------------------------- */
/* 
export const renderSelectCompanies = async() => {
  const companies = await getAllCompanies();
  console.log(companies)

    const select = document.getElementById('company');

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
} */
/*------------------------------------ Captura empresa do change do Select ------------------------------------------- */ 

/* export const renderCompanyName = async () => {
  const select = document.getElementById('company');
  
  select.addEventListener('change', async (event) => {
    const selectedCompanyId = event.target.value;
    console.log(selectedCompanyId);
    const companies = await readByCompany(selectedCompanyId);  
    await readByCompany(companies);
    return companies
  });
};


 */