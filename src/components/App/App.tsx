import './App.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { setCompanies } from '../../store/companySlice';
import Preloader from '../Preloader/Preloader';
import CompanyTable from '../CompanyTable/CompantTable';
import { companiesMockData } from '../../utils/moks';

function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <>
      <h1 className="main__title">Список компаний</h1>
      {isLoading ? <Preloader /> : <CompanyTable />}
    </>
  );
}

export default App;
