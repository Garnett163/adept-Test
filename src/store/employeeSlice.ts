import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types/employeeType';

const employeesSlice = createSlice({
  name: 'employee',
  initialState: [] as Employee[],
  reducers: {
    setEmployees: (_state, action: PayloadAction<Employee[]>) => {
      return action.payload;
    },
    toggleEmployeeSelection: (state, action) => {
      const employeeId = action.payload;
      const employee = state.find(employee => employee.id === employeeId);

      if (employee) {
        employee.selected = !employee.selected;
      }
    },
    toggleAllEmployeesSelection: state => {
      const allSelected = state.every(employee => employee.selected);
      state.forEach(employee => {
        employee.selected = !allSelected;
      });
    },
    addEmployee: (state, action) => {
      const newEmployee = action.payload;
      state.push(newEmployee);
    },

    removeSelectedEmployees: state => {
      return state.filter(employee => !employee.selected);
    },
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.findIndex(employee => employee.id === updatedEmployee.id);
      if (index !== -1) {
        state[index] = updatedEmployee;
      }
    },
  },
});

export const {
  setEmployees,
  toggleEmployeeSelection,
  toggleAllEmployeesSelection,
  addEmployee,
  removeSelectedEmployees,
  updateEmployee,
} = employeesSlice.actions;

export default employeesSlice.reducer;
