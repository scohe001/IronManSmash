import { Component, OnInit } from '@angular/core';
import { Character, CHAR_LIST } from '../char_list';
import { ActivatedRoute, Router } from '@angular/router';
import { FighterEncodingService } from '../services/fighter-encoding.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-iron-man',
  templateUrl: './iron-man.component.html',
  styleUrls: ['./iron-man.component.css']
})
export class IronManComponent implements OnInit {

  public selected: Character[] = [];
  public used: Character[] = [];
  public upNext: Character[] = [];

  public currentFighter: Character = null;
  public currentIndx: number = 0;

  public encodedFighters: string = "";

  private readonly ENCODED_FIGHTERS: string = "__CURRENT_ENCODED_FIGHTER_STRING__";
  private readonly LAST_FIGHTER_INDEX: string = "__LAST_FIGHTER_INDEX__";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fighterEncodingManager: FighterEncodingService,
    public commonManager: CommonService,
  ) { }

  ngOnInit() {
    this.encodedFighters = this.route.snapshot.paramMap.get('fighterlist');

    let decodedFighters: Character[] = this.fighterEncodingManager.decodeList(this.encodedFighters); 
    // If we got a bad string, redirect back home
    if(!decodedFighters) {
      this.router.navigate(['/']);
    }
    this.selected = decodedFighters;

    if(!this.loadLastIndexIfPossible()) {
      this.updateDataWithIndex(0);
    }
  }

  private loadLastIndexIfPossible() {
    let lastEncodedStr: string = localStorage.getItem(this.ENCODED_FIGHTERS);
    let lastFighterIndx: string = localStorage.getItem(this.LAST_FIGHTER_INDEX);

    if(!lastEncodedStr || !lastFighterIndx || lastEncodedStr !== this.encodedFighters || !(/^([0-9]+)$/.test(lastFighterIndx))) {
      return false;
    }

    this.updateDataWithIndex((new Number(lastFighterIndx)).valueOf());
    return true;
  }

  public nextFighter() {
    if(this.currentIndx + 1 >= this.selected.length) { return; }
    this.updateDataWithIndex(this.currentIndx + 1);
  }

  public lastFighter() {
    if(this.currentIndx <= 0) { return; }
    this.updateDataWithIndex(this.currentIndx - 1);
  }

  private updateDataWithIndex(indx: number) {
    localStorage.setItem(this.ENCODED_FIGHTERS, this.encodedFighters);
    localStorage.setItem(this.LAST_FIGHTER_INDEX, indx.toString());

    this.currentIndx = indx;
    this.currentFighter = this.selected[this.currentIndx];
    this.used = this.selected.slice(0, this.currentIndx).reverse();
    this.upNext = this.selected.slice(this.currentIndx + 1);

  }

}
