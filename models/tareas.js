/**
 * _listado:
 * 
 */
const Tarea = require('./tarea.js');
const colores = require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            listado.push(this._listado[key]);
        });

        return listado;
    }

    /**
     * Constructor de la clase
     */
    constructor() {
        this._listado = {};
    }

    /**
     * Función que sirve para cargar las tareas
     * @param {*} tareas 
     */
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });

    }

    /**
     * Función que sirve para registrar una tarea en la clase Tarea
     * @param {*} desc 
     */
    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    /**
     * Fucnión que sirve para borrar una tarea por su id
     * @param {*} id 
     */
    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    /**
     * Función que sirve para mostrar las tareas
     * sirve para laa opción 2, 3 y 4 de la app
     * @param {*} completadas 
     * @returns 
     */
    listadoTareas(completadas) {
        let listado = '';
        let listadoCompletas = '';
        let listadoPendientes = '';

        this.listadoArr.forEach((tarea, i) => {
            if (tarea.completadoEn !== null) { //completas y todas
                listado += `${(i + 1)}. ${tarea.descr} (${tarea.completadoEn}) \n`.green;
                listadoCompletas += `${(i + 1)}. ${tarea.descr} (${tarea.completadoEn})\n`.green;
            } else { //pendientes y todas
                listado += `${(i + 1)}. ${tarea.descr} (Pendiente) \n`.red;
                listadoPendientes += `${(i + 1)}. ${tarea.descr}\n`.red;
            }
        });

        return parseInt(completadas) === 2 ? listado : parseInt(completadas) === 3 ? listadoCompletas : listadoPendientes;
    }

    toggleCompletadas( ids = []) {

        ids.forEach(id => {
            const tarea = this._listado[id];
            
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }

        });

    }

}

//exporta las funciones del archivo con su nombre que tiene asignado desde aquí
module.exports = Tareas;