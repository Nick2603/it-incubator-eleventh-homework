import express, { Request, Response } from "express";
import cors from "cors";
import { blogsRouter } from "./routes/blogsRouter";
import { postsRouter } from "./routes/postsRouter";
import { CodeResponsesEnum } from "./types/CodeResponsesEnum";
import { usersRouter } from "./routes/usersRouter";
import { authRouter } from "./routes/authRouter";
import { commentsRouter } from "./routes/commentsRouter";
import cookieParser from "cookie-parser";
import { devicesRouter } from "./routes/devicesRouter";
import {
  blogsRepository,
  commentsRepository,
  postsRepository,
  recoveryCodesRepository,
  sessionsRepository,
  usersRepository,
} from "./composition/compositionRoot";

export const app = express();

const parserMiddleware = express.json();

app.use(cors());

app.use(parserMiddleware);

app.use(cookieParser());

app.set("trust proxy", true);

app.delete("/testing/all-data", async (req: Request, res: Response) => {
  await blogsRepository.deleteAllBlogs();
  await postsRepository.deleteAllPosts();
  await usersRepository.deleteAllUsers();
  await commentsRepository.deleteAllComments();
  await sessionsRepository.deleteAllSessions();
  await recoveryCodesRepository.deleteAllRecoveryCodes();
  res.sendStatus(CodeResponsesEnum.No_content_204);
});

app.use("/blogs", blogsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/comments", commentsRouter);
app.use("/security/devices", devicesRouter);
