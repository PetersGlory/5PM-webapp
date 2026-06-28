import { create } from 'zustand';

const useWalletStore = create((set) => ({
  ngnBalance: 0,
  usdBalance: 0,
  usdtBalance: 0,
  transactions: [],
  loading: false,
  setBalances: (ngn, usd, usdt = 0) => set({ ngnBalance: ngn, usdBalance: usd, usdtBalance: usdt }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ loading }),
}));

export default useWalletStore;
