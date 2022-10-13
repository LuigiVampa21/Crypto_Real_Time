import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selectedCurrency: string = 'USD'
  constructor() { }

  ngOnInit(): void {
  }

  sendCurrency(currency:string){
    console.log(currency);
    
  }
}
