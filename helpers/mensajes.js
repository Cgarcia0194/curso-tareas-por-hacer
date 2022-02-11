const {
    read
} = require('fs');

require('colors');

/**
 * Función que sirve para mostrar el menú de las opciones de la app
 * @returns 
 */
const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('*****************************************'.green);
        console.log('       Seleccione una opción'.yellow);
        console.log('*****************************************\n'.green);
        console.log(`
        ${'1.'.green} Crear una tarea
        ${'2.'.green} Listar tareas
        ${'3.'.green} Listar tareas completadas
        ${'4.'.green} Listas tareas pendientes
        ${'5.'.green} Completar tarea(s)
        ${'6.'.green} Borrar tarea
        ${'0.'.red} Salir \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question('Seleccione una opción', opt => {
            readline.close();
            resolve(opt);
        });

    });

};

/**
 * Función que sirve para pausar y tener la función del enter
 * @returns 
 */
const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`\nPresione ${'ENTER'.blue} para continuar`, opt => {
            readline.close();
            resolve();
        });
    });

};

//exporta las funciones del archivo con su nombre que tiene asignado desde aquí
module.exports = {
    mostrarMenu,
    pausa
}