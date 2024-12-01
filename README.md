# Flagright-Transactions

![image](https://github.com/user-attachments/assets/73db6b0c-99c4-47dc-aeec-dcc426907604)

![image](https://github.com/user-attachments/assets/43640417-fa14-4c19-b1b4-4bd218a19b1d)

![image](https://github.com/user-attachments/assets/82c08d7f-8f8a-4d6f-9bfb-4911ae9bd484)

## Project Overview
Flagright-Transactions is a full-stack application designed to manage transactions. It provides a set of API endpoints that enable users to create, retrieve, search, and report on transactions. Additionally, it includes the ability to control an automated transaction creation process via a CRON job.

## API Endpoints

### 1. Add a New Transaction
- **URL:** `POST /transactions`
- **Purpose:** This endpoint allows users to create a new transaction with specific details.
- **Request Method:** `POST`
- **Request Body:**
    ```json
    {
      "amount": "Number, required",
      "description": "String, required",
      "country": "String, required",
      "tags": "Array of Strings, optional",
      "status": "String, default: 'pending'"
    }
    ```
- **Response:** Returns the details of the newly created transaction, including a unique transaction ID and the timestamp.
- **Response Codes:**
    - `201 Created`: The transaction was created successfully.
    - `400 Bad Request`: If the input data is invalid or missing.
    - `500 Internal Server Error`: In case of server issues.

---

### 2. Get Transaction Details by ID
- **URL:** `GET /transactions/{transactionId}`
- **Purpose:** Retrieves detailed information about a transaction based on the given ID.
- **Request Method:** `GET`
- **Request Parameter:** `{transactionId}` (String, required): The unique ID of the transaction.
- **Response:** Returns the transaction's details, such as `amount`, `description`, `timestamp`, etc.
- **Response Codes:**
    - `200 OK`: The transaction was found and returned.
    - `404 Not Found`: If no transaction exists with the provided ID.
    - `500 Internal Server Error`: In case of server issues.

---

### 3. Search Transactions
- **URL:** `GET /transactions/search`
- **Purpose:** Allows searching for transactions based on certain criteria.
- **Request Method:** `GET`
- **Query Parameters:**
    - `userId` (String): Filter by user ID.
    - `startDate` (Date): Find transactions starting from this date.
    - `endDate` (Date): Find transactions up to this date.
    - `description` (String): Search transactions by description.
    - `tags` (Array of Strings): Filter by transaction tags.
    - `country` (String): Filter by transaction country.
    - `sortBy` (String): Sort results by either `amount` or `timestamp`.
    - `sortOrder` (String): Sort order (`asc` or `desc`).
- **Response:** Returns a list of transactions matching the search criteria.
- **Response Codes:**
    - `200 OK`: Transactions matching the query parameters were found.
    - `400 Bad Request`: If the query parameters are incorrect.
    - `500 Internal Server Error`: If the server encounters an error.

---

### 4. Generate Transaction Reports
- **URL:** `GET /reports`
- **Purpose:** Allows generating transaction reports based on specific parameters.
- **Request Method:** `GET`
- **Query Parameters:**
    - `startDate` (String, required): The start date for the report (e.g., "2024-01-01").
    - `endDate` (String, required): The end date for the report (e.g., "2024-12-31").
    - `format` (String, optional): The format of the report, either `json` or `csv`.
- **Response:** Returns the transaction report either in JSON or CSV format, depending on the requested format.
- **Response Codes:**
    - `200 OK`: The report was successfully generated and returned.
    - `400 Bad Request`: If the query parameters are incorrect or missing.
    - `500 Internal Server Error`: In case of server-side issues.

---

### 5. Manage CRON Job (Start/Stop)
- **URLs:**
    - `POST /cronjob/start` - Starts the automated transaction generation CRON job.
    - `POST /cronjob/stop` - Stops the ongoing transaction generation CRON job.
- **Purpose:** These endpoints control the automated process of generating transactions.
- **Request Method:** `POST`
- **Response:** Confirms whether the CRON job has been started or stopped.
- **Response Codes:**
    - `200 OK`: The CRON job was successfully started or stopped.
    - `500 Internal Server Error`: In case of server-side issues.

---

## Running the Project Locally

### Backend Setup
1. Clone the backend repository:
    ```bash
    git clone https://github.com/your-repository/backend.git
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Copy the `.env.example` file to `.env` and update it with your MongoDB URI and other environment-specific settings.
    ```bash
    cp .env.example .env
    ```
4. Start the backend server:
    ```bash
    npm start
    ```
    The backend will be running on `http://localhost:7000`.

### Frontend Setup
1. Clone the frontend repository:
    ```bash
    git clone https://github.com/your-repository/frontend.git
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Copy the `.env.example` file to `.env` and update it with the backend API URL.
    ```bash
    cp .env.example .env
    ```
4. Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend will be running on `http://localhost:3000`.

---

## Technologies Used
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Database:** MongoDB
- **Reporting:** CSV/JSON report generation
- **Others:** Axios, React-Router



