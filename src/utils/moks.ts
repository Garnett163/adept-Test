import { v4 as uuidv4 } from 'uuid';
export const companiesMockData = [
  { id: uuidv4(), name: 'Company A', employees: 0, address: 'Гагарина 78', selected: false },
  { id: uuidv4(), name: 'Company B', employees: 0, address: 'Московская 12', selected: false },
  { id: uuidv4(), name: 'Company C', employees: 0, address: 'Ленина 82', selected: false },
  { id: uuidv4(), name: 'Company D', employees: 0, address: 'Красноярская 66', selected: false },
  { id: uuidv4(), name: 'Company E', employees: 0, address: 'Непонятная 55', selected: false },
  { id: uuidv4(), name: 'Company F', employees: 0, address: 'Валерьянова 213', selected: false },
  // { id: uuidv4(), name: 'Company G', employees: 0, address: 'Мориса-Тореза 44', selected: false },
  // { id: uuidv4(), name: 'Company H', employees: 0, address: 'Революционная 178', selected: false },
  // { id: uuidv4(), name: 'Company I', employees: 0, address: 'Красноярская 66', selected: false },
];

export const employeesMockData = [
  { id: uuidv4(), name: 'John', lastName: 'Doe', jobTitle: 'Manager', company: 'Company A', selected: false },
  { id: uuidv4(), name: 'Jane', lastName: 'James', jobTitle: 'Developer', company: 'Company A', selected: false },
  { id: uuidv4(), name: 'Mike', lastName: 'Brown', jobTitle: 'Designer', company: 'Company A', selected: false },
  { id: uuidv4(), name: 'Sarah', lastName: 'Taylor', jobTitle: 'Designer', company: 'Company A', selected: false },
  { id: uuidv4(), name: 'David', lastName: 'Wilson', jobTitle: 'Designer', company: 'Company A', selected: false },
  { id: uuidv4(), name: 'Emily', lastName: 'Davis', jobTitle: 'Developer', company: 'Company B', selected: false },
  { id: uuidv4(), name: 'Michael', lastName: 'Miller', jobTitle: 'Developer', company: 'Company B', selected: false },
  { id: uuidv4(), name: 'Olivia', lastName: 'Wilson', jobTitle: 'Designer', company: 'Company C', selected: false },
  { id: uuidv4(), name: 'Emma', lastName: 'Taylor', jobTitle: 'Developer', company: 'Company D', selected: false },
  { id: uuidv4(), name: 'Charlotte', lastName: 'Brown', jobTitle: 'Designer', company: 'Company E', selected: false },
  { id: uuidv4(), name: 'Sophia', lastName: 'Smith', jobTitle: 'Developer', company: 'Company E', selected: false },
];
