import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Coin } from '../models/coin.model';



@Injectable({
  providedIn: 'root'
})
export class CoinService {

  private API = environment.API_URL
  currency = 'USD';
  currency$ = new Subject<string>()
  coinID!: number;


  constructor(private http:HttpClient) { }

  onChangeCurrency(currency:string){
    this.currency = currency;
    
  }

  getAllCoins(){
    this.currency$.next(this.currency)    
    return this.http.get<Coin[]>(`${this.API}coins/markets?vs_currency=${this.currency}`)
  }

  getTrendingCoins(){
    this.currency$.next(this.currency)    
    return this.http.get<Coin[]>(`${this.API}coins/markets?vs_currency=${this.currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }

  getCoinGraph(days:number,coinID:string){
    this.currency$.next(this.currency)    
    return this.http.get<any>(`${this.API}coins/${coinID}/market_chart?vs_currency=${this.currency}&days=${days}`)
  }

  getSingleCoin(coinID:string){
    this.currency$.next(this.currency)
    return this.http.get<Coin>(`${this.API}coins/${coinID}`)

  }

}
