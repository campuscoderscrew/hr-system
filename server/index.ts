import express, { type Express } from "express";
import membersRouter from './routes/members.ts';
import emailAuthRouter from "./routes/emailAuth.ts";

const app: Express = express();
const PORT = 3000;

app.use(express.json());
app.use('/members', membersRouter);
app.use('/email-auth', emailAuthRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default app;
