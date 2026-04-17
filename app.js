const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

//Base de datos
let books = [
    {id : 1, title: 'Cien Años de Soledad', author: 'Gabriel García Márquez'},
    {id : 2, title: 'Don Quijote', author: 'Miguel de Cervantes'},
];

//Ruta principal
app.get('/', (req, res) => {
    res.send('API funcionando!');
});

//Read - todos
app.get('/api/books', (req, res) => {
    res.json(books);
});

//Read - por id
app.get('/api/books/:id', (req,res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id == id);
    if(!book){
        return res.status(404).json({
            message: 'Libro no encontrado'
        })
    }

    res.json(book);
});

//Crear
app.post('/api/books', (req,res) => {
    const { title, author } = req.body;

    if(!title && author) {
        return res.status(400).json({
            message: 'Datos obligatorios'
        });
    }

    const newBook = {
        id: books.length > 0 ? books [books.length - 1]. id + 1 : 1,
        title,author
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

//Actualizar
app.put ('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;

    const book = books.find(b=> b.id == id);

    if(!book){
        return res.status(404).json({
            message:'No encontrado'
        });
    }

    book.title = title;
    book.author = author;

    res.json(book);
});