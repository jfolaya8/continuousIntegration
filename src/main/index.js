const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const multer = require('multer')


//inicializar procesos
const app = express();
require('./public/lib/passport');

//Configuraciones del servidor
app.set('port', process.env.PORT || 3500);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./public/lib/handlebars')
}));

app.set('view engine', '.hbs');

//middlaware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Variables globales
app.use((rep, res, next)=>{
   
    next();
});

//Archivos controladores, para las peticiones (GET, POST) con el backend
app.use(require('./routes'));
app.use(require('./routes/links'));
//app.use(require('./routes/controller_usuarios'));
//app.use(require('./routes/controller_registro'));
//app.use(require('./routes/controller_perfil'));
//app.use(require('./routes/controller_producto'));

//Archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Inicializar servidor
app.listen(app.get('port'), () =>{
    console.log('Server http://localhost:' + app.get('port'));    
});