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
        elemento.style = "font-weight: bold; outline: 2px solid red"
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


// Función simple para mostrar mensajes en campos obligatorios
// Función mejorada para mostrar mensajes en campos obligatorios
function validarCamposObligatorios(formId) {
    // Seleccionar todos los elementos con atributo required
    let elementosObligatorios = document.querySelectorAll(`#${formId} [required]`);
    let formularioValido = true;
    
    // Eliminar mensajes de error anteriores
    const mensajesAnteriores = document.querySelectorAll('.mensaje-obligatorio');
    mensajesAnteriores.forEach(msg => msg.remove());
    
    // Conjunto para almacenar nombres de grupos ya procesados
    let gruposProcesados = new Set();
    
    // Validar cada elemento obligatorio
    elementosObligatorios.forEach(elemento => {
        // Restablecer estilos
        elemento.style = "";
        
        // Verificar si está vacío o no seleccionado
        let esValido = true;
        
        if (elemento.type === "radio" || elemento.type === "checkbox") {
            // Para radio y checkbox, verificar si alguno del grupo está seleccionado
            let nombreGrupo = elemento.name;
            
            // Evitar procesar el mismo grupo más de una vez
            if (gruposProcesados.has(nombreGrupo)) {
                return; // Saltar este elemento si ya procesamos este grupo
            }
            
            gruposProcesados.add(nombreGrupo);
            
            let grupo = document.querySelectorAll(`#${formId} input[name="${nombreGrupo}"]`);
            esValido = Array.from(grupo).some(input => input.checked);
            
            if (!esValido) {
                grupo.forEach(input => input.style = "outline: 2px solid red");
                
                // Buscar el contenedor del grupo (normalmente un div con id o clase específica)
                let contenedor;
                if (nombreGrupo === "evento") {
                    // Para el grupo de eventos, usar el div con id "eventos"
                    contenedor = document.getElementById("eventos");
                } else {
                    // Para otros grupos, usar el div padre del primer elemento
                    contenedor = grupo[0].closest('div');
                }
                
                // Crear un solo mensaje de error para todo el grupo
                const mensaje = document.createElement('span');
                mensaje.className = 'mensaje-obligatorio';
                mensaje.style = 'color: red; font-size: 12px; display: block; margin-top: 5px;';
                mensaje.textContent = 'Este campo es obligatorio';
                
                // Añadir el mensaje al final del contenedor
                if (contenedor) {
                    // Verificar si ya existe un mensaje en este contenedor
                    const mensajeExistente = contenedor.querySelector('.mensaje-obligatorio');
                    if (!mensajeExistente) {
                        contenedor.appendChild(mensaje);
                    }
                }
            }
        } else {
            // Para otros tipos de input
            esValido = elemento.value.trim() !== '';
            
            if (!esValido) {
                elemento.style = "background-color: #ffeeee; border: 1px solid red";
                
                // Crear mensaje de error
                const mensaje = document.createElement('span');
                mensaje.className = 'mensaje-obligatorio';
                mensaje.style = 'color: red; font-size: 12px; display: block; margin-top: 5px;';
                mensaje.textContent = 'Este campo es obligatorio';
                
                // Insertar después del elemento
                elemento.parentNode.insertBefore(mensaje, elemento.nextSibling);
            }
        }
        
        if (!esValido) {
            formularioValido = false;
        }
    });
    
    return formularioValido;
}

// Reemplazar la llamada a validarFormulario en los botones de envío
document.addEventListener('DOMContentLoaded', function() {
    // Buscar todos los formularios en la página
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(form => {
        // Reemplazar el onclick existente
        const submitButton = form.querySelector('input[type="submit"]');
        if (submitButton) {
            submitButton.onclick = function(event) {
                if (!validarCamposObligatorios(this.closest('form').id)) {
                    event.preventDefault();
                    return false;
                }
                return true;
            };
        }
    });
});