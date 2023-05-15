import { logout } from "./buttons.js";
import { renderUser } from "./render.js";

function authentication() {
    const token = localStorage.getItem('@kenzieEmpresa:authToken');
    if (!token) {
        location.replace("../../index.html");
}
}


renderUser()
logout()
authentication()
