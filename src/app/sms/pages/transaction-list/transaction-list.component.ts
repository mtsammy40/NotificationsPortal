import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'app/sms/models/ApiResponse';
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
        this.as.getTransactions().subscribe((res: ApiResponse) => {
            this.transactions = res.data.content;
            let errorMessage = res.message;
        }, (error: HttpErrorResponse) => {
          let errorMessage: string = error.error.message;
        });
    }
}
