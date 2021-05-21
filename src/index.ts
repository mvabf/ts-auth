import 'reflect-metadata';

import express from 'express';
import chalk from 'chalk';

import routes from './routes';
import './database/db';

const app = express();

app.use(express.json());
app.use(routes);



app.listen(3000, () => console.log(chalk.blue('Server is running on port 3000')));