import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [CardsComponent],
    exports: [CardsComponent]
})
export class CardsgModule {}
