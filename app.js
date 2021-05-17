import express from 'express';
import path from 'path';
import morgan from 'morgan';
import env from 'dotenv';
import Router from './Router/Route.js';
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import connectDb from './config/Database.js';
import cookieParser from 'cookie-parser';
import bodyPaser from 'body-parser';
import helper from './helper/handleLog.js'

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views', 'renders'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
}));
app.set('view engine', '.hbs');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));
helper.setVarApp(app);

Router(app);

env.config();

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`Nettruyen running in http://localhost:${process.env.PORT}/`);
});