import './CreateCompanyForm.css';
import { useState } from 'react';
import { Company } from '../../../types/companyType';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch } from '../../../hooks/redux';
import { addCompany } from '../../../store/companySlice';
import Button from '../../UI/Button';

interface CreateCompanyFormProps {
  handleCloseModal?: () => void;
}

function CreateCompanyForm({ handleCloseModal }: CreateCompanyFormProps) {
  const dispatch = useAppDispatch();
  const [newCompany, setNewCompany] = useState<Company>({
    id: uuidv4(),
    name: '',
    employees: 0,
    address: '',
    selected: false,
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, field: string) {
    setNewCompany({ ...newCompany, [field]: event.target.value });
  }

  function handleAddCompany(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      dispatch(addCompany(newCompany));
      setNewCompany({ id: uuidv4(), name: '', employees: 0, address: '', selected: false });
      if (handleCloseModal) handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className="create-company" name="createCompany" onSubmit={handleAddCompany}>
      <input
        className="create-company__input"
        type="text"
        placeholder="Название"
        required
        onChange={e => handleInputChange(e, 'name')}
      />
      <input
        className="create-company__input"
        type="number"
        placeholder="Количество сотрудников"
        required
        onChange={e => handleInputChange(e, 'employees')}
      />
      <input
        className="create-company__input"
        type="text"
        placeholder="Адрес"
        required
        onChange={e => handleInputChange(e, 'address')}
      />
      <Button name="Создать" type="submit" />
    </form>
  );
}

export default CreateCompanyForm;
