import { HttpErrorResponse } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { ApiResponse } from 'app/sms/models/ApiResponse';
import {AppService} from '../../services/app.service';

@Component({
    selector: 'app-message-list',
    templateUrl: './message-list.component.html',
    styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {

    messages: [] = [];

    constructor(private as: AppService) {
    }

    ngOnInit() {
        this.fetchMessages();
    }

    fetchMessages() {
        this.as.getMessages().subscribe((res: ApiResponse) => {
            this.messages = res.data.content;
            let errorMessage = res.message;
        }, (error: HttpErrorResponse) => {
            let errorMessage = error.error.message;
        });
    }
}
