import { Component } from '@angular/core';
import { currency_list } from '../app/currencyList';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  list = currency_list

  constructor() { }

  

  title = 'currensy-converter';
  valueFrom : number = 0
  valueTo ?: number
  ccyFrom ?: string
  ccyTo ?: string

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


  onChangeSelectTo(e: any): void  {
    let param = "to"
    this.ccyTo = e.target.value
    this.loadImg(e.target, param)
  }

  calculateRevers(vinputTo: number): void {
    this.valueFrom = Number('')
    let ccyTo: string;
    if(this.ccyFrom == undefined) this.ccyFrom ="UAH" 
    if(this.ccyTo === undefined) this.ccyTo ="USH" 
    if(this.ccyTo != undefined) ccyTo = this.ccyTo
    console.log("ccyTo: " + this.ccyTo);
    console.log("ccyFrom: " + this.ccyFrom);
    console.log("vinputTo: " + vinputTo);
    if(vinputTo != null && vinputTo > 0) {
      let apiKey = 'cd2e9f6609cf7eda5f0d283c'
      let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${this.ccyFrom}`
      fetch(url).then(response => response.json()).then(result => {
          let exchangeRate = result.conversion_rates[ccyTo]
          let totalExchangeRate = (vinputTo / exchangeRate).toFixed(2)
          this.valueFrom = Number(totalExchangeRate)
          console.log(totalExchangeRate);
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
