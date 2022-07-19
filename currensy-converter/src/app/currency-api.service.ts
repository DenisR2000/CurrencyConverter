import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { COUNTRIES } from '../app/currencyList';
import {Country} from './Country'

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor() { }

  apiKey: string = 'cd2e9f6609cf7eda5f0d283c'

  getCurrencyList() : Observable<Country[]> {
    return of(COUNTRIES);
  }

  defaultImg() {
    let imgFrom = (<HTMLInputElement>document.getElementById("imgFrom"))
    let urlUS =`https://countryflagsapi.com/png/US`
    imgFrom.src = urlUS
    let imgTagTo = (<HTMLInputElement>document.getElementById("imgTagTo"))
    let urlUA =`https://countryflagsapi.com/png/UA`
    imgTagTo.src = urlUA
  
  }

  async getTotalExchangeRate(inputFromVal : number, ccyFrom: string, ccyTo: string): Promise<String> {
    try {
      let url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${ccyFrom}`
      const response = await fetch(url)
      if(response.ok === true) {
        const data = await response.json();
        var exchangeRate = data.conversion_rates[ccyTo]
      } else {
        return ''
      }
    } catch(err) { 
      console.log(err);
    } finally {
      return new Promise<String>((resolve, reject) => {
        let totalExchangeRate = (inputFromVal * exchangeRate).toFixed(2)
        resolve(totalExchangeRate)
      });
    }
  }


  async getReversTotalExchangeRate(inputTo : number, ccyFrom: string, ccyTo: string): Promise<String> {
    try {
      let url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${ccyFrom}`
      const response = await fetch(url)
      if(response.ok === true) {
        const data = await response.json();
        var exchangeRate = data.conversion_rates[ccyTo]
      } else {
        return ''
      }
    } catch(err) { 
      console.log(err);
    } finally {
      return new Promise<String>((resolve, reject) => {
        let totalExchangeRate = (inputTo / exchangeRate).toFixed(2)
        resolve(totalExchangeRate)
      });
    }
  }
}
