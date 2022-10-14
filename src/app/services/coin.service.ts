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
  currency$ = new Subject<string>()
  coinID!: number;


  constructor(private http:HttpClient) { }

  onChangeCurrency(currency:string){
    this.currency$.next(currency)    
  }
  
  onGetCurrency(){
    return this.currency$.asObservable();
  }

  getAllCoins(currency: string){
    return this.http.get<Coin[]>(`${this.API}coins/markets?vs_currency=${currency}`)
  }

  getTrendingCoins(currency: string){
    return this.http.get<Coin[]>(`${this.API}coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
  }

  getCoinGraph(days:number,coinID:string, currency: string){
    return this.http.get<any>(`${this.API}coins/${coinID}/market_chart?vs_currency=${currency}&days=${days}`)
  }

  getSingleCoin(coinID:string, currency: string){
    return this.http.get<Coin>(`${this.API}coins/${coinID}`)

  }

}
