import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  alerts = {
    success: (message, title?) => {
      title = title ? title : "Success";
      swal.fire(title, message, "success");
    },
    error: (message, title?) => {
      title = title ? title : "Error!";
      swal.fire(title, message, "error");
    }
  }
}
