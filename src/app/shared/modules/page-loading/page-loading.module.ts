import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageLoadingComponent } from './page-loading.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [PageLoadingComponent],
    exports: [PageLoadingComponent]
})
export class PageLoadingModule {}
