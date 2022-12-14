import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Coin } from '../models/coin.model';
import { CoinService } from '../services/coin.service';
import { Subscription } from 'rxjs';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.scss']
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  
  @ViewChild(BaseChartDirective) myLineChart !: BaseChartDirective;
  currency = 'USD';
  id!:string;
  coin!:Coin;
  coinSub = new Subscription();
  days = 1;
  currencyObs = new Subscription(); 

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: `Price Trends`,
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',

      }
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';

  
  constructor(private coinService: CoinService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
    .subscribe((params: Params)=>{
      this.id = params['id']

    this.initSingleCoin()
    this.initGraph(this.currency)
    
      
      this.currencyObs = this.coinService.onGetCurrency()
      .subscribe(c => {
        this.currency = c;   
        this.initSingleCoin()
        this.initGraph(this.currency)
      })
     
      })
    
  }

  ngOnDestroy(){
    this.coinSub.unsubscribe();
    this.currencyObs.unsubscribe();
  }

  onChangeDays(days:number){
    this.days = days;
    this.initGraph(this.currency);
  }

  initSingleCoin(){
    this.coinSub =  this.coinService.getSingleCoin(this.id, this.currency)
          .subscribe(coin => {
              this.coin = coin;
            })
  }

  initGraph(currency:string){
    this.coinSub = this.coinService.getCoinGraph(this.days, this.id, currency)
      .subscribe( graph => {
        setTimeout(() => {
          this.myLineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = graph.prices.map(
            (a:[time:number,price:number][]) => {
                return a[1]
            });
        this.lineChartData.labels = graph.prices.map(
            (a:any) => {
              let date = new Date(a[0]);
              let time = date.getHours() > 12 ?
                `${date.getHours() - 12}: ${date.getMinutes()} PM` :
                `${date.getHours()}: ${date.getMinutes()} AM`

                return this.days === 1 ? time : date.toLocaleDateString(); 
          })
       }
     )
   }
}
