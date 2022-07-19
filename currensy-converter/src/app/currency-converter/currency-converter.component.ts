import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../currency-api.service'
import { Country } from '../Country'
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {

  constructor(private currencyApiService: CurrencyApiService) { }

  list : Country[] = []
  title = 'currensy-converter';
  valueFrom : number = 0
  valueTo ?: number
  ccyFrom ?: string
  ccyTo ?: string

  ngOnInit(): void {
    this.getCurrencyList()
  }

  getCurrencyList() {
    this.list = this.currencyApiService.getCurrencyList();
  }

  onChangeInputFrom(e: any): void {
    this.valueFrom = e.target.value
    this.calculate(e.target.value)
  }

  onChangeInputTo(e: any) {
    this.valueTo = e.target.value
    this.calculateRevers(e.target.value)
  }

  onChangeSelectFrom(e: any): void  {
    let param = "frmo"
    this.ccyFrom = e.target.value
    this.loadImg(e.target, param)
  }

  onChangeSelectTo(e: any): void  {
    let param = "to"
    this.ccyTo = e.target.value
    this.loadImg(e.target, param)
  }

  loadImg(target: any, param:  string ) {
    for (let i = 0; i < this.list.length; i++) {
      const element = this.list[i];
      if(element.ccy == target.value) { 
        let currensyImage = document.querySelector('img')
        let url =`https://countryflagsapi.com/png/${element.tag}`
        if(param === "frmo") {
          let el = (<HTMLInputElement>document.getElementById("imgFrom"))
          el.src = url
        } else if(param === "to") {
          let el = (<HTMLInputElement>document.getElementById("imgTagTo"))
          el.src = url
        } 
      }
    }
  }

  calculateRevers(vinputTo: number): void {
    this.valueFrom = Number('')
    let ccyTo: string;
    if(this.ccyFrom == undefined) this.ccyFrom ="UAH" 
    if(this.ccyTo === undefined) this.ccyTo ="USH" 
    if(this.ccyTo != undefined) ccyTo = this.ccyTo
    if(vinputTo != null && vinputTo > 0) {
      let apiKey = 'cd2e9f6609cf7eda5f0d283c'
      let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.ccyFrom}`
      fetch(url).then(response => response.json()).then(result => {
          let exchangeRate = result.conversion_rates[ccyTo]
          let totalExchangeRate = (vinputTo / exchangeRate).toFixed(2)
          this.valueFrom = Number(totalExchangeRate)
      })
    } else if( vinputTo == 0) {
      this.valueTo = Number('')
    }
  }

  calculate(vinputFromVal: number = this.valueFrom): void {
    this.valueTo = Number('')
    let ccyTo: string;
    if(this.ccyFrom == undefined) this.ccyFrom ="USD" 
    if(this.ccyTo === undefined) this.ccyTo ="UAH" 
    if(this.ccyTo != undefined) ccyTo = this.ccyTo
    
    if(vinputFromVal != null && vinputFromVal > 0) {
      let apiKey = 'cd2e9f6609cf7eda5f0d283c'
      let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.ccyFrom}`
      fetch(url).then(response => response.json()).then(result => {
          let exchangeRate = result.conversion_rates[ccyTo]
          let totalExchangeRate = (vinputFromVal * exchangeRate).toFixed(2)
          this.valueTo = Number(totalExchangeRate)
      })
    } else if( vinputFromVal == 0) {
      this.valueTo = Number('')
    }
  }

  changeCurrensy() {

  }

}
