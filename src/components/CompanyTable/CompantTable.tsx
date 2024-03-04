import './CompanyTable.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Company } from '../../types/companyType';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  toggleAllCompaniesSelection,
  toggleCompanySelection,
  addCompany,
  removeSelectedCompanies,
  updateCompany,
} from '../../store/companySlice';
import Button from '../UI/Button';
import useTogglePopup from '../../hooks/useTogglePopup';
import Modal from '../Modal/Modal';

const CompanyTable = () => {
  const { showModal, handleCloseModal, handleOpenModal } = useTogglePopup();
  const companies = useAppSelector(state => state.company);
  const dispatch = useAppDispatch();
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [newCompany, setNewCompany] = useState<Company>({
    id: '',
    name: '',
    employees: 0,
    address: '',
    selected: false,
  });
  const [editableCompany, setEditableCompany] = useState<Company | null>(null);

  function handleCheckboxChange(companyId: string) {
    dispatch(toggleCompanySelection(companyId));
  }

  function handleSelectAllChange() {
    dispatch(toggleAllCompaniesSelection());
    setSelectAllChecked(!selectAllChecked);
  }

  function handleAddCompany() {
    dispatch(addCompany(newCompany));
    setNewCompany({ id: uuidv4(), name: '', employees: 0, address: '', selected: false });
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

  return (
    <div className="company-table__container">
      <Modal
        text="Добавить компанию"
        titleModal="Создание компании"
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleOpenModal={handleOpenModal}
      ></Modal>
      {/* <Button name="Добавить компанию" handleButtonClick={handleAddCompany} /> */}
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
                  onChange={() => handleCheckboxChange(company.id)}
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
              <td className="company-table__td">{company.employees}</td>
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
};

export default CompanyTable;
