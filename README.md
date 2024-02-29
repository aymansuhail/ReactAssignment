# Deployed frontend link
https://reactassignment-1-3bp1.onrender.com/
# Commands used for postgres
Created database using - CREATE DATABASE Dummydata;
Created Table using - CREATE TABLE customer_info (
    sno SERIAL PRIMARY KEY,
    customer_name VARCHAR(50),
    age INT,
    created_at TIMESTAMP,
    location VARCHAR(100),
    phone VARCHAR(20)
);
Entered dummy record using - INSERT INTO customer_info (customer_name, age, created_at, location, phone)
VALUES
    ('Michael', FLOOR(RANDOM() * (50 - 18 + 1)) + 18, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 365), 'Location3', '1982828384'),
    ('Jessica', FLOOR(RANDOM() * (50 - 18 + 1)) + 18, NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 365), 'Location4', '2982828384'),
    
# Endpoints in Node.js with Express.js for Creating Restful API
## GET (to fetch all the data from the database)
app.get('/customers', async (req, res) => {
...
with a query to fetch all the data 
  const result = await client.query('SELECT * FROM customer_info');
}
## Delete (to delete a record based on sno)
app.delete('/customers/:sno', async (req, res) => {
...
with a query to delete a record 
    const result = await client.query('DELETE FROM customer_info WHERE sno = $1 RETURNING *', [sno]);
}
## Post (to create a new customer)
app.post('/customers', async (req, res) => {
...
with a query to create a new customer 
    const result = await client.query('INSERT INTO customer_info (customer_name, age, created_at, location, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [customer_name, age, created_at, location, phone]);
also ensures SQL query injection safety 
}
# FRONT END(React.js)
#### Used useState hook for state managment and useEffect hook in the component 
used axios library to fetch the data from the apis 
created components for card typography and used tailwindcss for styling 


### Other ways to use postgres 
#### Could use Prisma 
It provides ORM so that there is no need to worry about the SQL syntax, auto-completion 

## DEPLOYED BACKEND ON RENDER AND USED THE DEPLOYED LINKS IN THE FORNTEND 
