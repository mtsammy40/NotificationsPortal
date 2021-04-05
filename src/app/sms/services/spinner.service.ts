import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private ngxLoadingService: NgxUiLoaderService) { }

  alert = {
    showLoader: () => {
      swal.fire('Please wait')
      swal.showLoading()
    },
    closeLoader: () => {
      if (!!swal.isVisible()) {
        swal.close();
      }
    }
  }

  ngxLoader = {
    startBackground: (loaderId: string) => {
      this.ngxLoadingService.startBackground(loaderId);
    },
    stopBackground: (loaderId: string) => {
      this.ngxLoadingService.stopBackground(loaderId)
    },
    startLoader: (loaderId: string) => {
      this.ngxLoadingService.startLoader(loaderId);
    },
    stopLoader: (loaderId: string) => {
      this.ngxLoadingService.stopLoader(loaderId);
    }
  }
}
