import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
    providedIn: 'root'
})

export class DatabaseService {

    constructor(private afDB: AngularFireDatabase) { }

    /*********************
     * obtener todos los datos
    **********************/
    public getAllData(database) {
        return this.afDB.list(database);
    }

    /*********************
     * Obtener por id
    **********************/
    public getDataId(database, id) {
        return this.afDB.object(database + id);
    }

    /*********************************
     * Filtrar por valores de campos
     * ejemplo:
     * base de datos-> campo = Valor
     * database     -> field = value
    *********************************/
    public getFilterFieldValue(database, field, value) {
        return this.afDB.list(database, result =>
            result.orderByChild(field).equalTo(value));
    }

    /*********************
     * Agregar
    **********************/
    public addNew(database, object) {
        return this.afDB.database.ref( database + object.id).set(object);
    }

    /*********************
     * Eliminar
    **********************/
    public deleteData(database, object) {
        return this.afDB.database.ref(database + object.id).remove();
    }

}
