# Padma Technology Frontend

## Installation

### Clone the repository

    git clone https://github.com/sumoninfo/padmatechnology-frontend.git

### Switch to the repo folder

    cd padmatechnology-frontend

### Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

### Firebase configuration in /src/plugins/firebase.js & /public/firebase-messaging-sw.js files

```javascript
const firebaseConfig = {
    apiKey           : "",
    authDomain       : "",
    databaseURL      : "",
    projectId        : "",
    storageBucket    : "",
    messagingSenderId: "",
    appId            : "",
    measurementId    : ""
};
```

### Npm Install

    npm install 

### Compiles and hot-reloads for development

    npm run serve  

### Default Login credentials

```
=========Admin============
User: admin@gmail.com
Password: 12345678

=========Customer============
User: customer@gmail.com
Password: 12345678
```
