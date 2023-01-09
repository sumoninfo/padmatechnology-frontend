importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyAyLmJhrRn0qmgm04hw6tloJE9CXeroj-A",
    authDomain: "testing-app-319709.firebaseapp.com",
    databaseURL: "https://testing-app-319709-default-rtdb.firebaseio.com",
    projectId: "testing-app-319709",
    storageBucket: "testing-app-319709.appspot.com",
    messagingSenderId: "339759287643",
    appId: "1:339759287643:web:710ff69f08484e200ede7e",
    measurementId: "G-L06GEFLQ0T"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
    console.log(payload);
    const notification       = JSON.parse(payload);
    const notificationOption = {
        body: notification.body,
        icon: notification.icon
    };
    return self.registration.showNotification(payload.notification.title, notificationOption);
});
