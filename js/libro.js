/** en este apartado se va trabajar con la clase */

class Libro{
    //asignando atributos
    id
    titulo
    autor
    categoria
    aniopublicacion
    cantidad
    static libros = []
    static ultimoId = 1

    /** asignacion de metodos */
    constructor(titulo, autor, categoria, aniopublicacion, cantidad){
        this.id = 0;
        this.titulo = titulo;
        this.autor = autor;
        this.categoria = categoria;
        this.aniopublicacion = aniopublicacion;
        this.cantidad = cantidad;
    }

    /** metodo para agregar un libro */
    static agregar(libro){
        libro.id = Libro.ultimoId;
        Libro.libros.push(libro); //agregamos un objeto al arreglo libros
        Libro.ultimoId++; //incrementamos el id una vez que se haya ingresado un libro al arreglo
        return true;
    }

    /** metodo para obtener el id del libro en especifico para actualizarlo */
    static obtenerIdLibro(id){
        //find() => encuentra y devuelve la primera coincidencia que cumpla la condicion
        return Libro.libros.find(elemento => elemento.id == id);
    }

    /** metodo de filtro */
    static obtenerNombre(nombre){
        return Libro.libros.filter(libro => libro.titulo == nombre);
    }

    static obtenerAutor(autor){
        return Libro.libros.filter(libro => libro.autor == autor);
    }

    /** metodo para eliminar un libro */
    static eliminar(id){
        //Libro.libro.filter(libro => libro.titulo != titulo);

        //findIndex => devuelve el indice de un arreglo, si encuentra el indice retorna true y sino no lo encuentra retorna false
        let index = Libro.libros.findIndex(libro => libro.id == id);
        //false = -1
        //true = indice 
        if(index == -1){
            return false;
        }else{
            //splice => Elimina los indices que le indicamos del arreglo
            Libro.libros.splice(index, 1);
            return true;
        }
    }
}

/*libro = new Libro("Clean Code","Robert","Informatica",1968,10);
Libro.agregar(libro);
libro2 = new Libro("Harry Potter","Antonio","Aventura",1975,5);
Libro.agregar(libro2);
console.log(Libro.libros);
console.log(Libro.obtenerNombre("Cl"));*/
//Libro.ultimoId