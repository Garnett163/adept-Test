import './EmployeesTable.css';
import { useState } from 'react';
import { Employee } from '../../types/employeeType';
import useTogglePopup from '../../hooks/useTogglePopup';
import Modal from '../Modal/Modal';
import Button from '../UI/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  updateEmployee,
  toggleEmployeeSelection,
  toggleAllEmployeesSelection,
  removeSelectedEmployees,
} from '../../store/employeeSlice';
import CreateEmployeeForm from './CreateEmployeeForm/CreateEmployeeForm';

interface EmployeesTableProps {
  selectedCompanies: string[];
}
function EmployeesTable({ selectedCompanies }: EmployeesTableProps) {
  const dispatch = useAppDispatch();
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();
  const employees = useAppSelector(state => state.employee);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [editableEmployee, setEditableEmployee] = useState<Employee | null>(null);

  const companyEmployees = employees.filter(employee => selectedCompanies.includes(employee.company));

  function handleSelectAllChange() {
    dispatch(toggleAllEmployeesSelection());
    setSelectAllChecked(!selectAllChecked);
  }
  function handleCheckboxChange(employee: Employee) {
    dispatch(toggleEmployeeSelection(employee.id));
  }

  function handleRemoveSelectedEmployees() {
    dispatch(removeSelectedEmployees());
    setSelectAllChecked(false);
  }

  function handleEditEmployee(employee: Employee) {
    setEditableEmployee(employee);
  }

  function handleSaveEmployee() {
    if (editableEmployee) {
      dispatch(updateEmployee(editableEmployee));
    }
    setEditableEmployee(null);
  }

  function handleCancelEdit() {
    setEditableEmployee(null);
  }

  return (
    <div className="employees-table__container">
      <Modal
        classBtn="company-table__createBtn"
        text="Добавить сотрудника"
        titleModal="Создание компании"
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <CreateEmployeeForm handleCloseModal={handleCloseModal} />
      </Modal>
      <Button name="Удалить сотрудника" handleButtonClick={handleRemoveSelectedEmployees} />
      <table className="employees-table">
        <thead>
          <tr>
            <th className="company-table__th">
              <label className="company-table__label">
                <input
                  className="company-table__checkbox"
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={handleSelectAllChange}
                />
                Выделить все
              </label>
            </th>
            <th className="company-table__th">Фамилия</th>
            <th className="company-table__th">Имя</th>
            <th className="company-table__th">Должность</th>
            <th className="company-table__th">Редактирование</th>
          </tr>
        </thead>
        <tbody>
          {companyEmployees.map((employee: Employee) => (
            <tr key={employee.id} className={employee.selected ? 'company-table__tr_selected' : ''}>
              <td className="company-table__td">
                <input
                  className="company-table__checkbox"
                  type="checkbox"
                  checked={employee.selected}
                  onChange={() => handleCheckboxChange(employee)}
                ></input>
              </td>
              <td className="company-table__td">
                {editableEmployee?.id === employee.id ? (
                  <input
                    className="company-table__input"
                    type="text"
                    value={editableEmployee.lastName}
                    onChange={e => setEditableEmployee({ ...editableEmployee, lastName: e.target.value })}
                  />
                ) : (
                  employee.lastName
                )}
              </td>
              <td className="company-table__td">
                {editableEmployee?.id === employee.id ? (
                  <input
                    className="company-table__input"
                    type="text"
                    value={editableEmployee.name}
                    onChange={e => setEditableEmployee({ ...editableEmployee, name: e.target.value })}
                  />
                ) : (
                  employee.name
                )}
              </td>
              <td className="company-table__td">
                {editableEmployee?.id === employee.id ? (
                  <input
                    className="company-table__input job-title__input"
                    type="text"
                    value={editableEmployee.jobTitle}
                    onChange={e => setEditableEmployee({ ...editableEmployee, jobTitle: e.target.value })}
                  />
                ) : (
                  employee.jobTitle
                )}
                <br />
                {editableEmployee?.id === employee.id ? (
                  <input
                    className="company-table__input"
                    type="text"
                    value={editableEmployee.company}
                    onChange={e => setEditableEmployee({ ...editableEmployee, company: e.target.value })}
                  />
                ) : (
                  employee.company
                )}
              </td>
              <td className="company-table__td">
                {editableEmployee?.id === employee.id ? (
                  <div className="company-table__btns">
                    <Button
                      className="company-table__saveBtn"
                      name="Сохранить"
                      handleButtonClick={handleSaveEmployee}
                    />
                    <Button className="company-table__cancelBtn" handleButtonClick={handleCancelEdit} />
                  </div>
                ) : (
                  <button className="company-table__editBtn" onClick={() => handleEditEmployee(employee)}></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesTable;
