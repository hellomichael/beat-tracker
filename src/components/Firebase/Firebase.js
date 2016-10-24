import Firebase from 'firebase'

export default Firebase.initializeApp({
  apiKey: "AIzaSyD6y9ydJwvxBss0oEizAu1cNLSpRn1GAHU",
  authDomain: "beat-tracker.firebaseapp.com",
  databaseURL: "https://beat-tracker.firebaseio.com",
  storageBucket: "beat-tracker.appspot.com",
  messagingSenderId: "311768023455"
}).database()
