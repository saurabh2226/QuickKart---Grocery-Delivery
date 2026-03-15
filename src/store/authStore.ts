import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'customer' | 'admin' | 'delivery' | 'shop_owner';

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  walletBalance: number;
  transactions?: Transaction[];
}

interface AuthState {
  user: User | null;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setGuest: (isGuest: boolean) => void;
  logout: () => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isGuest: false,
      setUser: (user) => set({ user, isGuest: false }),
      setGuest: (isGuest) => set({ isGuest, user: null }),
      logout: () => set({ user: null, isGuest: false }),
      addTransaction: (txn) => set((state) => {
        if (!state.user) return state;
        const newTxn: Transaction = {
          ...txn,
          id: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }),
        };
        const newBalance = txn.type === 'credit' 
          ? state.user.walletBalance + txn.amount 
          : state.user.walletBalance - txn.amount;
          
        return {
          user: {
            ...state.user,
            walletBalance: newBalance,
            transactions: [newTxn, ...(state.user.transactions || [])],
          }
        };
      }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
