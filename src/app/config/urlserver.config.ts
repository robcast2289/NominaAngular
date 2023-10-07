import { environment } from '../../environments/environment';

let URL_SERVER: string;
// Servidor
if (environment.production) {
    URL_SERVER = 'http://34.31.15.103:80/'; 
} else {
    URL_SERVER = 'http://localhost:8080/';
    //URL_SERVER = 'http://34.71.87.248:80/'; 
}

// Rutas
export const URL_SERVICES = URL_SERVER;
