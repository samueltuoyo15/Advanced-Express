# Advanced CORS Configuration with Express

## Description

This project demonstrates an advanced approach to configuring Cross-Origin Resource Sharing (CORS) in an Express.js application. It includes custom origin validation, handling different HTTP methods, setting allowed headers, and managing credentials and preflight requests. This setup is ideal for securing your API while allowing specific origins to access it.

## Installation

To get started with this project, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd advanced-cors
    ```
2.  **Install the dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    This will start the server at `http://localhost:5000`.

## Usage

Once the server is running, you can test the CORS configuration by sending requests from an allowed origin (e.g., `http://localhost:3000`). The configuration is set to allow only `http://localhost:3000` by default.

**Example:**

Send a `GET` request to `http://localhost:5000` from `http://localhost:3000`. The request should be successful. If you send a request from a different origin, you will receive a CORS error.

## Features

*   **Custom Origin Validation:** Dynamically allows or denies origins based on a predefined list.
*   **Method Handling:** Specifies allowed HTTP methods (GET, PUT, POST, DELETE).
*   **Header Control:** Manages allowed and exposed headers for enhanced security.
*   **Credential Support:** Enables handling of cookies and authorization headers.
*   **Preflight Configuration:** Optimizes handling of preflight requests for complex CORS scenarios.

## Technologies Used

| Technology   | Description                               |
| :----------- | :---------------------------------------- |
| Node.js      | Runtime environment                       |
| Express.js   | Web application framework                 |
| TypeScript   | Programming language                      |
| CORS         | Middleware for handling CORS              |
| Nodemon      | Utility for automatic server restarts     |

## Contributing

Contributions are welcome! Here’s how you can contribute:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```
3.  **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add your descriptive commit message"
    ```
4.  **Push your changes to your fork:**

    ```bash
    git push origin feature/your-feature-name
    ```
5.  **Create a pull request** to the main branch of the original repository.

## License

This project is open source and available under the [MIT License](LICENSE).

[![Built with Dokugen](https://img.shields.io/badge/Built%20with-Dokugen-brightgreen)](https://github.com/samueltuoyo15/Dokugen)
