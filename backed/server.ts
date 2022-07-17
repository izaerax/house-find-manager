/*
SOURCES

doc:      https://expressjs.com/it
setup:    https://blog.logrocket.com/how-to-set-up-node-typescript-express/
cors:     https://www.twilio.com/blog/add-cors-support-express-typescript-api
*/

import express, { Express, Request, Response } from 'express';
import cors from 'cors';


/***************************************
 **************** CONF *****************
 ***************************************/

const server: Express = express()

const allowedOrigins = [
  'http://localhost:4200',
  'http://localhost:3000'
];

server.use(cors({origin: allowedOrigins}))

/***************************************
 **************** URLS *****************
 ***************************************/

// const htmlPage = jQuery(jQuery.parseHTML(htmlString))
// const costPerMonthElement = htmlPage.find('.listing-detail-summary__price-postfix')
// if(costPerMonthElement.length){
//   data.costPerMonth = costPerMonthElement.html().split('&')[0]
// }
server.get('/', (req: Request, res: Response) => {
  console.log('CALLED')

  //TODO: get data from server
  res.send({
    name: 'Johan van der Keukenstraat',
    address: '1087BC',
    costPerMonth: 1300,
    deposit: 3000,
    mq: 50,
    dateCreated: new Date()
  });
});

server.listen(3000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:3000`);
});
