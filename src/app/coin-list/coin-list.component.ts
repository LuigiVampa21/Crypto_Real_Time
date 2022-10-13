import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Coin } from '../models/coin.model';
import { CoinService } from '../services/coin.service';


@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrls: ['./coin-list.component.scss']
})
export class CoinListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  dataSource!: MatTableDataSource<Coin>;
  trendingCoins:Coin[]= [];
  // coins:Coin[]= [];
  currency!:string;
  coinSub = new Subscription();

  constructor(private coinService: CoinService) { }

  ngOnInit(): void {

    this.coinService.currency$
      .subscribe((c:string) => {
        this.currency = c
      })

    this.coinSub = this.coinService.getAllCoins()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator= this.paginator;
          this.dataSource.sort = this.sort;       
        }
        
      )

      // this.coinSub =  this.coinService.getTrendingCoins()
      //   .subscribe(
      //   (data:Coin[]) => {
      //     this.trendingCoins = data;          
      //   }
      // )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(){
    // this.coinSub.unsubscribe()
  }


  onGetSignleCoin(id:string){
    this.coinService.getSingleCoin(id)
  }
}
