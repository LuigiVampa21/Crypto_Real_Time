import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit {

  constructor(private coinService: CoinService) { }

  ngOnInit(): void {
    // this.coinService.getAllCoins()
      // .subscribe(
      //   data => console.log(data)
        
      // )

  //     this.coinService.getTrendingCoins()
  //       .subscribe(
  //       data => console.log(data)
  //     )
  }
}
