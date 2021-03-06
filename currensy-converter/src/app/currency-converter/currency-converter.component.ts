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

  title = 'currensy-converter';

  list : Country[] = []
  valueFrom : number = 0
  valueTo ?: number
  ccyFrom ?: string
  ccyTo ?: string

  ngOnInit(): void {
    this.getCurrencyList()
    this.currencyApiService.defaultImg();
  }

  getCurrencyList() {
    this.currencyApiService
      .getCurrencyList()
      .subscribe(list => this.list = list);
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

  calculateRevers(inputToVal: number): void {
    this.valueFrom = Number('')
    let ccyTo: string;
    if(this.ccyFrom == undefined) this.ccyFrom ="UAH" 
    if(this.ccyTo === undefined) this.ccyTo ="USH" 
    if(this.ccyTo != undefined) ccyTo = this.ccyTo
    if(inputToVal != null && inputToVal > 0) {
      this.currencyApiService
        .getReversTotalExchangeRate(inputToVal, this.ccyFrom, this.ccyTo)
          .then(valueFrom => {
            this.valueFrom = Number(valueFrom);
          }).catch(err => {
            console.log(err);
          });
    } else if( inputToVal == 0) {
      this.valueTo = Number('')
    }
  }

  calculate(inputFromVal: number = this.valueFrom): void {
    this.valueTo = Number('')
    let ccyTo: string;
    if(this.ccyFrom == undefined) this.ccyFrom ="USD" 
    if(this.ccyTo === undefined) this.ccyTo ="UAH" 
    if(this.ccyTo != undefined) ccyTo = this.ccyTo
    if(inputFromVal != null && inputFromVal > 0) {
      this.currencyApiService
        .getTotalExchangeRate(inputFromVal, this.ccyFrom, this.ccyTo)
          .then(valueTo => {
            this.valueTo = Number(valueTo);
          }).catch(err => {
            console.log(err);
          });
    } else if( inputFromVal == 0) {
      this.valueTo = Number('')
    }
  }

  changeCurrensy() {
    this.valueFrom = Number('')
    this.valueTo = Number('')

    let imgFrom = (<HTMLInputElement>document.getElementById("imgFrom"))
    let imgTagTo = (<HTMLInputElement>document.getElementById("imgTagTo"))
    var corrency__slect_from = (<HTMLInputElement>document.getElementById("corrency__slect-from"))
    var corrency__slect_to = (<HTMLInputElement>document.getElementById("corrency__slect-to"))

    var tmtCCY = corrency__slect_from.value
    corrency__slect_from.value = corrency__slect_to.value
    corrency__slect_to.value = tmtCCY
    this.ccyFrom = corrency__slect_from.value
    this.ccyTo = corrency__slect_to.value

    var temSrc = imgFrom.src
    imgFrom.src = imgTagTo.src
    imgTagTo.src = temSrc
  }

}
