import { Component, OnInit } from '@angular/core';
import { Character, CHAR_LIST } from '../char_list';
import { FighterEncodingService } from '../services/fighter-encoding.service';
import { Router } from '@angular/router';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-character-selection',
  templateUrl: './character-selection.component.html',
  styleUrls: ['./character-selection.component.css']
})
export class CharacterSelectionComponent implements OnInit {
  fighters: Character[] = CHAR_LIST.slice();
  selected: Character[] = [];
  mousedOver: Character[] = [];

  filterVal: string = "";
  codeVal: string = "";
  randomSetNum: number = 15;

  constructor(
    private router: Router,
    private fighterEncodingManager: FighterEncodingService,
    private commonManager: CommonService,
  ) { }

  ngOnInit() {
    console.log(this.fighters);
  }

  public fighterClicked(fighter: Character) {
    if(!this.isSelected(fighter)) {
      this.selected.push(fighter);
      // console.log("Added!");
    } else {
      let indx = this.selected.indexOf(fighter);
      this.selected.splice(indx, 1);
      // console.log("Removed!");
    }
    // console.log("Clicked!", this.selected);
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

  public selectRandom() {
    if(this.randomSetNum <= 0) {
      return;
    }

    this.selectAll(); // Give selected all characters
    this.selected = this.commonManager.shuffle(this.selected); // shuffle
    this.selected = this.selected.slice(0, this.randomSetNum); // Take first set num of them
    this.readyClicked(); // Go!
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
    return this.selected.map(fighter => this.commonManager.toTitleCase(fighter.name)).sort().join(", ");
  }

  public checkClicked(event: MouseEvent, fighter: Character) {
    event.preventDefault(); // Prevent user from interacting with checkbox directly
  }

  public buttonMousedOver(fighter: Character, isMouseIn: boolean) {
    if(isMouseIn && !this.isMousedOver(fighter)) {
      this.mousedOver.push(fighter);
    } else if(!isMouseIn && this.isMousedOver(fighter)) {
      let indx = this.mousedOver.indexOf(fighter);
      this.mousedOver.splice(indx, 1);
    }
  }

  public isMousedOver(fighter: Character): boolean {
    return this.mousedOver.includes(fighter);
  }

  public readyClicked() {
    let shuffledFighters = this.commonManager.shuffle(this.selected);
    let encodedFighters: string = this.fighterEncodingManager.encodeList(shuffledFighters);
    this.router.navigate(['/IronMan', encodedFighters]);
  }

  public goWithCode() {
    console.log(this.codeVal);
    if(!this.fighterEncodingManager.decodeList(this.codeVal)) {
      alert("ERROR: Bad Code");
      return;
    }

    this.router.navigate(['/IronMan', this.codeVal]);
  }
}
