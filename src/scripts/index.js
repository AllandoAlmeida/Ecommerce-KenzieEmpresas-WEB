import { renderSelect, renderCompanies, renderCategoryName, } from "./render.js";
import { handleLoginPage, handleRegisterPage } from "./buttons.js";


function authentication() {
    const token = localStorage.getItem('@kenzieEmpresa:authToken')

    if (token) {
        location.replace('./src/pages/dashboard.html')
    }
}
handleRegisterPage()

renderSelect()
renderCompanies()
renderCategoryName()
handleLoginPage()

authentication()

