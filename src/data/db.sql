DROP DATABASE IF EXISTS biblioteca;

CREATE DATABASE biblioteca;
USE biblioteca;


CREATE TABLE alumnos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO alumnos (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('José', 'Montilla', '2000-01-01'),
  ('Juan', 'Lucena', '2000-01-01'),
  ('Ana', 'Lucena', '2000-01-01');


CREATE TABLE profesores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    estado_civil VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO profesores (nombre, especialidad, estado_civil) 
VALUES 
  ('José Profe', 'Matemáticas', 'Casado'),
  ('Juan Profe', 'Lengua', 'Casado'),
  ('Ana Profe', 'Inglés', 'Casado');

CREATE TABLE autores (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    lugar_de_nacimiento VARCHAR(200),
    premio_nobel BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO autores (nombre, lugar_de_nacimiento, premio_nobel)
VALUES
  ('Gabriel García Márquez', 'Aracataca', TRUE),
  ('Jane Austen', 'Steventon', FALSE),
  ('Ernest Hemingway', 'Oak Park', TRUE),
  ('Isabel Allende', 'Lima', FALSE);


CREATE TABLE libros (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    editorial VARCHAR(200),
    fecha_de_publicacion DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO libros (titulo, editorial, fecha_de_publicacion)
VALUES
  ('Cien años de soledad', 'Sudamericana', '1967-05-30'),
  ('Orgullo y prejuicio', 'T. Egerton', '1813-01-28'),
  ('El viejo y el mar', 'Scribner', '1952-09-01'),
  ('La casa de los espíritus', 'Plaza & Janés', '1982-01-01');
