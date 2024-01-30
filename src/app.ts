import "express-async-errors";
import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routers/router";
import morgan from "morgan";
import helmet from "helmet";

import fs from 'fs';
import path from 'path';

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("tiny"));

app.use(helmet());

app.use("/api", router);

app.get('/curriculoptbr', (req: Request, res: Response) => {
  const filePath = path.join(__dirname, '../assets', 'Curriculo atualizado.pdf');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(404).send('Arquivo não encontrado.');
    } else {
      res.download(filePath, 'Português-version.pdf', (err) => {
        if (err) {
          res.status(500).send('Erro ao realizar o download.');
        }
      });
    }
  });
});
app.get('/curriculoenglish', (req: Request, res: Response) => {
    const filePath = path.join(__dirname, '../assets', 'English.pdf');

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.status(404).send('Arquivo não encontrado.');
      } else {
        res.download(filePath, 'English-version.pdf', (err) => {
          if (err) {
            res.status(500).send('Erro ao realizar o download.');
          }
        });
      }
    });
  });


export default app;
