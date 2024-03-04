import { v4 as uuidv4 } from 'uuid';
export const companiesMockData = [
  { id: uuidv4(), name: 'Company A', employees: 10, address: 'Гагарина 78', selected: false },
  { id: uuidv4(), name: 'Company B', employees: 15, address: 'Московская 12', selected: false },
  { id: uuidv4(), name: 'Company C', employees: 20, address: 'Ленина 82', selected: false },
  { id: uuidv4(), name: 'Company D', employees: 25, address: 'Красноярская 66', selected: false },
  { id: uuidv4(), name: 'Company E', employees: 17, address: 'Непонятная 55', selected: false },
  { id: uuidv4(), name: 'Company F', employees: 35, address: 'Валерьянова 213', selected: false },
  { id: uuidv4(), name: 'Company G', employees: 24, address: 'Мориса-Тореза 44', selected: false },
  { id: uuidv4(), name: 'Company H', employees: 47, address: 'Революционная 178', selected: false },
];
