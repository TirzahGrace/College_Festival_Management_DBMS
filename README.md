

# College Festival Management

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (Node Package Manager) installed
- [MySQL](https://www.mysql.com/) installed

## Installation

1. **Node.js and npm:**
   - Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
   - npm is included with Node.js installation.

2. **MySQL:**
   - Download and install MySQL from [https://www.mysql.com/](https://www.mysql.com/)

## Getting Started

Follow these steps to get the project up and running on your local machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/TirzahGrace/College-Festival-Management.git
   cd College-Festival-Management
   ```

2. Set up the database:
   - backend/.env file: set MYSQL_PASSWORD as your mysql server password for 'root' user.
   - Run the commands present in  'schema.sql' file located in the backend directory in mysql server from terminal.
        - To do this, execute following commands
            ```bash
               mysql -u root -p
            ```
            - Enter your password for 'root' user.
            ```sql
               source ./backend/schema.sql
               \q
            ```


3. Install Dependencies and Start the backend server:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   - Keep the server running in this terminal.

5. Install Dependencies and Start the frontend application:
    - Now in new terminal from same College-Festival-Management directory.
   ```bash
   cd frontend
   npm install
   npm start
   ```
   keep the client/ frontend running in this terminal.

6. In the browser, the webpage automatically opens. 
   To Manually Open your browser and navigate to [http://localhost:3000/](http://localhost:3000/) to view the application.

## Usage

- Follow the steps mentioned, to open the browser.
