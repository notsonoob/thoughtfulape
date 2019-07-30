// firebase

const functions = require("firebase-functions");
const app = require("express")();

const { fbAuth } = require("./util/fbAuth");

const { getAllScreams, postOneScream } = require("./routes/screams");
const { login, signup } = require("./routes/users");

// screams route
app.get("/screams", getAllScreams);
app.post("/scream", fbAuth, postOneScream);

// new user route
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("asia-northeast1").https.onRequest(app);
