import {Component, OnInit} from '@angular/core';
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
        this.as.getMessages().subscribe((res: []) => {
            this.messages = res;
        });
    }
}
