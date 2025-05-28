// ========================================
// FUNCIONES DE INTERFAZ DE USUARIO
// ========================================

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
}

// ========================================
// MENSAJES DE ERROR ESPECÍFICOS
// ========================================

const MENSAJES_ERROR = {
    // Mensaje genérico
    obligatorio: 'Este campo es obligatorio',
    formato: 'El formato del campo no es válido',
    
    // Mensajes específicos por campo
    dni_empleado: {
        obligatorio: 'El DNI es obligatorio',
        formato: 'El DNI debe tener 8 números seguidos de una letra (ej: 12345678N)'
    },
    
    sucursal_empleado: {
        obligatorio: 'Debe seleccionar una sucursal'
    },
    
    id_evento: {
        obligatorio: 'El ID del evento es obligatorio',
        formato: 'El ID del evento debe ser un número positivo mayor que 0'
    },
    
    sucursal: {
        obligatorio: 'El ID de la sucursal es obligatorio',
        formato: 'El ID de la sucursal debe ser un número positivo mayor que 0'
    },
    
    // Mensajes para grupos de radio/checkbox
    evento: {
        obligatorio: 'Debe seleccionar un tipo de evento'
    }
};

// ========================================
// FUNCIÓN DE VALIDACIÓN
// ========================================

function validarCamposObligatorios(formId) {
    let elementosObligatorios = document.querySelectorAll(`#${formId} [required]`);
    let formularioValido = true;
    

    limpiarMensajesError();
    
    
    let gruposProcesados = new Set();
    
    
    elementosObligatorios.forEach(elemento => {
        elemento.style = "";
        let esValido = true;
        
        if (elemento.type === "radio" || elemento.type === "checkbox") {
            esValido = validarGrupoRadioCheckbox(elemento, formId, gruposProcesados);
        } else {
            esValido = validarCampoIndividual(elemento);
        }
        if (!esValido) {
            formularioValido = false;
        }
    });
    return formularioValido;
}

// ========================================
// FUNCIONES AUXILIARES DE VALIDACIÓN
// ========================================

function limpiarMensajesError() {
    const mensajesAnteriores = document.querySelectorAll('.mensaje-obligatorio');
    mensajesAnteriores.forEach(msg => msg.remove());
}

function validarGrupoRadioCheckbox(elemento, formId, gruposProcesados) {
    let nombreGrupo = elemento.name;
    
    // Evitar procesar el mismo grupo más de una vez
    if (gruposProcesados.has(nombreGrupo)) {
        return true; 
    }
    
    gruposProcesados.add(nombreGrupo);
    
    let grupo = document.querySelectorAll(`#${formId} input[name="${nombreGrupo}"]`);
    let esValido = Array.from(grupo).some(input => input.checked);
    
    if (!esValido) {
        grupo.forEach(input => input.style = "outline: 2px solid red");
    
        let mensajeError = obtenerMensajeError(nombreGrupo, 'obligatorio', true);
        
        mostrarMensajeErrorGrupo(nombreGrupo, mensajeError);
    }
    return esValido;
}

function validarCampoIndividual(elemento) {
    let esValido = true;
    let tipoError = 'obligatorio';
    
    // Verificar si está vacío
    if (elemento.value.trim() === '') {
        esValido = false;
        tipoError = 'obligatorio';
    } else {
        let pattern = elemento.getAttribute("pattern");
        if (pattern) {
            let regex = new RegExp(pattern);
            if (!regex.test(elemento.value)) {
                esValido = false;
                tipoError = 'formato';
            }
        }
    }
    
    if (!esValido) {
        // Aplicar estilos de error
        elemento.style = "background-color: #ffeeee; border: 1px solid red";
        
        // Obtener mensaje específico para el campo
        let mensajeError = obtenerMensajeError(elemento.id || elemento.name, tipoError, false);
        
        // Mostrar mensaje de error
        mostrarMensajeErrorCampo(elemento, mensajeError);
    }
    
    return esValido;
}

function obtenerMensajeError(nombreCampo, tipoError) {
    // Buscar mensaje específico para el campo
    if (MENSAJES_ERROR[nombreCampo] && MENSAJES_ERROR[nombreCampo][tipoError]) {
        return MENSAJES_ERROR[nombreCampo][tipoError];
    }
    
    // Buscar mensaje genérico por tipo de error
    if (MENSAJES_ERROR[tipoError]) {
        return MENSAJES_ERROR[tipoError];
    }
    
    // Fallback al mensaje obligatorio
    return MENSAJES_ERROR.obligatorio;
}

function mostrarMensajeErrorGrupo(nombreGrupo, mensajeError) {
    let contenedor;
    if (nombreGrupo === "evento") {
        contenedor = document.getElementById("eventos");
    } else {
        contenedor = document.querySelector(`input[name="${nombreGrupo}"]`)?.closest('div');
    }

    if (contenedor && !contenedor.querySelector('.mensaje-obligatorio')) {
        const mensaje = crearMensajeError(mensajeError);
        contenedor.appendChild(mensaje);
    }
}

function mostrarMensajeErrorCampo(elemento, mensajeError) {
    const mensaje = crearMensajeError(mensajeError);
    elemento.parentNode.insertBefore(mensaje, elemento.nextSibling);
}

function crearMensajeError(texto) {
    const mensaje = document.createElement('span');
    mensaje.className = 'mensaje-obligatorio';
    mensaje.style = 'color: red; font-size: 12px; display: block; margin-top: 5px;';
    mensaje.textContent = texto;
    return mensaje;
}

// ========================================
// INICIALIZACIÓN DEL DOCUMENTO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularios();
});

function inicializarFormularios() {
    const formularios = document.querySelectorAll('form');
    
    formularios.forEach(form => {
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
}