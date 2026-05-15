import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { OrdersGridComponent } from './orders-grid/orders-grid.component';
import { NgIf } from "@angular/common";

@Component({
  imports: [OrdersGridComponent, NgIf],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  gridVisible = signal(true);

  toggleGrid(): void {
    this.gridVisible.set(!this.gridVisible());
  }
}
