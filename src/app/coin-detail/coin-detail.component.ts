import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Coin } from '../models/coin.model';
import { CoinService } from '../services/coin.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit, OnDestroy {

  currency = 'USD'
  id!:string;
  coin!:Coin;
  coinSub = new Subscription();
  constructor(private coinService: CoinService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params)=>{
        this.id = params['id']
      this.coinSub =  this.coinService.getSingleCoin(this.id)
          .subscribe(coin => {
            this.coin = coin;
            console.log(this.coin);
            
          })
        
      })
    
  }

  ngOnDestroy(){
    this.coinSub.unsubscribe();
  }

}
