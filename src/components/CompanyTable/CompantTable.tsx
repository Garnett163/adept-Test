import './CompanyTable.css';
import { useState, useEffect } from 'react';
import { Company } from '../../types/companyType';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  toggleAllCompaniesSelection,
  toggleCompanySelection,
  removeSelectedCompanies,
  updateCompany,
} from '../../store/companySlice';
import Button from '../UI/Button';
import useTogglePopup from '../../hooks/useTogglePopup';
import Modal from '../Modal/Modal';
import CreateCompanyForm from './CreateCompanyForm/CreateCompanyForm';

interface CompanyTableProps {
  selectedCompanies: string[];
  setSelectedCompanies: React.Dispatch<React.SetStateAction<string[]>>;
  selectAllChecked: boolean;
  setSelectAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function CompanyTable({
  selectedCompanies,
  setSelectedCompanies,
  selectAllChecked,
  setSelectAllChecked,
}: CompanyTableProps) {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();
  const companies = useAppSelector(state => state.company);
  const employees = useAppSelector(state => state.employee);

  const dispatch = useAppDispatch();
  const [editableCompany, setEditableCompany] = useState<Company | null>(null);

  function handleCheckboxChange(company: Company) {
    const updatedSelectedCompanies = company.selected
      ? selectedCompanies.filter(selectedCompany => selectedCompany !== company.name)
      : [...selectedCompanies, company.name];

    dispatch(toggleCompanySelection(company.id));
    setSelectedCompanies(updatedSelectedCompanies);
  }

  function handleSelectAllChange() {
    dispatch(toggleAllCompaniesSelection());
    setSelectAllChecked(!selectAllChecked);
    if (!selectAllChecked) {
      setSelectedCompanies(companies.map(company => company.name));
    } else {
      setSelectedCompanies([]);
    }
  }

  function handleRemoveSelectedCompanies() {
    dispatch(removeSelectedCompanies());
    setSelectAllChecked(false);
  }

  function handleEditCompany(company: Company) {
    setEditableCompany(company);
  }

  function handleSaveCompany() {
    if (editableCompany) {
      dispatch(updateCompany(editableCompany));
    }
    setEditableCompany(null);
  }

  function handleCancelEdit() {
    setEditableCompany(null);
  }

  useEffect(() => {
    const allSelected = companies.every(company => company.selected);
    setSelectAllChecked(allSelected);
  }, [companies, selectedCompanies, setSelectAllChecked]);

  return (
    <div className="company-table__container">
      <Modal
        classBtn="company-table__createBtn"
        text="Добавить компанию"
        titleModal="Создание компании"
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      >
        <CreateCompanyForm handleCloseModal={handleCloseModal} />
      </Modal>
      <Button name="Удалить компанию" handleButtonClick={handleRemoveSelectedCompanies} />
      <table className="company-table">
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
            <th className="company-table__th">Название компании</th>
            <th className="company-table__th">Кол-во сотрудников</th>
            <th className="company-table__th">Адрес</th>
            <th className="company-table__th">Редактирование</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company: Company) => (
            <tr key={company.id} className={company.selected ? 'company-table__tr_selected' : ''}>
              <td className="company-table__td">
                <input
                  className="company-table__checkbox"
                  type="checkbox"
                  checked={company.selected}
                  onChange={() => handleCheckboxChange(company)}
                />
              </td>
              <td className="company-table__td">
                {editableCompany?.id === company.id ? (
                  <input
                    className="company-table__input"
                    type="text"
                    value={editableCompany.name}
                    onChange={e => setEditableCompany({ ...editableCompany, name: e.target.value })}
                  />
                ) : (
                  company.name
                )}
              </td>
              <td className="company-table__td">
                {employees.filter(employee => employee.company === company.name).length}
              </td>
              <td className="company-table__td">
                {editableCompany?.id === company.id ? (
                  <input
                    className="company-table__input"
                    type="text"
                    value={editableCompany.address}
                    onChange={e => setEditableCompany({ ...editableCompany, address: e.target.value })}
                  />
                ) : (
                  company.address
                )}
              </td>
              <td className="company-table__td">
                {editableCompany?.id === company.id ? (
                  <div className="company-table__btns">
                    <Button className="company-table__saveBtn" name="Сохранить" handleButtonClick={handleSaveCompany} />
                    <Button className="company-table__cancelBtn" handleButtonClick={handleCancelEdit} />
                  </div>
                ) : (
                  <button className="company-table__editBtn" onClick={() => handleEditCompany(company)}></button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyTable;
