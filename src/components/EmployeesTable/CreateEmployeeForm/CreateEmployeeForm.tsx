import './CreateEmployeeForm.css';
import { useState } from 'react';
import { Employee } from '../../../types/employeeType';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { addEmployee } from '../../../store/employeeSlice';
import Button from '../../UI/Button';

interface CreateEmployeeFormProps {
  handleCloseModal?: () => void;
}

function CreateEmployeeForm({ handleCloseModal }: CreateEmployeeFormProps) {
  const dispatch = useAppDispatch();
  const companies = useAppSelector(state => state.company);

  const [newEmpoyee, setNewEmpoyee] = useState<Employee>({
    id: uuidv4(),
    name: '',
    lastName: '',
    jobTitle: '',
    selected: false,
    company: '',
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) {
    setNewEmpoyee({ ...newEmpoyee, [field]: event.target.value });
  }
  function handleAddEmployee(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      dispatch(addEmployee(newEmpoyee));
      setNewEmpoyee({ id: uuidv4(), name: '', lastName: '', jobTitle: '', selected: false, company: '' });
      if (handleCloseModal) handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className="create-company" name="createCompany" onSubmit={handleAddEmployee}>
      <input
        className="create-company__input"
        type="text"
        placeholder="Имя"
        required
        onChange={evt => handleInputChange(evt, 'name')}
      />
      <input
        className="create-company__input"
        type="text"
        placeholder="Фамилия"
        required
        onChange={evt => handleInputChange(evt, 'lastName')}
      />
      <input
        className="create-company__input"
        type="text"
        placeholder="Должность"
        required
        onChange={evt => handleInputChange(evt, 'jobTitle')}
      />
      <select
        className="create-employee__select"
        value={newEmpoyee.company}
        onChange={evt => handleInputChange(evt, 'company')}
      >
        <option value="">Выберите компанию</option>
        {companies.map(company => (
          <option key={company.id} value={company.name}>
            {company.name}
          </option>
        ))}
      </select>
      <Button name="Создать" type="submit" />
    </form>
  );
}

export default CreateEmployeeForm;
