# 🚀 Advanced Node.js Concepts and Microservices 🛠️

Dive into advanced Node.js concepts and microservices architecture with this project! Explore various aspects of Express.js, Redis data structures, and a basic social media microservices setup.

## 🛠️ Installation

Follow these steps to set up the project locally:

- ⬇️ **Clone the Repository**:
  ```bash
  git clone https://github.com/samueltuoyo15/Advanced-Express.git
  cd Advanced-Express
  ```

- ⚙️ **Install Dependencies**:

  For the `express-concepts` project:
    ```bash
    cd express-concepts
    npm install
    ```
    
  For the `redis` project:
    ```bash
    cd ../redis
    npm install
    ```
  
  For the `social-media-microservices` projects:
    ```bash
    cd ../social-media-microservices/api-gateway
    npm install
    cd ../identity-service
    npm install
    ```

- 🚀 **Run the Projects**:

  For the `express-concepts` project:
    ```bash
    cd ../../express-concepts
    npm run dev
    ```

  For the `redis` project:
    ```bash
    cd ../redis
    npm run start
    ```

  For the `social-media-microservices` projects:
    ```bash
    # In api-gateway directory
    cd ../social-media-microservices/api-gateway
    npm run dev

    # In identity-service directory
    cd ../identity-service
    npm run dev
    ```

## 💡 Usage

### Express Concepts

Explore various Express.js middleware implementations such as:

- **Custom Middleware**: Request logging and timestamp injection.
- **CORS Configuration**: Setting up CORS policies.
- **Error Handling**: Global error handling and API error class.
- **Rate Limiting**: Basic rate limiting to prevent abuse.
- **URL Versioning**: API versioning using URL paths.

```typescript
import express from "express";
import { corsConfig } from "./config/corsConfig.ts";
import { requestLogger, addTimestamps } from "./middlewares/customMiddleware.ts";
import { globalErrorHandler } from "./middlewares/errorHandler.ts";
import { urlVersioning } from "./middlewares/urlVersioning.ts";
import { createBasicRateLimiter } from "./middlewares/rateLimit.ts";
import itemsRoute from "./routes/items-route.ts";

const app = express();

app.use(requestLogger);
app.use(addTimestamps);
app.use(corsConfig());
app.use(createBasicRateLimiter(100, 10 * 60 * 1000));
app.use(express.json());
app.use(urlVersioning("v1"));
app.use("/api/v1", itemsRoute);
app.use(globalErrorHandler);

app.listen(5000, () => console.log("app is running at http://localhost:5000"));
```

### Redis Data Structures

Example usage of Redis data structures:

```typescript
import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "localhost",
    port: 6379,
  },
});

client.on("error", (error) => console.error("Redis Client Error Occured!", error));

const redisDataStructure = async () => {
  try {
    await client.connect();
    console.log("Redis Client Connected");

    await client.set("user:name", "Golang Dev");
    const name = await client.get("user:name");
    console.log(name);

    await client.mSet(["user:country", "united states", "user:age", "50", "user:email", "test@gmail.com"]);
    const [country, age, email] = await client.mGet(["user:country", "user:age", "user:email"]);
    console.log(country, age, email);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
};

redisDataStructure();
```

### Social Media Microservices

A basic setup for social media microservices with:

- **API Gateway**: Entry point for routing requests.
- **Identity Service**: Handles user authentication and authorization.

## ✨ Features

- 🚀 **Express.js**: Demonstrates key concepts and middleware usage.
- 💾 **Redis**: Implements data structures and connection management.
- 🛡️ **Microservices**: Basic setup with API Gateway and Identity Service.
- 🔒 **Security**: Includes CORS, rate limiting, and error handling.
- 🚦 **Versioning**: API versioning using URL paths.

## 💻 Technologies Used

| Technology | Link                                                                        |
| :---------- | :-------------------------------------------------------------------------- |
| Node.js    | [https://nodejs.org/](https://nodejs.org/)                                  |
| Express.js | [https://expressjs.com/](https://expressjs.com/)                             |
| Redis      | [https://redis.io/](https://redis.io/)                                      |
| TypeScript | [https://www.typescriptlang.org/](https://www.typescriptlang.org/)         |

## 🤝 Contributing

Contributions are welcome! Here are the guidelines:

- 🐞 Report bugs using GitHub issues.
- 🛠️ Submit pull requests with clear descriptions.
- 📝 Follow the existing code style.
- ➕ Add tests for new features.

## 📜 License

This project is under the [MIT License](LICENSE).

## 🧑‍💻 Author Info

- GitHub: [SamuelTuoyo15](https://github.com/samueltuoyo15)
- Twitter: [Insert Twitter Link](Insert Twitter Link)
- LinkedIn: [Insert LinkedIn Link](Insert LinkedIn Link)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://github.com/samueltuoyo15/Dokugen)
