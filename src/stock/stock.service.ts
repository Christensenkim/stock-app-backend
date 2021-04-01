import { Injectable } from '@nestjs/common';
import { Stock } from './Stock';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StockService {
  allStocks: Stock[] = [];

  addNewStock(stock: Stock): Stock {
    const newStock: Stock = {
      id: uuidv4(),
      name: stock.name,
      description: stock.description,
      value: stock.value,
    };
    this.allStocks.push(newStock);
    console.log(this.allStocks);
    return newStock;
  }

  updateStock(data: Stock) {
    const oldStock = this.allStocks.findIndex((a) => a.id === data.id);
    this.allStocks[oldStock] = data;
  }

  deleteStock(data: Stock) {
    this.allStocks = this.allStocks.filter((obj) => obj.id !== data.id);
  }
}
