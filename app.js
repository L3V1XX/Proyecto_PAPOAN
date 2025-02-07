function rolEmpleado() {
    let rol = document.getElementById("rol_empleado").value;
    let cocinero = document.getElementById("Cocinero");
    let dependiente = document.getElementById("Dependiente");
    
    if (rol == "Cocinero") {
        cocinero.style = ""
        dependiente.style = "display: none;"
    } else if(rol == "Dependiente") {
        dependiente.style = "";
        cocinero.style = "display: none;"
    }
  
}

function tipoEvento() {
    let evento;
    document.getElementsByName("evento").forEach((item) => {
        if(item.checked) {
            evento = item.value;
        }
    });
    
    let boda = document.getElementById("comida_boda");
    let empresa = document.getElementById("cena_empresa");
    let cumple = document.getElementById("cumple");

    if (evento == "boda") {
        boda.style = "";
        empresa.style = "display: none;"
        cumple.style = "display: none;"
    } else if(evento == "empresa") {
        empresa.style = "";
        boda.style = "display: none;"
        cumple.style = "display: none;"
    }  else if(evento == "cumpleaños") {
        cumple.style = "";
        boda.style = "display: none;"
        empresa.style = "display: none;"
    }  
}

/* Con esto podemos hacer el toggle del menu */
function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? '' : 'flex';
};
