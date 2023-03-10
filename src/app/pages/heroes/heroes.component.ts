import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html'
})


export class HeroesComponent implements OnInit{

  heroes: HeroeModel[] = [];
  cargando: boolean = false;

  constructor(private heroesService: HeroesService){}

  ngOnInit() {
  
    this.cargando = true;
    this.heroesService.getHeroes()
      .subscribe(resp => {
        console.log(resp);
        this.heroes = resp;
        this.cargando = false;
      });
  }

  borrarHeroe(heroe: any, i: number){

    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de borrar a ${heroe.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp =>{
      if(resp.value){
        this.heroes.splice(i, 1);
        this.heroesService.borrarHeroe(heroe.id).subscribe();
      }
    });

  }
}
