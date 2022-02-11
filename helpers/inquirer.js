const inquirer = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [{
            value: 1,
            name: `${'1.'.green} Crear una tarea`
        },
        {
            value: 2,
            name: `${'2.'.green} Listar tareas`
        },
        {
            value: 3,
            name: `${'3.'.green} Listar tareas completadas`
        },
        {
            value: 4,
            name: `${'4.'.green} Listas tareas pendientes`
        },
        {
            value: 5,
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: 6,
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: 0,
            name: '0. Salir'.red
        }
    ]
}];

/**
 * Función que sirve para mostrar el menú principal con las opciónes del programa
 * @returns 
 */
const inquirerMenu = async () => {

    console.log('*****************************************'.green);
    console.log('       Seleccione una opción'.yellow);
    console.log('*****************************************\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
};

/**
 * Función que sirve para pausar el programa y se creé el bulce de seguir interactuando con la app
 */
const pausa = async () => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'ENTER'.blue} para continuar`
    }];

    console.log('\n\n');

    await inquirer.prompt(question);
};

/**
 * Función que sirve paara validar que se agregue algo cuando se registra una tarea
 * @param {*} message 
 * @returns 
 */
const leerInput = async (message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            return value.length == 0 ? 'Por favor ingresa un valor' : true;
        }
    }];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

/**
 * Función que sirve para mostrar las tareas de la opción borrar tareas
 * @param {*} tareas 
 * @returns 
 */
const listadoTareasBorrar = async(tareas = []) => {

    const opciones = tareas.map((tarea,i) => {
        return {
            value: tarea.id,
            name: `${i + 1} ${tarea.descr}`.green,
            index: i + 1
        }
    });

    opciones.unshift({
        value: 0,
        name: '0. Cancelar',
        index: 0
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices: opciones
    }]
    
    const {id} = await inquirer.prompt(preguntas);

    return id;
};

const mostrarListadoCheckList = async(tareas = []) => {

    const opciones = tareas.map((tarea,i) => {
        return {
            value: tarea.id,
            name: `${i + 1} ${tarea.descr}`.green,
            checked: tarea.completadoEn ? true : false
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices: opciones
    }]
    
    const {ids} = await inquirer.prompt(pregunta);

    return ids;
};

/**
 * Función que sirve ara confirmar una acción
 * @param {*} mensaje 
 * @returns 
 */
const confirmar = async mensaje => {
    const pregunta = [{
        type: 'confirm',
        name: 'ok',
        message: mensaje
    }];

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

//exporta las funciones del archivo con su nombre que tiene asignado desde aquí
module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    confirmar
}