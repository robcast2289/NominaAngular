import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser'

import { UsuariotableService } from '../../../../services/seguridad/usuariotable.service';

@Component({
  selector: 'app-cu-usuario-table',
  templateUrl: './cu-usuario-table.component.html',
  styleUrls: ['./cu-usuario-table.component.css']
})
export class CuUsuarioTableComponent implements OnInit {
  previsualizacion:string;
  archivos = [];
  images = [];


  constructor(
    private usuarioTableService:UsuariotableService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
  }

  guardarEntidad(entidadForm: NgForm) {
    if (entidadForm.valid) {
      if (entidadForm.value.IdUsuario == null) {
        // Nuevo
        //this.usuarioTableService.insertar_usuarios(entidadForm.value,this.archivos)        
        this.usuarioTableService.insertar_usuarios(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      } else {
        // actualizar
        this.usuarioTableService.actualizar_usuarios(entidadForm.value)        
        .subscribe(data => {
          location.reload();
        });
      }
    }
  }

  catchFile(event){
    const imagen = event.target.files[0];
    //console.log(event.target.files[0]);
    this.extraerBase64(imagen).then(img => {
      //console.log(img);
      this.usuarioTableService.selectEntidad.Fotografia = img["base"];
    });
    this.archivos.push(imagen);
    //console.log(this.archivos[0]);
  }

  extraerBase64 = async($event:any) => new Promise((resolve,reject) => {
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = ()=>{
        resolve({
          base:reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base:null
        });
      };
    } catch (e) {
      return null;
    }
  })

}
