# url_shortener

1. Ensure that Node.js and npm are installed on your machine. You can download Node.js from their official website (https://nodejs.org/en/).
2. Clone the repository by running the following command in your terminal:
`git clone https://github.com/mintdevil/url_shortener.git`
3. Change directory into the cloned repository:
`cd url_shortener`
4. Setting up the backend:
a. Change directory into the backend folder:
`cd backend`
b. Install the necessary dependencies:
`npm install`
c. Start the backend server:
`npm run start`
5. Setting up the frontend:
a. Change directory into the frontend folder:
`cd ../frontend`
b. Install the necessary dependencies:
`npm install`
c. Start the frontend server:
`npm start`
d. To run tests for the frontend:
`npm test`
6. Navigate to http://localhost:3001 to view the application.
---
## Troubleshooting:

If you get an error message when running npm install or npm start, make sure you have Node.js version 19.7.0 and npm version 9.5.0 installed. 
To check your current versions:
Copy code
`node -v`
`npm -v`

If you're still having trouble, try deleting the node_modules folder and running npm install again:
`rm -rf node_modules`
`npm install`