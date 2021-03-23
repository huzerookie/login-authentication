Login Authentication Application Prototype for Anatartica Global

The routing logic is present in index.js.
Database connection properties are mentioned in /db/mongoose.js.
User Schema is present in /db/userMongoose.js
The Handlebars (login, register, user-list) and CSS files are present inside /public/utils.

This project uses passport-login,express-session and flash which are tools for building authentication at a secure level. The idea is to restrict the user to access unwanted pages without logging into the application.
After logging into the application, session is maintained and tracked such that if user tries to navigates to /login or /register, then user is redirected to the Home Page.
The session is deserialized after user logs out.

User Grid with all the user details is maintained using DevExpress. DevExpress provides internal pagination, sorting and searching functionalities.

User Records are maintained in MongoDB.
