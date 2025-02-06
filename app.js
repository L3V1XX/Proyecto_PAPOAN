function rolEmpleado() {
    let rol = document.getElementById("rol_empleado").value;
    let div = document.getElementById("variable_rol");
    
    if (rol == "Cocinero") {
        div.innerHTML = '<div><label for= "especialidad_cocinero" > Especialidad:</label ><select name="especialidad_cocinero" id="especialidad_cocinero"><option value="producto1">Producto1</option><option value="producto2">Producto2</option></select></div ><div><label for="jefe_cocinero">Cocinero jefe:</label><input type="checkbox" name="jefe_cocinero" id="jefe_cocinero"></div>';
    } else if(rol == "Dependiente") {
        div.innerHTML = '<label for="color_dependiente">Color:</label><select name="color_dependiente" id="color_dependiente"><option value="rojo">Rojo</option><option value="negro">Negro</option><option value="amarillo">Amarillo</option></select>';
    }
  
}

/* Con esto podemos hacer el toggle del menu */
function toggleMenu() {
    const menu = document.querySelector('.nav-links');
    menu.style.display = menu.style.display === 'flex' ? '' : 'flex';
};
