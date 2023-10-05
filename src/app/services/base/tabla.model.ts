
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

    formatDate(date, showTime = true) {
        var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = '' + d.getFullYear(),
          hours = '' + d.getHours(),
          minutes = '' + d.getMinutes(),
          seconds = '' + d.getSeconds();
    
        if (month.length < 2) 
          month = '0' + month;
        if (day.length < 2) 
          day = '0' + day;
        if (hours.length < 2) 
          hours = '0' + hours;
        if (minutes.length < 2) 
          minutes = '0' + minutes;
        if (seconds.length < 2) 
          seconds = '0' + seconds;
    
        if(showTime)
            return [day, month, year ].join('/') + " " + [hours, minutes, seconds].join(':');
        else
        return [day, month, year ].join('/');
    }

    
}