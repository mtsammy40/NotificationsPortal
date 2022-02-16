import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransactionListComponent } from '../sms/pages/transaction-list/transaction-list.component';
import { MessageListComponent } from '../sms/pages/message-list/message-list.component';

import { ExtendedTableComponent } from "./extended/extended-table.component";
import { RegularTableComponent } from "./regular/regular-table.component";
import { SmartTableComponent } from "./smart-data-table/smart-data-table.component";
import { UsersComponent } from 'app/sms/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
        
      {
        path: 'smart',
        component: SmartTableComponent,
        data: {
          title: 'Smart Table'
        }
      },  
      {
        path: 'extended',
        component: ExtendedTableComponent,
        data: {
          title: 'Extended Table'
        }
      },
      {
        path: 'messages',
        component: MessageListComponent,
        data: {
          title: 'Messages Page'
        }
      },

      {
        path: 'transactions',
        component: TransactionListComponent,
        data: {
          title: 'Transactions Page'
        }
      },
      {
        path: 'regular',
        component: RegularTableComponent,
        data: {
          title: 'Regular Table'
        }
      },  
      {
        path: 'users',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },   
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }
