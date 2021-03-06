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
import methodOverride from 'method-override';
import hbsHelper from 'handlebars';
import helperViewHbs from './helper/handleBar.js';
env.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
helperViewHbs(hbsHelper);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('d:\\DATA_IMAGE'));
app.set('views', path.join(__dirname, 'views', 'renders'));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));
app.set('view engine', '.hbs');

app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use(methodOverride('_method'));

Router(app);

connectDb();

app.listen(process.env.PORT, () => {
    console.log(`Nettruyen running in http://localhost:${process.env.PORT}/`);
});