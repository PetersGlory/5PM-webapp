import { create } from 'zustand';

const useInvestmentStore = create((set) => ({
  investments: [],
  opportunities: [],
  activeInvestments: [],
  loading: false,
  setInvestments: (investments) => set({ investments }),
  setOpportunities: (opportunities) => set({ opportunities }),
  setActiveInvestments: (investments) => set({ activeInvestments: investments }),
  setLoading: (loading) => set({ loading }),
}));

export default useInvestmentStore;
