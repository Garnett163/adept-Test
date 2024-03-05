import './App.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCompanies } from '../../store/companySlice';
import { setEmployees } from '../../store/employeeSlice';
import Preloader from '../Preloader/Preloader';
import CompanyTable from '../CompanyTable/CompantTable';
import { companiesMockData, employeesMockData } from '../../utils/moks';
import EmployeesTable from '../EmployeesTable/EmployeesTable';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // imitation API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          dispatch(setCompanies(companiesMockData));
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTimeout(() => {
          dispatch(setEmployees(employeesMockData));
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <h1 className="main__title">Список компаний</h1>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="main__content">
          <CompanyTable
            selectedCompanies={selectedCompanies}
            setSelectedCompanies={setSelectedCompanies}
            selectAllChecked={selectAllChecked}
            setSelectAllChecked={setSelectAllChecked}
          />
          {selectedCompanies.length > 0 && <EmployeesTable selectedCompanies={selectedCompanies} />}
        </div>
      )}
    </>
  );
}

export default App;
