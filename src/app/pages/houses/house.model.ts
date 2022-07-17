export interface House {
  name: string;
  address: string;
  costPerMonth: number;
  deposit: number;
  mq: number;
  dateCreated: Date;
  url?: string
}

export const HOUSES = [
  {name: 'Johan van der Keukenstraat', address: '1087BC', costPerMonth: 1300, deposit: 3000, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse2', address: '2456nc', costPerMonth: 1324, deposit: 3000, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse3', address: '3456nc', costPerMonth: 1324, deposit: 5000, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse4', address: '4456nc', costPerMonth: 1524, deposit: 3200, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse5', address: '5456nc', costPerMonth: 1324, deposit: 3000, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse6', address: '1456nc', costPerMonth: 1364, deposit: 3030, mq: 50, dateCreated: new Date()},
  {name: 'werkhouse7', address: '1456nc', costPerMonth: 1324, deposit: 3000, mq: 50, dateCreated: new Date()}
]
