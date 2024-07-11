import express, { Express, Request, Response, Router } from "express";
import compression from "compression";
import cors from "cors";
import countriesRouter from './routes/countries.route';
import './config';

const app: Express = express();
const port: number = parseInt(process.env.PORT || '3000', 10);
const hostname: string = process.env.HOSTNAME || 'localhost';
app.use(cors());
app.use(compression());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const apiRouter: Router = express.Router();
apiRouter.use("/countries", countriesRouter);
app.use('/api', apiRouter);

const server = app.listen(port, hostname, () => {
  console.log(`[server]: Server is running at http://${hostname}:${port}`);
});

process.on('SIGTERM', () => {
  console.log('[server]: SIGTERM signal received.');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[server]: SIGINT signal received.');
  server.close(() => {
    process.exit(0);
  });
});