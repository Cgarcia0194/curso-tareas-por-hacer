const {v4: uuidV4} = require('uuid');

class Tarea {
    id = '';
    descr = '';
    completadoEn = null;

    /**
     * Constructor de la clase
     * @param {*} descr 
     */
    constructor(descr) {
        this.id = uuidV4();
        this.descr = descr;
        this.completadoEn = null;
    }

}

//exporta la clase completamente
module.exports = Tarea;