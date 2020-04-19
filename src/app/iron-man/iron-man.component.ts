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
  }

}
