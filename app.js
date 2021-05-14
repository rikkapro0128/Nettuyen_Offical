import express from 'express';
import path from 'path';
import morgan from 'morgan';
import env from 'dotenv';
import Router from './Router/Route.js';
import exphbs from 'express-handlebars';
import { fileURLToPath } from 'url';
import connectDb from './config/Database.js';
import bodyParser from 'body-parser';
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('combined'));

Router(app);

env.config();

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`Nettruyen running in http://localhost:${process.env.PORT}/`);
});