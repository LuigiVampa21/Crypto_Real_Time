export interface Coin {

    id: string
    name:string
    // image: {large:string, small:string, thumb:string }
    image: any
    symbol:string
    current_price:number
    market_cap_rank: number
    market_data:any
    // market_cap: {current_price: number}

    description: { en: string, fr:string }
    circulating_supply?:number
    high_24h?:number
    low_24h?: number
    max_supply?: number
    price_change_24h?:number
    price_change_percentage_24h?:number
    total_supply?:number
    total_volume?:number

}