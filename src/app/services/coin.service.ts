import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private API = environment.API_URL
  currency = 'USD';
  coinID!: number;

  constructor(private http:HttpClient) { }

  onChangeCurrency(currency:string){
    this.currency = currency;
    
  }

  getAllCoins(){    
    return this.http.get<any>(`${this.API}coins/markets?vs_currency=${this.currency}`)
  }

  getTrendingCoins(){
    
    return this.http.get<any>(`${this.API}coins/markets?vs_currency=${this.currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }

  getCoinGraph(days:number){
    return this.http.get<any>(`${this.API}coins/${this.coinID}/market_chart?vs_currency=${this.currency}&days=${days}`)
  }

}
