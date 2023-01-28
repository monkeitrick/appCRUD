import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs/internal/operators/map';
import { HeroeModel } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  private URL="https://apploginfirebase-c65b0-default-rtdb.firebaseio.com/";

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel){
    // const heroeTemp = { ...heroe};

    // delete heroeTemp.id;

    return this.http.post(`${this.URL}/heroes.json`, heroe)
        .pipe(
            map((resp: any) => {
              heroe.id = resp.name;
              return heroe;
            })
        )

  }

  actualizarHeroe(heroe: HeroeModel) {

    const heroeTemp = { ...heroe};

    delete heroeTemp.id;


    return this.http.put(`${this.URL}/heroes/${heroe.id}.json`, heroeTemp);
  }

  borrarHeroe(id: string){
    return this.http.delete(`${this.URL}/heroes/${id}.json`);
  }


  private crearArray(heroesObj: object){
    const heroes: HeroeModel[] = [];

    let objHeroes: {[key: string]: any} = {}
    objHeroes = heroesObj;

    console.log(heroesObj);

    if(heroesObj === null){
      return [];
    }

    Object.keys(objHeroes).forEach(key => {
      const heroe: HeroeModel = objHeroes[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    return heroes;
    
  }

  
  getHeroes() {
    return this.http.get(`${this.URL}/heroes.json`)
      .pipe(
        map(resp => this.crearArray(resp)),
        delay(1500)
      );
  }

  getHeroe(id: string) {
    return this.http.get(`${this.URL}/heroes/${id}.json`);
  }

}
