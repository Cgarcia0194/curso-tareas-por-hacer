const colores = require('colors');

//importo las funciones de guardarArchivo
const {
    guardarDB,
    leerDB
} = require('./db/guardarArchivo');

//importo las funciones de iquirer
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    mostrarListadoCheckList,
    confirmar
} = require('./helpers/inquirer');

//importo la clase tareas
const Tareas = require('./models/tareas.js');

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        //imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case 1: //crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case 2: //listar tareas
                console.log('\n' + tareas.listadoTareas(opt));
                break;
            case 3: //Listar tareas completadas
                console.log('\n' + tareas.listadoTareas(opt));
                break;
            case 4: //Listar tareas pendientes
                console.log('\n' + tareas.listadoTareas(opt));
                break;
            case 5: //Completar tarea(s)
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case 6: //Borrar tarea
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== 0) {
                    const mensajeConfirmar = await confirmar('¿Estás seguro que deseas borrar el registro?');
                    if (mensajeConfirmar) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente'.rainbow);
                    }
                }
                break;
        }

        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== 0);
};

/**
 * Ejecuta la app, similara lo que hacen las aplicación como Java, etc
 */
main();