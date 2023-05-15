import { logout } from "./buttons.js";
import { renderUser } from "./render.js";

function authentication() {
    const token = localStorage.getItem('@kenzieEmpresa:authToken');
    const isAdm = localStorage.getItem('@kenzieEmpresa:isAdm');

    if (!token) {
        location.replace("../../index.html");
    } else if (isAdm) {
        location.replace('./dashboard.html');
    }
}


renderUser()
logout()
authentication()
