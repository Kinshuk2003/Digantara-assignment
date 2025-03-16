# Digantara Assignment

This is a Node.js application that provides APIs for various algorithms like Breadth First Search, Sorting, and Searching.

A live version of the API is hosted at `http://digantara.centralindia.cloudapp.azure.com`.

## Setup Guide

### Prerequisites
- Node.js (v22.x)
- npm (v6.x or later)
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Kinshuk2003/Digantara-assignment.git
    cd Digantara-assignment
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    ```

### Running the Application

1. Start the server:
    ```sh
    node src/index.js
    ```


3. The server will be running on `http://localhost:3000`.

### Running with Docker

1. Build the Docker image:
    ```sh
    docker build -t digantara .
    ```

2. Run the Docker container with volume mapping for logs:

    1. on Linux:
        ```sh
        docker run -p 3000:3000 -v $(pwd)/logs:/app/logs --env-file .env digantara
        ```

    2. on Windows:
        ```sh
        docker run -p 3000:3000 -v ${PWD}/logs:/app/logs --env-file .env digantara
        ```

## API Documentation

A Swagger UI is available at `http://localhost:3000/api-docs` to test the APIs.

A postman collection is also available in the `docs` directory.

### Endpoints

#### 1. Breadth First Search
- **URL:** `/api/v1/bfs`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "input": [[1, 2], [0, 3], [0, 3], [1, 2]],
        "source": 0
    }
    ```
- **Response:**
    ```json
    {
        "message": "traversed Successfully",
        "output": [0, 1, 2, 3],
        "executionTime": "0.12 ms"
    }
    ```

#### 2. Sorting
- **URL:** `/api/v1/sort`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "algorithm": "Quick Sort",
        "input": [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5]
    }
    ```
- **Response:**
    ```json
    {
        "message": "Array sorted successfully",
        "output": [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9],
        "executionTime": "0.34 ms"
    }
    ```

#### 3. Search
- **URL:** `/api/v1/search`
- **Method:** `POST`
- **Request Body:**
    ```json
    {
        "algorithm": "Binary Search",
        "input": [1, 2, 3, 4, 5, 6, 7, 8, 9],
        "target": 5
    }
    ```
- **Response:**
    ```json
    {
        "message": "Element found",
        "output": 4,
        "executionTime": "0.10 ms"
    }
    ```

#### 4. Logs
- **URL:** `/api/logs`
- **Query Parameters:**
    - `algorithm` (optional): Filter logs by algorithm name
    - `status` (optional): Filter logs by status
    - `date` (optional): Filter logs by date (format: `YYYY-MM-DD`)
- **Method:** `GET`

### Response Format
```json
{
    "status": "success",
    "logs": [
        {
            "id": 1,
            "timestamp": "2025-03-16T05:39:29.075Z",
            "algorithm": "Binary Search",
            "input": "{\"input\":[1,2,3,4,5],\"target\":3}",
            "output": "2",
            "status": "Element found",
            "execution_time_ms": 0.0737
        },
        {
            "id": 2,
            "timestamp": "2025-03-16T05:43:55.793Z",
            "algorithm": "Binary Search",
            "input": "{\"input\":[1,2,3,4,5],\"target\":3}",
            "output": "2",
            "status": "Element found",
            "execution_time_ms": 0.0821
        },
    ]
}
```
### Logging
The application logs the algorithm execution details like input, output, status, execution time, etc into a in-memory sqlite database and provides an API endpoint `/api/logs` to fetch the logs. The logs are saved to a file `logs/logs.json` when the server is stopped. Logs are loaded back into the database from the file when the server is restarted.

### Validation Errors
All endpoints validate the input data and return a `400 Bad Request` status with a detailed error message if validation fails.

### Error Handling
In case of server errors, the API returns a `500 Internal Server Error` status with a generic error message.

## Contributing
Feel free to open issues or submit pull requests if you find any bugs or have feature requests.

## License
This project is licensed under the MIT License.