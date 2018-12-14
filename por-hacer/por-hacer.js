const fs = require('fs');

let listadoPorHacer = [];


const cargarBD = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const guardarBD = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error grabando archivo', err);
    });

}

const crear = (descripcion) => {

    cargarBD();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarBD();

    return porHacer;
}

const getListado = () => {
    cargarBD();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarBD();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarBD();
        return true;
    }
    return false;

}


const borrar = (desc) => {
    cargarBD();

    const nuevoListado = listadoPorHacer.filter(tarea => {
        return tarea.descripcion !== desc
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    }

    listadoPorHacer = nuevoListado;
    guardarBD();
    return true;
}

module.exports = {
    crear,
    getListado,
    actualizar,

    borrar
}