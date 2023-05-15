import { renderDepartments, renderEmployees, renderSelectCompanies, renderCompanyName, renderCompanyID, renderSelectCompaniesNewDepartment } from './render.js'
import { handleCreateDepartment, handleCreateNewDepartment, handleToEditDepartment, handleToEditEmployee } from './buttons.js'
import { logout } from './logout.js';

function authentication() {
    const token = localStorage.getItem('@kenzieEmpresa:authToken');
    const isAdm = localStorage.getItem('@kenzieEmpresa:isAdm');

    if (!token) {
        location.replace("../../index.html");
    } else if (!isAdm) {
        location.replace('./employee.html');
    }
}



renderDepartments()
renderEmployees()

renderSelectCompanies()
renderCompanyName()
renderCompanyID()
handleCreateDepartment()
renderSelectCompaniesNewDepartment()
handleCreateNewDepartment()

handleToEditDepartment()
handleToEditEmployee()


logout()
authentication()