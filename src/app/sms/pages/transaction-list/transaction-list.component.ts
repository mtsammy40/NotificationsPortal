import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiResponse } from 'app/sms/models/ApiResponse';
import { AppService } from '../../../sms/services/app.service';
import {RequestParams, SearchRequestParams} from '../../models/RequestParams.model';
import {PageProfile} from '../../models/page-profile.model';
import Commons from '../../helpers/common.utils';
import {SortDirection} from '@swimlane/ngx-datatable';
import {SortDirectionEnum} from '../../../utils/sort-direction.enum';
import {DatePipe} from '@angular/common';

class DateOnlyPipe extends DatePipe {
    public transform(value): any {
        return super.transform(value, 'MMM d, y, h:mm:ss a');
    }
}

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {

  transactions: [] = [];
    requestParams: SearchRequestParams = {
        page: 0,
        size: 15,
        sortBy: 'transactionDate',
        sortDir: SortDirectionEnum.ASC
    };
    pageProfile: PageProfile = {
        pageNumber: 0,
        pageSize: 0,
        totalPages: 0,
        totalElements: 0,
        last: false,
        first: false
    };
    columns: any[] = [
        {prop: 'rowNum'},
        {prop: 'amount'},
        {prop: 'fullName'},
        {prop: 'status'},
        {prop: 'transactionType'},
        {prop: 'mpesaRefId'},
        {prop: 'transactionDate', pipe: new DateOnlyPipe('en-US')},
    ];

    constructor(private as: AppService) {
    }

    ngOnInit() {
        this.fetchTransactions();
    }

    fetchTransactions() {
        this.as.getTransactions(this.requestParams).subscribe((res: ApiResponse) => {
            this.transactions = res.data.content;
            this.pageProfile = Commons.extractPaginationData(res.data, this.pageProfile);
        }, (error: HttpErrorResponse) => {
          const errorMessage: string = error.error.message;
        });
    }

    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo) {
        this.requestParams.page = pageInfo.offset;
        this.fetchTransactions();
    }
}
