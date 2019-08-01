// firebase

const functions = require("firebase-functions");
const app = require("express")();

const { fbAuth } = require("./util/fbAuth");

const { getAllScreams, postOneScream, getScream, createComment } = require("./routes/screams");
const {
  login,
  signup,
  uploadPic,
  addUserDetails,
  getAuthenticatedUser
} = require("./routes/users");

// screams route
app.get("/screams", getAllScreams);
app.post("/scream", fbAuth, postOneScream);
app.get("/scream/:screamId", getScream);
app.post('/scream/:screamId/comment', fbAuth, createComment);

// new user route
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/pic", fbAuth, uploadPic);
app.post("/user", fbAuth, addUserDetails);
app.get("/user", fbAuth, getAuthenticatedUser);

exports.api = functions.region("asia-northeast1").https.onRequest(app);
