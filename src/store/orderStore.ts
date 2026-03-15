import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type OrderStatus = 'pending' | 'accepted' | 'sharing' | 'delivered';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: string;
  otp: string;
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'otp'>) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orders: [
        {
          id: 'QK12346',
          date: 'Today, 10:30 AM',
          total: 320,
          status: 'pending',
          items: 'Milk, Bread, Eggs',
          otp: '4829',
        }
      ],
      addOrder: (orderData) => set((state) => {
        const newOrder: Order = {
          ...orderData,
          id: `QK${Math.floor(10000 + Math.random() * 90000)}`,
          date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
          status: 'pending',
          otp: Math.floor(1000 + Math.random() * 9000).toString(),
        };
        return { orders: [newOrder, ...state.orders] };
      }),
      updateOrderStatus: (id, status) => set((state) => ({
        orders: state.orders.map(o => o.id === id ? { ...o, status } : o)
      })),
    }),
    {
      name: 'order-storage',
    }
  )
);
