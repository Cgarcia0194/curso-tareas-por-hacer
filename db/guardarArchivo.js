const fs = require('fs');
const archivo = './db/data.json';

/**
 * Función que asirve para poder guardar la informaación en el archivo json que guarda las tareas
 * @param {*} data 
 */
const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));
}

/**
 * Función que sirve para leer el archivo JSON que tiene las tareas
 * @returns 
 */
const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }

    const info = fs.readFileSync(archivo, {
        encoding: 'utf-8'
    });

    return JSON.parse(info);
}

//exportación de las funciones
module.exports = {
    guardarDB,
    leerDB
};