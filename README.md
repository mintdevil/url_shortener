# url_shortener

1. Ensure that Node.js and npm are installed on your machine. You can download Node.js from their official website (https://nodejs.org/en/).

2. Clone the repository by running the following command in your terminal:
```
git clone https://github.com/mintdevil/url_shortener.git
```

3. Change directory into the cloned repository:
```
cd url_shortener
```

4. Setting up the backend:

   a. Change directory into the backend folder:
   ```
   cd backend
   ```

   b. Install the necessary dependencies:
   ```
   npm install
   ```

   c. Start the backend server:
   ```
   npm run start
   ```

   d. To run tests for the backend:
   ```
   npm run test
   ```

5. Setting up the frontend:

   a. Open another terminal and change directory into the frontend folder:
   ```
   cd url_shortener/frontend
   ```

   b. Install the necessary dependencies:
   ```
   npm install
   ```

   c. Start the frontend server:
   ```
   npm start
   ```

   d. To run tests for the frontend:
   ```
   npm test
   ```

6. Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

---

## Troubleshooting:

If you get an error message when running npm install or npm start, make sure you have Node.js version `19.7.0` and npm version `9.5.0` installed. 

To check your current versions:
```
node -v
npm -v
```

Make sure that the backend is running on [http://localhost:8080](http://localhost:8080) and frontend on [http://localhost:3000](http://localhost:3000)

If you're still having trouble, try deleting the `node_modules` folder and running `npm install` again:
```
rm -rf node_modules
npm install
```

If you're running tests and getting `No tests found related to files changed since last commit.`, do try the below commands to run the test files.
1. For frontend (make sure you are in the `frontend` folder):
   ```
   npm test -- ./src/ShortenUrlPage/ShortenUrlPage.test.js
   ```
2. For backend (make sure you are in the `backend` folder):
   ```
   npm run test --./src/url/url.service.spec.ts
   ```
