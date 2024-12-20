


# Shipments


## Running locally 



In the project root, you can run

###  `docker-compose build`


followed by 

###  `docker-compose up`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Architecture

The mini-project is split in two the backend is a simple php powered api erved on apache that handles a GET HTTP request for data stored in a local sqlite database. 

There's a database seeder which gets run when the app initialises to seed the SQLite DB with Shipment data

The frontend is a [React.js](https://react.dev/)  driven frontend, hosted on a lightweight nginx image, with two main components a table for overall data view and a chart for data visualisation related to shipment status.

Connected logic is maintained in the modules folder. this component talks to the store/api and handles loading and error based logic relevant to the child components for data.

The child components are data driven and rendered when required data is available to them. They would be easy to test for this reason. 


#### Data Seeding

the app should seed the db on first load in a new environment (Database is local only using SQLite). to test it you can replace the GET endpoints query with that defined [here]: https://github.com/ColmKenefick/shipments/blob/445f1f34bb635e69c5b534e0e853ddcd421255a3/backend/colmapi.php#L28



### Error state capture (for display purposes)

![Screenshot 2024-11-21 at 11 34 19](https://github.com/user-attachments/assets/bff8a0f4-3511-4ef5-b74b-04a2bfab5374)


## Limitations

- php framework - would give me access to middleware allowing only certain users with api access the ability to GET (using JWT or similar)
- create a realtional db with products, status etc..
- use Typescript for frontend code
- pagination for the table
- use react router or similar and enable user friendly routing
- improve styling
- internationalization for text strings
- unit tests
