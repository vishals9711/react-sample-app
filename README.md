# Sample Chatbot App

This is a simple full stack web application with a frontend, backend, and chatbot.

## Node.js Installation

To run the application, you'll need to have Node.js installed on your machine. If you don't have it installed, you can download it from the official Node.js website.

**Download Node.js:**

- [Node.js Download Page](https://nodejs.org/en/download/)

Choose the appropriate version for your operating system and follow the installation instructions. Once Node.js is installed, you can proceed with setting up of the application.

## Overview

- The frontend displays different content sections fetched from the backend API.
- There is an integrated chatbot that echoes back the user's input. 
- The backend provides a REST API and serves the frontend content.

## Features

- Modern frontend with React
- Node/Express backendå

## Usage

### Local Development

#### Frontend
```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Frontend available at: http://localhost:3000

#### Backend
```bash
cd backend
npm install
npm run dev
```
Copy code

Backend API available at: http://localhost:5000

### Production 

The app can be easily deployed to any hosting provider.

Example deploy script:

```bash
chmod +x build_script.sh
./build_script.sh
```

This will build the frontend, backend, deploy to server, and make available at port 5001.
http://localhost:5001