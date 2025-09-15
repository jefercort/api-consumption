# 🔌 API Consumption Practice

A comprehensive collection of exercises and examples demonstrating REST API consumption in JavaScript. This project showcases different methods, patterns, and best practices for working with external APIs using modern JavaScript techniques.

## 📚 Overview

This repository contains practical exercises focused on understanding and implementing API consumption patterns. It covers everything from basic fetch operations to advanced error handling and data manipulation techniques, serving as both a learning resource and reference implementation.

## 🎯 Learning Objectives

Through this project, I've explored and implemented:

- **HTTP Methods**: GET, POST, PUT, PATCH, DELETE operations
- **Async Programming**: Promises, async/await, and callback patterns
- **Error Handling**: Comprehensive error management strategies
- **Data Formats**: Working with JSON, XML, and other response types
- **Authentication**: API keys, Bearer tokens, and OAuth basics
- **Rate Limiting**: Understanding and handling API rate limits
- **CORS**: Cross-Origin Resource Sharing concepts and solutions

## 🛠️ Technologies & Tools

### Core Technologies
- **JavaScript ES6+** - Modern JavaScript features
- **Fetch API** - Native browser API for HTTP requests
- **Axios** - Promise-based HTTP client
- **XMLHttpRequest** - Traditional AJAX approach (for comparison)

### APIs Used for Practice
- **JSONPlaceholder** - Fake REST API for testing
- **GitHub API** - Real-world API integration
- **OpenWeather API** - Weather data consumption
- **REST Countries** - Country information API
- **PokeAPI** - Pokemon data for fun exercises
- **Random User API** - User data generation

## 📁 Project Structure

```
api-consumption/
├── exercises/
│   ├── 01-basic-fetch/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── README.md
│   ├── 02-async-await/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── README.md
│   ├── 03-error-handling/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── README.md
│   ├── 04-axios-examples/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── README.md
│   ├── 05-authentication/
│   │   ├── index.html
│   │   ├── script.js
│   │   └── README.md
│   └── 06-advanced-patterns/
│       ├── index.html
│       ├── script.js
│       └── README.md
├── projects/
│   ├── weather-app/
│   ├── github-explorer/
│   └── user-directory/
├── utils/
│   ├── api-wrapper.js
│   ├── error-handler.js
│   └── data-transformer.js
├── docs/
│   ├── API-GUIDE.md
│   ├── BEST-PRACTICES.md
│   └── TROUBLESHOOTING.md
├── package.json
└── README.md
```

## 🚀 Exercises Overview

### Exercise 1: Basic Fetch
Learn the fundamentals of the Fetch API with simple GET requests.

```javascript
// Basic GET request
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Exercise 2: Async/Await Pattern
Modern approach using async/await for cleaner code.

```javascript
// Using async/await
async function fetchUser(userId) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!response.ok) throw new Error('User not found');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}
```

### Exercise 3: Error Handling
Comprehensive error handling strategies for robust applications.

```javascript
// Advanced error handling
class APIError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new APIError(
        `HTTP error! status: ${response.status}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof APIError) {
      // Handle API errors
      console.error('API Error:', error.message);
    } else if (error instanceof TypeError) {
      // Handle network errors
      console.error('Network Error:', error.message);
    } else {
      // Handle other errors
      console.error('Unknown Error:', error);
    }
    throw error;
  }
}
```

### Exercise 4: Axios Implementation
Using Axios for more features and better browser compatibility.

```javascript
// Axios with interceptors
import axios from 'axios';

// Create instance with default config
const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {'X-Custom-Header': 'value'}
});

// Request interceptor
api.interceptors.request.use(
  config => {
    // Add auth token to requests
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle authentication errors
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
```

### Exercise 5: Authentication Methods
Different authentication strategies for API consumption.

```javascript
// API Key Authentication
fetch('https://api.example.com/data', {
  headers: {
    'X-API-Key': process.env.API_KEY
  }
});

// Bearer Token Authentication
fetch('https://api.example.com/protected', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Basic Authentication
const credentials = btoa(`${username}:${password}`);
fetch('https://api.example.com/secure', {
  headers: {
    'Authorization': `Basic ${credentials}`
  }
});
```

### Exercise 6: Advanced Patterns
Complex scenarios and optimization techniques.

```javascript
// Parallel requests with Promise.all
async function fetchMultipleResources() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/posts').then(r => r.json()),
      fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
  } catch (error) {
    console.error('Error fetching resources:', error);
  }
}

// Request with retry logic
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response.json();
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}
```

## 💡 Key Concepts Covered

### 1. **Request Methods**
- GET - Retrieve data
- POST - Create new resources
- PUT - Update entire resources
- PATCH - Partial updates
- DELETE - Remove resources

### 2. **Headers & Content Types**
- Content-Type: application/json
- Accept: application/json
- Authorization headers
- Custom headers

### 3. **Response Handling**
- Status codes interpretation
- JSON parsing
- Stream handling
- Binary data

### 4. **Error Management**
- Network errors
- HTTP error statuses
- Timeout handling
- Retry strategies

### 5. **Performance Optimization**
- Request batching
- Caching strategies
- Debouncing/Throttling
- Lazy loading

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/jefercort/api-consumption.git
   cd api-consumption
   ```

2. **Install dependencies** (if using Axios)
   ```bash
   npm install
   ```

3. **Open exercises**
   - Navigate to any exercise folder
   - Open `index.html` in your browser
   - Check the console for outputs

## 📖 How to Use This Repository

1. **Start with basics**: Begin with Exercise 1 to understand fundamental concepts
2. **Progress gradually**: Move through exercises in order as they build upon each other
3. **Read the docs**: Each exercise has its own README with detailed explanations
4. **Experiment**: Modify the code and try different APIs
5. **Build projects**: Apply learned concepts in the mini-projects

## 🎓 Learning Resources

### Documentation
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Axios Documentation](https://axios-http.com/)
- [REST API Best Practices](https://restfulapi.net/)

### Useful APIs for Practice
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [ReqRes](https://reqres.in/)
- [Public APIs List](https://github.com/public-apis/public-apis)

## 🚧 Future Improvements

- [ ] Add GraphQL examples
- [ ] WebSocket implementation
- [ ] Server-Sent Events (SSE)
- [ ] Rate limiting implementation
- [ ] Request queue management
- [ ] Offline support with service workers
- [ ] API response caching strategies
- [ ] Unit tests for all exercises
- [ ] TypeScript migration
- [ ] React/Vue integration examples

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-exercise`)
3. Commit your changes (`git commit -m 'Add new exercise'`)
4. Push to the branch (`git push origin feature/new-exercise`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kevin Cortes**
- GitHub: [@jefercort](https://github.com/jefercort)
- LinkedIn: [Your LinkedIn](https://www.linkedin.com/in/kevinc-proservices)

## 🙏 Acknowledgments

- Thanks to all the free API providers used in this project
- MDN Web Docs for excellent documentation
- The JavaScript community for continuous learning resources

---

⭐ **Found this helpful? Star the repository to help others discover it!**

📚 **Check out the [complete documentation](./docs/API-GUIDE.md) for detailed API consumption patterns and best practices.**
