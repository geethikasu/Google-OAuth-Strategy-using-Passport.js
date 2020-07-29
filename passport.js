const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
//const admin = require('firebase-admin');

const firebase = require('firebase').initializeApp({
  serviceAccount : "./serviceAccountKey.json",
  databaseURL : "https://*****.firebaseio.com/"
});

var ref = firebase.database().ref().child('Accounts');
var usersRef = ref.child('Users');
var sellersRef = ref.child('Sellers');




passport.use(new GoogleStrategy({
    clientID: "*************.apps.googleusercontent.com",
    clientSecret: "****************",
    callbackURL: "http://localhost:3000/auth/google/redirect"
  },(accessToken, refreshToken, profile, email, done)=> {
     console.log("Passport callback function fired");
     
     console.log(email);
     const user_email = (email.email);
     const user_name = (email.displayName);
     const user_id = (email.id);

     usersRef.on('value',getData);

     function getData(data){
      console.log(data.val());

      var exist_data = data.val();
      var keys = Object.keys(exist_data);
      console.log(keys);

      for(var i=0;i<keys.length;i++){
        var k =keys[i];
        var exist_emails = exist_data[k].Email;
        console.log("existing email" + exist_emails)
        
        }
      }

      var newUser = usersRef.push({
       username : user_name,
       GoogleId : user_id,
       Email : user_email
     }).then(function (res){
       console.log("new user created with email ID: "+ user_email );
     });
    

    
  }
));

