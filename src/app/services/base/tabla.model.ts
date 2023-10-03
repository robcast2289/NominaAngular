
export class TablaBase {
    entidad = [];
    entidadTable = [];
    buscar: string;
    page = 1;
    fieldSort: string;
    fieldSortDirection: string;
    entidadDelete = [];
    Permisos:any = {
        Alta:0,
        Baja:0,
        Cambio:0
    }

    // Funcion para buscar
    funcSearch(ev) {
    const arrayBuscar = ev.toString().split(' ');

        if (ev.length > 0) {
        this.entidadTable = this.entidad.filter(proyecto => {
            let respuesta: boolean;
            for (const element in proyecto) {
            if (proyecto[element] != null) {
                arrayBuscar.forEach(palabra => {
                if (palabra !== '') {
                    if (proyecto[element].toString().toLowerCase().indexOf(palabra.toString().toLowerCase()) !== -1) {
                    respuesta = true;
                    }
                }
                });
            }
            }
            return respuesta;
        });
        } else {
        this.entidadTable = this.entidad;
        }
    }


    // Funcion para ordenar
    funcSort(control) {
        const field: string = control.target.dataset.toggle;
        
        if (!this.fieldSort || this.fieldSort !== field) {
            this.entidadTable.sort((a, b) => {
                if (a[field] > b[field]) {
                    return 1;
                }
                if (a[field] < b[field]) {
                    return -1;
                }
                return 0;
            });
            this.fieldSortDirection = 'asc';
        } else {
            this.entidadTable.sort((a, b) => {              
                return 1;
            });
            if (this.fieldSortDirection === 'asc') {
                this.fieldSortDirection = 'desc';
            } else {
                this.fieldSortDirection = 'asc';
            }
        }
        this.fieldSort = field;
    }

    
}