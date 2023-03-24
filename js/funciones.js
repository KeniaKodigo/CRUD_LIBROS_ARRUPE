/** asignacion de variables */
const crudlibros = document.querySelector("#crudLibro");

const txtId = document.querySelector("#txtId");
const txtTitulo = document.querySelector("#txtTitulo");
const txtAutor = document.querySelector("#txtAutor");
const txtCategoria = document.querySelector("#txtCategoria");
const txtAnioPublicacion = document.querySelector("#txtAnioPublicacion");
const txtCantidad = document.querySelector("#txtCantidad");

//variables para el filtro de datos
const titulo_libro = document.querySelector("#titulo_libro");
const autor_libro = document.querySelector("#autor_libro");

//variables para los botones
const btnGuardar = document.querySelector("#btnGuardar");
const filasLibros = document.querySelector("#filasLibros");
const modalLibro = document.querySelector("#modalLibro");

//variables
let libro; //variable para la instancia de la clase
let nuevo_libro = true; //para validar que se registre el libro


//evento para agregar un libro
btnGuardar.addEventListener('click', (e)=> {
    if(nuevo_libro == true){
        //registrar un libro
        libro = new Libro(txtTitulo.value, txtAutor.value, txtCategoria.value, txtAnioPublicacion.value, txtCantidad.value);

        let resultado = Libro.agregar(libro);
        if(resultado == true){
            console.log("Agregado correctamente");
            tablaLibro("","");
            //cerrando el modal
            $('#modalLibro').modal('hide');
            vaciarModal();
        }else{
            console.log("No se pudo agregar el libro");
        }

    }else{
        //editar un libro
        libro.titulo = txtTitulo.value;
        libro.autor = txtAutor.value;
        libro.categoria = txtCategoria.value;
        libro.aniopublicacion = txtAnioPublicacion.value;
        libro.cantidad = txtCantidad.value;
        tablaLibro("","");
        vaciarModal();
        $('#modalLibro').modal('hide');
        
    }
})

function busquedaTitulo(){
    console.log(titulo_libro.value.toLowerCase());
    tablaLibro(titulo_libro.value.toLowerCase(), "");
}

function busquedaAutor(){
    console.log(autor_libro.value.toLowerCase());
    tablaLibro("", autor_libro.value.toLowerCase());
}

/** metodo para iterar los libros en la tabla */
function tablaLibro(titulo, autor){
    let tabla = "";

    /**
     * filtramos el titulo y autor del libro utilizando includes para incluir lo que la persona vaya digitando en los input
     * 
     * toLowerCase() => valida que la informacion la acepte en minuscula desde un principio
     */
    Libro.libros.filter((libro) => { return libro.titulo.includes(titulo) })
    .filter((libro) => { return libro.autor.includes(autor)})
    .map(libro => {
        let editar = `<button class='btn btn-info' onclick="editarLibro(${libro.id})" data-bs-toggle="modal" data-bs-target="#modalLibro">Editar</button>`;
        let eliminar = `<button class='btn btn-danger' onclick="eliminarLibro(${libro.id})">Eliminar</button>`;

        tabla += `<tr>
                    <td>${editar} ${eliminar}</td>
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.categoria}</td>
                    <td>${libro.aniopublicacion}</td>
                    <td>${libro.cantidad}</td>
                </tr>`;

        filasLibros.innerHTML = tabla;
    })
}

//metodo para vaciar el modal
function vaciarModal(){
    txtTitulo.value = "";
    txtAutor.value = "";
    txtCategoria.value = "";
    txtAnioPublicacion.value = "";
    txtCantidad.value = "";

    nuevo_libro = true;
}

function editarLibro(id){
    nuevo_libro = false;

    libro = Libro.obtenerIdLibro(id);
    //mandamos en los inputs el valor del libro que encontramos por su id
    txtId.value = libro.id;
    txtTitulo.value = libro.titulo;
    txtAutor.value = libro.autor;
    txtCategoria.value = libro.categoria;
    txtAnioPublicacion.value = libro.aniopublicacion;
    txtCantidad.value = libro.cantidad;
}

function eliminarLibro(id){
    let resultado = Libro.eliminar(id); //true o false
    if(resultado == true){
        tablaLibro("","");
    }
}