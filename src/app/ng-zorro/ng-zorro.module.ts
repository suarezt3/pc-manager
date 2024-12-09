import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';



@NgModule({
  imports: [
    CommonModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule
  ],
  exports: [
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule
  ],
})
export class NgZorroModule { }
