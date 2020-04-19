import { Component, OnInit } from '@angular/core';
import { Character, CHAR_LIST } from '../char_list';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  fighters: Character[] = CHAR_LIST.slice();
  selected: Character[] = [];

  filterVal: string = "";

  constructor() { }

  ngOnInit() {
    console.log(this.fighters);
  }

  public fighterClicked(fighter: Character) {
    if(!this.isSelected(fighter)) {
      this.selected.push(fighter);
      console.log("Added!");
    } else {
      let indx = this.selected.indexOf(fighter);
      this.selected.splice(indx, 1);
      console.log("Removed!");
    }
    console.log("Clicked!", this.selected);
  }

  public isSelected(fighter: Character): boolean {
    return this.selected.includes(fighter);
  }

  public clearSelection() {
    this.filterVal = "";
    this.applyFilter();
  }

  public selectAll() {
    this.selected = CHAR_LIST.slice();
  }

  public applyFilter() {
    console.log("Applying filter! With: ", this.filterVal);

    if(!this.filterVal) {
      this.filterVal = "";
      this.fighters = CHAR_LIST.slice();
      return;
    }

    let clean_fitler_val: string = this.filterVal.trim().toLocaleLowerCase();
    this.fighters = CHAR_LIST.filter(fighter => fighter.name.toLocaleLowerCase().includes(clean_fitler_val));
  }

  public selectedStr() {
    return this.selected.map(fighter => this.toTitleCase(fighter.name)).sort().join(", ");
  }

  private toTitleCase(str: string) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  public checkClicked(event: MouseEvent, fighter: Character) {
    event.preventDefault(); // Prevent user from interacting with checkbox directly
  }

}
