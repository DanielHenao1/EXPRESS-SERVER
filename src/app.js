// codigo Desafio 6.0 Sincronico

// // Importa el módulo 'express' para crear una aplicación Express y la clase 'ProductManager' desde el archivo 'ProductManager.js'.
// import express from "express";
// import { ProductManager } from "./ProductManager.js";

// // Crea una instancia de la aplicación Express.
// const app = express();

// // Define el número de puerto en el que se ejecutará el servidor.
// const port = 8080;

// // Crea una instancia de la clase 'ProductManager' para gestionar productos.
// const productManager = new ProductManager();

// // Carga productos desde un archivo al iniciar la aplicación.
// // Esta llamada garantiza que los datos de productos se carguen en memoria.
// productManager.loadProductsFromFile();

// // Middleware para permitir que la aplicación parsee datos en formato JSON.
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Definición de rutas y endpoints de la aplicación:

// // Endpoint para obtener todos los productos.
// app.get('/products', (req, res) => {
//   // Verifica si se proporciona un parámetro 'limit' en la consulta.
//   const limit = req.query.limit;

//   if (limit) {
//     // Si se proporciona un 'limit', obtiene una cantidad limitada de productos.
//     const limitedProducts = productManager.getProducts().slice(0, limit);
//     res.json({ products: limitedProducts });
//   } else {
//     // Si no se proporciona un 'limit', devuelve todos los productos.
//     res.json({ products: productManager.getProducts() });
//   }
// });

// // Endpoint para obtener un producto por su ID.
// app.get('/products/:pid', (req, res) => {
//   // Obtiene el parámetro 'pid' de la URL, que representa el ID del producto deseado.
//   const productId = parseInt(req.params.pid);
//   // Busca el producto en la clase 'ProductManager' utilizando el ID.
//   const product = productManager.getProductById(productId);

//   if (product) {
//     // Si se encuentra el producto, responde con los detalles del producto.
//     res.json({ product });
//   } else {
//     // Si no se encuentra el producto, devuelve un código de estado 404 y un mensaje de error.
//     res.status(404).json({ error: 'Producto no encontrado' });
//   }
// });

// // Inicia el servidor Express y escucha en el puerto especificado.
// app.listen(port, () => {
//   console.log(`Servidor escuchando por el puerto: ${port}`);
// });

// Codigo Desafio 6.0 Asincronico

import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const port = 8080;
const productManager = new ProductManager();

// Función asincrónica para cargar productos desde un archivo al iniciar la aplicación.
const loadProducts = async () => {
  try {
    await productManager.loadProductsFromFile();
  } catch (error) {
    console.error("Error al cargar productos desde el archivo:", error);
  }
};

// Middleware para permitir que la aplicación parsee datos en formato JSON.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint para obtener todos los productos.
app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit);
      res.json({ products: limitedProducts });
    } else {
      res.json({ products });
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Endpoint para obtener un producto por su ID.
app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ error: "Error al obtener producto por ID" });
  }
});

// Función asincrónica para iniciar el servidor Express y escuchar en el puerto especificado.
const startServer = async () => {
  try {
    await loadProducts();
    app.listen(port, () => {
      console.log(`Servidor escuchando por el puerto: ${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

// Llama a la función para iniciar el servidor.
startServer();
