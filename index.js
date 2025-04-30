import express from "express";
import fs from "fs";
import bodyParser from "body-parser";
import recursosRoutes from "./routes/recursos.js"
import reservesRoutes from "./routes/reserves.js"
/*
import path from "path";
import { fileURLToPath } from "url";

// Simular __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
*/

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("./public"));//carpeta publica pel css
app.set('view engine','ejs');//Fem servir el motor ejs
app.set('views', "./views"); //carpeta on desem els arxius .ejs



const readRecursos = () => {
    try {
        const data = fs.readFileSync("./data/recursos.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeRecursos = (data) => {
    try {
        fs.writeFileSync("./data/recursos.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

const readReserves = () => {
    try {
        const data = fs.readFileSync("./data/reserves.json");
        return JSON.parse(data);
    } catch (error) {
        console.error(error);
    }
};

const writeReserves = (data) => {
    try {
        fs.writeFileSync("./data/reserves.json", JSON.stringify(data));
    } catch (error) {
        console.error(error);
    }
};

// ##################################################################################################################

app.get("/",(req,res)=>{
    res.render("home");
});

app.use("/recursos", recursosRoutes);

//GET recursos
app.get('/recursos', (req, res) => {
    const user={name:"Francesc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readRecursos();
    res.render("recursos",{user, data, htmlMessage})
    //res.json(data.recursos);
});

//GET reserves
app.get('/reserves', (req, res) => {
    const user={name:"Francesc"}
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readReserves();
    res.render("reserves",{user, data, htmlMessage})
    //res.json(data.reserves);
});

/*
// Get recursos/:id
app.get("/recursos/:id", (req, res) => {
    const data = readRecursos
();
    //Extraiem l'id de l'url recordem que req es un objecte tipus requets
    // que conté l'atribut params i el podem consultar
    const id = parseInt(req.params.id);
    const book = data.books.find((book) => book.id === id);
    res.json(book);
});

// Post recursos
app.post("/recursos", (req, res) => {
    const data = readRecursos
();
    const body = req.body;
    //todo lo que viene en ...body se agrega al nuevo libro, 
    //los (...) es un operador de propagación y sirve para hacer una copia de la información original
    const newBook = {
        id: data.books.length + 1,
        ...body,
    };
    data.books.push(newBook);
    writeRecursos(data);
    res.json(newBook);
});

// Update recursos
app.put("/recursos/:id", (req, res) => {
    const data = readRecursos
();
    const body = req.body;
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    data.books[bookIndex] = {
        ...data.books[bookIndex],
        ...body,
    };
    writeRecursos(data);
    res.json({ message: "Book updated successfully" });
});

// Delete recursos
//Creem un endpoint per eliminar un llibre
app.delete("/recursos/:id", (req, res) => {
    const data = readRecursos
();
    const id = parseInt(req.params.id);
    const bookIndex = data.books.findIndex((book) => book.id === id);
    //splice esborra a partir de bookIndex, el número de elements
    // que li indiqui al segon argument, en aquest cas 1
    data.books.splice(bookIndex, 1);
    writeRecursos(data);
    res.json({ message: "Book deleted successfully" });
});*/
// ##################################################################################################################

//Ultima línea simpre. Función para escuchar
app.listen(3000, () => {
    console.log("Server listing on port 3000")
});

//npx kill-port 3000
//para matar el proceso