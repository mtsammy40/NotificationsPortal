import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  alert = {
    showLoader: () => {
      swal.fire('Please wait')
      swal.showLoading()
    },
    closeLoader: () => {
      if(!!swal.isVisible()) {
        swal.close();
      }
    }
  }
}
