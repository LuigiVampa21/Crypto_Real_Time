import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Coin } from '../models/coin.model';
import { CoinService } from '../services/coin.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit, OnDestroy {

  trendingCoins:Coin[]= [];
  coins:Coin[]= [];
  currency!:string;
  coinSub = new Subscription();

  constructor(private coinService: CoinService) { }

  ngOnInit(): void {

    this.coinService.currency$
      .subscribe((c:string) => {
        this.currency = c
      })

    //this.coinSub = this.coinService.getAllCoins()
    //   .subscribe(
    //     data => {
    //       this.coins = data;          
    //     }
        
    //   )

      // this.coinSub =  this.coinService.getTrendingCoins()
      //   .subscribe(
      //   (data:Coin[]) => {
      //     this.trendingCoins = data;          
      //   }
      // )
  }

  ngOnDestroy(){
    this.coinSub.unsubscribe()
  }


  onGetSignleCoin(id:string){
    this.coinService.getSingleCoin(id)
  }
}
