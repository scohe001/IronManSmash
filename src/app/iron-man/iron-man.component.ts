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
    this.used = [];
    this.upNext = this.selected.slice(1);
    this.currentIndx = 0;
    this.currentFighter = this.selected[0];
  }

  public nextFighter() {
    if(this.currentIndx + 1 >= this.selected.length) { return; }

    this.currentFighter = this.selected[++this.currentIndx];
    this.used = this.selected.slice(0, this.currentIndx).reverse();
    this.upNext = this.selected.slice(this.currentIndx + 1);
  }

  public lastFighter() {
    if(this.currentIndx <= 0) { return; }

    this.currentFighter = this.selected[--this.currentIndx];
    this.used = this.selected.slice(0, this.currentIndx).reverse();
    this.upNext = this.selected.slice(this.currentIndx + 1);

  }

}
