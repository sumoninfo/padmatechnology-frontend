import JwtService from "@/services/jwt.service";

const firebaseConfig = {
    apiKey:  "AIzaSyAyLmJhrRn0qmgm04hw6tloJE9CXeroj-A",
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

function IntitalizeFireBaseMessaging() {
    messaging
        .requestPermission()
        .then(function () {
            console.log("Notification Permission");
            return messaging.getToken();
        })
        .then(function (token) {
            console.log("Token : " + token);
            JwtService.saveFirebaseToken(token);
        })
        .catch(function (reason) {
            console.log(reason);
        });
}

messaging.onMessage(function (payload) {
    //console.log(payload);
    const notificationOption = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };
    // var audio                = new Audio('./notification_sound.mp3');
    // audio.play();
    if (Notification.permission === "granted") {
        var notification = new Notification(payload.notification.title, notificationOption);

        notification.onclick = function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action, '_blank');
            notification.close();
        }
    }

});
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (newtoken) {
            console.log("New Token : " + newtoken);
        })
        .catch(function (reason) {
            console.log(reason);
        })
})
IntitalizeFireBaseMessaging();
