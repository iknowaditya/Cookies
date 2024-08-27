
# user_login_JWT_auth

user_login_JWT_auth is a web application for managing user authentication with JWT (JSON Web Tokens) using the MERN stack (MongoDB, Express.js, React, Node.js). It provides features for user login, registration, role-based access control, and a responsive user interface.


## Tech Stack

**Client:** React, React Router, Tailwind CSS, Vite, Axios, Context API.

**Server:** Node.js, Express.js, JWT for authentication

**Database:** MongoDB

**Deployment:** Vercel (Frontend), Render (Backend)


## Features

- JWT Authentication: Secure user login and registration using JWT for access control.
- Role-Based Access: Different access levels for users (Admin, Editor, Lounge, and Home).
- Responsive Design: Optimized for mobile devices using Tailwind CSS.
- Protected Routes: Ensure only authorized users can access specific routes.
- Interactive UI: User-friendly interface with React Router for navigation and react-hot-toast for notifications.

## Acknowledgements

 I would like to express my gratitude to the following technologies and platforms that made the development of this project possible.


- [Open Source Community: For providing invaluable tools, libraries, and frameworks that made this project possible.](https://www.npmjs.com/)
- [React: A JavaScript library for building user interfaces.](https://react.dev/)
- [Tailwind CSS: A utility-first CSS framework for rapid UI development.](https://tailwindcss.com/docs/installation)
- [Vite: A build tool that aims to provide a faster and leaner development experience for modern web projects.](https://vitejs.dev/)
- [Axios: A promise-based HTTP client for the browser and Node.js.](https://axios-http.com/)
- [Framer Motion: A production-ready motion library for React.](https://www.framer.com/motion/)
- [Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.](https://nodejs.org/en/docs/)
- [Express.js: A fast, unopinionated, minimalist web framework for Node.js.](https://expressjs.com/)
- [MongoDB: A document database with the scalability and flexibility that you want with the querying and indexing that you need.](https://www.mongodb.com/docs/)
- [Mongoose: Elegant MongoDB object modeling for Node.js.](https://mongoosejs.com/docs/)
- [JSON Web Tokens (JWT): For the secure and efficient method of transmitting information between parties as JSON objects.](https://jwt.io/)
- [GitHub: For the version control system and collaboration platform that streamlined our development process.](https://github.com/)
- [Render: A unified cloud to build and run all your apps and websites with free SSL, a global CDN, private networks and auto deploys from Git.](https://render.com/docs)
- [Vercel: The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.](https://vercel.com/docs)
- [Stack Overflow and Developer Community: For providing answers to countless technical questions that helped us overcome various challenges during development.](https://stackoverflow.com/)


## Installation

Prerequisites

Install my-project with npm

Ensure you have the following installed:
   - Node.js
   - npm or yarn
   - MongoDB (for local development)

```bash
  npm install my-project
  cd my-project
```
    
## API Reference

#### Get all items

```http
  GET /users
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Authors

- [Hanu Singh](https://github.com/iknowaditya)


## Badges


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## Screenshots


![App Screenshot](https://github.com/iknowaditya/URLshortener-app/assets/97401096/df7fb33e-a458-4e99-8434-66be44815028)

![App Screenshot](https://github.com/iknowaditya/URLshortener-app/assets/97401096/983f4e72-48dc-47d5-b15d-12d56aef5d52)

![App Screenshot](https://github.com/iknowaditya/URLshortener-app/assets/97401096/983f4e72-48dc-47d5-b15d-12d56aef5d52)

![App Screenshot](https://github.com/iknowaditya/URLshortener-app/assets/97401096/983f4e72-48dc-47d5-b15d-12d56aef5d52)

## Usage

# Authentication
- Login: Send a POST request to /api/login with email and password. Receive JWT tokens for authentication.


- Register: Send a POST request to /api/register with user details to create a new account.

## Protected Routes

- Home: Accessible by authenticated users.
- Editor: Accessible by users with the Editor role.
- Admin: Accessible by users with the Admin role.
- Lounge: Accessible by users with the Lounge role.

## Example API Endpoints

- POST /api/login - Login and receive JWT tokens
- POST /api/register - Register a new user



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI=your_mongodb_connection_string`

`JWT_SECRET=your_jwt_secret`


## Deployment

To deploy this project run

```bash
  npm run deploy
```


## Contributing

Contributions are welcome! Please fork this repository and submit a pull request for any features, bug fixes, or enhancements.

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.

