import { create } from 'zustand';

const useWalletStore = create((set) => ({
  ngnBalance: 0,
  usdBalance: 0,
  transactions: [],
  loading: false,
  setBalances: (ngn, usd) => set({ ngnBalance: ngn, usdBalance: usd }),
  setTransactions: (transactions) => set({ transactions }),
  setLoading: (loading) => set({ loading }),
}));

export default useWalletStore;
