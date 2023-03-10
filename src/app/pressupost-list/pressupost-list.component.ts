import { Component, OnInit } from '@angular/core';
import { Servei1Service } from '../servei1.service';
import { Pressupost } from '../Interfaces';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.scss']
})
export class PressupostListComponent {
  constructor(private servei: Servei1Service) { }

  //Es declaren arrays de pressupostos
  pressupostos: Pressupost[] = this.servei.retList();
  pressupostosDisplay: Pressupost[] = this.servei.retList();
  pressupostosO: Pressupost[] = this.servei.retList();

  //Es declara preu de tots els pressupostos de la llista
  pressupostTotal: number = this.servei.presTotal();

  ngOnInit() {
    this.servei.calcPresTotal();
    this.pressupostTotal = this.servei.presTotal();
  }

  //S'obté la llista dels pressupostos i el preu total (tots dos s'imprimeixen per pantalla)
  getTotal(): void {
    this.pressupostos = this.servei.retList();
    this.pressupostosDisplay = this.servei.retList();
    this.pressupostosO = this.servei.retList();

    this.pressupostTotal = this.servei.presTotal();
  }

  //S'ordenen pressupostos alfabèticament
  ordAlfab(): void {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["pressupost"] > b["pressupost"]) { return 1; } else { return -1; } })];
  }

  //S'ordenen pressupostos per data
  ordDate(): void {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["data"] > b["data"]) { return 1; } else { return -1; } })];
  }

  //Es recupera l'ordre original
  ordOrigin(): void {
    this.pressupostosDisplay = [...this.pressupostosO];
  }

  //S'esborra la llista de pressupostos
  delList(): void {
    localStorage.removeItem("array");
    this.pressupostos = [];
    this.pressupostosDisplay = [];
    this.pressupostosO = [];
    this.servei.calcPresTotal();
    this.pressupostTotal = this.servei.presTotal();
  }

  //S'esborra un pressupost de la llista
  delPres(i: number) {
    const arr = JSON.parse(localStorage.getItem("array"));
    arr.splice(i, 1);
    localStorage.setItem("array", JSON.stringify(arr));
    this.getTotal();
    this.servei.calcPresTotal();
    this.pressupostTotal = this.servei.presTotal();
  }

  //Funció del cercador
  filterArray(event: Event): void {
    this.pressupostosDisplay = [...this.pressupostos.filter(obj => {
      if (typeof obj["pressupost"] == "string" && obj["pressupost"].includes((event.target as HTMLInputElement).value)) { return true } else { return false }
    })];

  }

}
