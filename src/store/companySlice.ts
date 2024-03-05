import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company } from '../types/companyType';

const companysSlice = createSlice({
  name: 'company',
  initialState: [] as Company[],
  reducers: {
    setCompanies: (_state, action: PayloadAction<Company[]>) => {
      return action.payload;
    },
    toggleCompanySelection: (state, action) => {
      const companyId = action.payload;
      const company = state.find(company => company.id === companyId);

      if (company) {
        company.selected = !company.selected;
      }
    },
    toggleAllCompaniesSelection: state => {
      const allSelected = state.every(company => company.selected);
      state.forEach(company => {
        company.selected = !allSelected;
      });
    },
    addCompany: (state, action) => {
      const newCompany = action.payload;
      state.push(newCompany);
    },

    removeSelectedCompanies: state => {
      return state.filter(company => !company.selected);
    },
    updateCompany: (state, action) => {
      const updatedCompany = action.payload;
      const index = state.findIndex(company => company.id === updatedCompany.id);
      if (index !== -1) {
        state[index] = updatedCompany;
      }
    },
  },
});

export const {
  setCompanies,
  toggleCompanySelection,
  toggleAllCompaniesSelection,
  addCompany,
  removeSelectedCompanies,
  updateCompany,
} = companysSlice.actions;

export default companysSlice.reducer;
