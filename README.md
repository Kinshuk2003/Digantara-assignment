# Digantara Assignment
## Setup Guide

### Prerequisites
- Node.js (v22.x)
- npm (v6.x or later)
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/digantara.git
    cd digantara
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
    npm start
    ```

2. For development mode with hot-reloading:
    ```sh
    npm run dev
    ```

3. The server will be running on `http://localhost:3000`.

### Running with Docker

1. Build the Docker image:
    ```sh
    docker build -t digantara .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 digantara
    ```

## API Documentation

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

### Validation Errors
All endpoints validate the input data and return a `400 Bad Request` status with a detailed error message if validation fails.

### Error Handling
In case of server errors, the API returns a `500 Internal Server Error` status with a generic error message.

## Contributing
Feel free to open issues or submit pull requests if you find any bugs or have feature requests.

## License
This project is licensed under the MIT License.