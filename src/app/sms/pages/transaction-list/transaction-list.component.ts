import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../sms/services/app.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: [] = [];

    constructor(private as: AppService) {
    }

    ngOnInit() {
        this.fetchTransactions();
    }

    fetchTransactions() {
        this.as.getTransactions().subscribe((res: []) => {
            this.transactions = res;
        });
    }
}
