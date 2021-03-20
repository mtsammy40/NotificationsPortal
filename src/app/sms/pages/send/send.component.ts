import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { ArrayUtils } from '../../../utils/ArrayUtils';
import { AppService } from '../../services/app.service';
import { NotificationService } from 'app/sms/services/notification.service';
import { SpinnerService } from 'app/sms/services/spinner.service';

@Component({
    selector: 'app-send',
    templateUrl: './send.component.html',
    styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {
    @ViewChildren(NgForm) forms!: QueryList<NgForm>

    phoneNumber = '';
    recipients: string[] = [];
    message = '';
    scheduleTime = '';
    phoneRegex: RegExp = new RegExp(environment.phoneNumberRegExp);
    options = {
        sendNow: 'T' // for true
    };
    entryMode = 'INPUT'; // OR 'FILE'
    showDatePicker = false;
    file: {
        payload: FormData,
        file: File
    } = { payload: null, file: null }

    constructor(private as: AppService, private ns: NotificationService, private ss: SpinnerService) {
    }

    ngOnInit() {
    }

    pushToRecipients(form: NgForm) {
        const phoneNumbers = this.phoneNumber.split(',');
        phoneNumbers.forEach((pn) => {
            // remove whitespaces
            pn.trim();
            // test if valid
            if (!this.phoneRegex.test(pn)) {
                alert('Invalid phone number -> ' + pn);
            } else {
                // push to recipients
                this.recipients.push(pn);
            }
        });
        form.resetForm();
    }

    removePhoneNumber(number: string) {
        ArrayUtils.removeItemOnce(this.recipients, number);
    }

    post() {
        console.log('entry point ', this.entryMode);
        if (this.entryMode === 'INPUT') {
            const payload = {
                phoneNumberList: this.recipients,
                message: this.message,
                scheduleTime: this.options.sendNow === 'F' ? this.scheduleTime : null
            };
            this.ss.alert.showLoader();
            this.as.postMessage(payload)
                .subscribe((res) => {
                    if (res) {
                        this.ns.alerts.success("Message(s) posted!");
                        this.clearForms();
                        this.recipients = [];
                    }
                }, error => {
                    this.ns.alerts.error("Error posting message(s)");
                });
        } else {
            this.postFile();
        }

    }

    postFile() {
        this.ss.alert.showLoader();
        this.as.postMessageFile(this.file.payload)
            .subscribe((res) => {
                if (res) {
                    this.ns.alerts.success("Message File posted!");
                    this.clearForms();
                    this.recipients = [];
                }
            }, error => {
                this.ns.alerts.error("Error posting message(s)");
            })
    }
    clearForms() {
        this.forms.forEach(form => form.resetForm());
    }

    isFileValid(file: File): boolean {
        if (!file) {
            return;
        }
        const acceptedExtensions = ['csv'];
        const extension = file.name.split('.').pop();
        console.log('Exts ... ', extension);
        if (acceptedExtensions.indexOf(extension) > -1) {
            console.log('File extension ok');
            return true;
        } else {
            return false;
        }
    }

    validateFile(fileEvent: Event) {
        console.log('We got this: ', fileEvent);
        const fileInput: any = fileEvent.target;
        let file = fileInput.files[0];

        if (this.isFileValid(file)) {
            // File valid
            this.file.payload = this.createFilePayload(file);
            this.file.file = file;
        } else {
            // File invalid
            alert('File invalid');
            file = null;
        }
    }
    createFilePayload(file: File): FormData {
        const payload: FormData = new FormData();
        payload.append('file', file);
        payload.append('transactionType', 'MESSAGE');
        return payload;
    }
}
