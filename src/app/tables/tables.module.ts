import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { TablesRoutingModule } from "./tables-routing.module";

import { ExtendedTableComponent } from "./extended/extended-table.component";
import { RegularTableComponent } from "./regular/regular-table.component";
import { SmartTableComponent } from "./smart-data-table/smart-data-table.component";
import { MessageListComponent } from '../sms/pages/message-list/message-list.component';
import { TransactionListComponent } from '../sms/pages/transaction-list/transaction-list.component';
import { UsersComponent } from 'app/sms/pages/users/users.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        Ng2SmartTableModule,
        NgbModule,
        NgxDatatableModule,
    ],
    declarations: [
        ExtendedTableComponent,
        RegularTableComponent,
        SmartTableComponent,
        MessageListComponent,
        TransactionListComponent,
        UsersComponent
    ]
})
export class TablesModule { }
