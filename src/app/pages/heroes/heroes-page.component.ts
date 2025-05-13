import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './heroes-page.component.html',
  imports:[UpperCasePipe]
})
export class HeroesPageComponent {
  name = signal('Ironman');
  age = signal(45);

  constructor() {}

  heroDescription= computed(() =>{
    const description = `${this.name()} - ${this.age()}`
    return description
  })

  capitalizedName= computed(() =>{
      return `${this.name().toUpperCase()}`
  })

  // getHeroDescription() {
  //   return `${this.name()} - ${this.age()}`;
  // }

  changeHero() {
    this.name.set('Spiderman'), this.age.set(42);
  }

  chageAge() {
    this.age.set(60);
  }
  resetForm() {
    this.name.set('Ironman'), this.age.set(45);
  }
}
