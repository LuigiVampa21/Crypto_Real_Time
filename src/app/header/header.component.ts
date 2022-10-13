import { Component, OnInit } from '@angular/core';
import { CoinService } from '../services/coin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedCurrency: string = 'USD';

  constructor(private coinService: CoinService) { }

  ngOnInit(): void {

  }

  sendCurrency(currency:string){
    this.coinService.onChangeCurrency(currency)
  }
}
