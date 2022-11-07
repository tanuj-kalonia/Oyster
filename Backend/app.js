import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";
import { connectDB } from "./config/database.js"
import { initializePassport } from "./utility/passportConfig.js";

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
initializePassport(passport);

app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

// Express Session
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Routes
import { userRouter } from "./routes/userRoutes.js";
import { taskRouter } from "./routes/taskRoutes.js";
app.use("/api/v1", userRouter);
app.use("/api/v1/task", taskRouter);


// Port
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});
