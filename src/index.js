import express from "express";
import morgan from "morgan";
import { engine } from  "express-handlebars";
import  { join, dirname } from "path"
import { fileURLToPath } from "url"
import clientesRoutes from "./routes/clientes.routes.js"

//Initialization:
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings:
app.set("port",process.env.PORT || 3000);
    //Configurando directorio para vistas
app.set("views", join(__dirname, "views"));
    //Configuracion de motor de plantilla
app.engine(".hbs", engine({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs"
}));
app.set("view engine", ".hbs");//Motor de plantillas


//Middlewares:
app.use(morgan("dev"));
/*Uso de Express para trabajar con interfaces, formularios y
archivos tipo Json*/
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Routes:
app.get("/", (req, res) => {
    res.render("index")//Renderiza la vista 'index'
});
app.use(clientesRoutes)

app.get("/list", (req, res) => {
    res.render("clientes/list"); // Renderiza la vista 'list'
});


//Public files:
    //function join, usuarios podran usar el contenido dentro de directorio public
app.use(express.static(join(__dirname, "public")));

//Run server:
app.listen(app.get("port"), () =>
console.log("Cargando el puerto", app.get("port"))
);