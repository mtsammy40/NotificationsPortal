import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import Commons from 'app/sms/helpers/common.utils';
import {ApiResponse} from 'app/sms/models/ApiResponse';
import {PageProfile} from 'app/sms/models/page-profile.model';
import {RequestParams} from 'app/sms/models/RequestParams.model';
import {AppService} from '../../services/app.service';
import {ColumnMode} from '@swimlane/ngx-datatable';
import {DatePipe} from '@angular/common';

class DateOnlyPipe extends DatePipe {
    public transform(value): any {
        return super.transform(value, 'MMM d, y, h:mm:ss a');
    }
}

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
    ColumnMode: ColumnMode
    messages: any[] = [];
    requestParams: RequestParams = {
        page: 0,
        size: 15
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
        {prop: 'id'},
        {prop: 'msisdn'},
        {prop: 'status'},
        {prop: 'message'},
        {prop: 'dateCreated', pipe: new DateOnlyPipe('en-US')},
    ];

    constructor(private as: AppService) {
    }

    ngOnInit() {
        this.fetchMessages();
    }

    fetchMessages() {
        this.as.getMessages(this.requestParams).subscribe((res: ApiResponse) => {
            this.messages = res.data.content;
            this.pageProfile = Commons.extractPaginationData(res.data, this.pageProfile);
            console.log('Name -> ', this.pageProfile)
        }, (error: HttpErrorResponse) => {
            const errorMessage = error.error.message;
        });
    }

    /**
     * Populate the table with new data based on the page number
     * @param page The page to select
     */
    setPage(pageInfo) {
        this.requestParams.page = pageInfo.offset;
        this.fetchMessages();
    }
}
