import { Injectable } from '@angular/core';
import { Character, CHAR_LIST } from '../char_list';

@Injectable({
  providedIn: 'root'
})
export class FighterEncodingService {

  constructor() { }

  public encodeList(fighters: Character[]): string {
    ​var byteArray: Uint8Array = new Uint8Array(fighters.length + 1);
    var i: number = 0;

    byteArray[i++] = fighters.length;
    fighters.forEach(fighter => {
      byteArray[i++] = this.getFighterIndex(fighter);
    });

    console.log("Encoded: ", byteArray);
    let encodedStr: string = this.byteArrayToBase64(byteArray);
    console.log(encodedStr);

    // this.decodeList(encodedStr);
    return encodedStr;
  }

  public decodeList(encodedStr: string): Character[] {
    if(!encodedStr) { return null; }
    let byteArray: Uint8Array = Uint8Array.from(atob(encodedStr), c => c.charCodeAt(0));
    console.log("Decoded: ", byteArray);

    // Bad array
    if(byteArray.length !== byteArray[0] + 1) { return null; }
    byteArray = byteArray.slice(1); // Remove the first item
    if(byteArray.find(this.isBadByte)) { return null; }
    const unique = [...new Set(byteArray)];
    if(unique.length !== byteArray.length) { return null; }

    let fighterList: Character[] = Array.from(byteArray).map(byte => CHAR_LIST[byte]);
    console.log(fighterList);
    return fighterList;
  }

  private getFighterIndex(fighter: Character) {
    if(!CHAR_LIST.includes(fighter)) { return -1; }
    return CHAR_LIST.indexOf(fighter);
  }

  private byteArrayToBase64(byteArray: Uint8Array) {
    var binary = '';
    var len = byteArray.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( byteArray[ i ] );
    }
    return window.btoa( binary );
  }

  private isBadByte = (byte) => {
    // out of range byte
    return (byte >= CHAR_LIST.length);
  }
}
