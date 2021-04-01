import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { StockService } from './stock.service';
import { Stock } from './Stock';

@WebSocketGateway()
export class StockGateway {
  constructor(private stockService: StockService) {}

  @WebSocketServer() server;

  @SubscribeMessage('create-new-stock')
  handleStockEvent(@MessageBody() data: Stock): Stock {
    this.stockService.addNewStock(data);
    this.server.emit('heres-all-stocks', this.stockService.allStocks);
    return data;
  }

  @SubscribeMessage('update-stock')
  handleUpdateStockEvent(@MessageBody() data: Stock): Stock {
    this.stockService.updateStock(data);
    return data;
  }

  @SubscribeMessage('delete-stock')
  handleDeleteStockEvent(@MessageBody() data: Stock): Stock {
    this.stockService.deleteStock(data);
    return data;
  }

  @SubscribeMessage('get-all-stocks')
  handleGetStockEvent(): void {
    this.server.emit('heres-all-stocks', this.stockService.allStocks);
  }
}
