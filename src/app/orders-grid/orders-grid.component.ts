import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { delay, interval, Observable, of, shareReplay, tap } from 'rxjs';
import { ReactiveFormsModule } from "@angular/forms";

interface Order {
  id: number;
  customer: string;
  city: string;
  status: string;
  courier: string;
  amount: number;
  createdAt: string;
}

const ORDERS_MOCK: Order[] = [
  {
    id: 1001,
    customer: 'Acme Logistics',
    city: 'Kyiv',
    status: 'new',
    courier: 'Olena',
    amount: 1280,
    createdAt: '2026-05-11T09:20:00',
  },
  {
    id: 1002,
    customer: 'North Market',
    city: 'Lviv',
    status: 'progress',
    courier: 'Dmytro',
    amount: 740,
    createdAt: '2026-05-12T12:45:00',
  },
  {
    id: 1003,
    customer: 'Urban Foods',
    city: 'Odesa',
    status: 'done',
    courier: 'Iryna',
    amount: 2140,
    createdAt: '2026-05-12T15:30:00',
  },
  {
    id: 1004,
    customer: 'Green Shop',
    city: 'Dnipro',
    status: 'cancelled',
    courier: 'Taras',
    amount: 520,
    createdAt: '2026-05-13T08:10:00',
  },
  {
    id: 1005,
    customer: 'City Pharmacy',
    city: 'Kharkiv',
    status: 'new',
    courier: '',
    amount: 310,
    createdAt: '2026-05-13T10:05:00',
  },
  {
    id: 1006,
    customer: 'Fresh Basket',
    city: 'Kyiv',
    status: 'progress',
    courier: 'Nazar',
    amount: 1675,
    createdAt: '2026-05-14T11:15:00',
  },
];

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-orders-grid',
  templateUrl: './orders-grid.component.html',
  styleUrl: './orders-grid.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersGridComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.loadOrders();
    this.sendAnalytics();
    this.trackOrdersActivity();
  }

  private loadOrders(): void {
    this.isLoading = true;
    this.getOrders().subscribe((orders) => {
      this.orders = orders;
      this.isLoading = false;
    });
  }

  private sendAnalytics(): void {
    this.getOrders().subscribe(() => {
      console.log('Orders analytics sent');
    });
  }

  private getOrders(): Observable<Order[]> {
    return of(ORDERS_MOCK).pipe(
      tap(() => {
        console.log('Orders request executed');
      }),
      delay(600),
      shareReplay(1)
    );
  }

  private trackOrdersActivity(): void {
    interval(1000).subscribe(() => {
      console.log('Orders activity tracked');
    });
  }
}
