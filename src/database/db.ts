import { createConnection } from 'typeorm';
import chalk from 'chalk';

createConnection().then(() => console.log(chalk.red('connected with database!')));