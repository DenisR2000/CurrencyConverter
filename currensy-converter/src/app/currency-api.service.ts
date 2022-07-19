import { Injectable } from '@angular/core';
import { COUNTRIES } from '../app/currencyList';
import {Country} from './Country'

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor() { }

  getCurrencyList() : Country[] {
    return COUNTRIES;
  }
}
