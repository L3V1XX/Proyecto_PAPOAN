'use strict';

/* Selección del radio button de rol para que salga el correspondiente label */
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

/* Selección del radio button de evento para que salga el correspondiente label */
function tipoEvento() {
    let evento = document.querySelector("input[name='evento']:checked").value;
    
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

function validarFormulario(formId) {
    let elementos = document.querySelectorAll(`#${formId} [required], #${formId} [pattern]`)
    
    elementos.forEach(element => {
        if ((element.type === "radio" || element.type === "checkbox")) {
            validarSeleccionado(element.name, formId);
        } else if(element.value || element.required) {
            validacionElemento(element);
        }
    });
    
}

function validacionElemento(elemento) {
    let pattern = elemento.getAttribute("pattern") || "";
    let regex = new RegExp(pattern);
    let result = false;

    if(!regex.test(elemento.value) || (elemento.required && !elemento.value)) {
        elemento.style = "background-color: red";
    } else  {
        elemento.style = "";
    }

    return result;
}

function validarSeleccionado(name, formId) {
    let grupo = document.querySelectorAll(`#${formId} input[name="${name}"]`);
    let algunoSeleccionado = Array.from(grupo).some(input => input.checked);

    if (!algunoSeleccionado) {
        grupo.forEach(input => input.style="outline: 2px solid red");
    } else {
        grupo.forEach(input => input.style = "outline: none");
    }

    return algunoSeleccionado;
}