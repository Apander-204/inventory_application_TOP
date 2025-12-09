const pool = require('./pool');
require('dotenv').config();

const schema = process.env.SCHEMA_NAME;

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT DISTINCT category FROM ${schema}.products`);
  return rows;
}

async function getProduct(name) {
  const { rows } = await pool.query(`SELECT * FROM ${schema}.products WHERE name = $1`, [name]);
  return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query(`SELECT * FROM ${schema}.products`);
  return rows;
}

async function getProductsInCategory(category) {
  const { rows } = await pool.query(`SELECT * FROM ${schema}.products WHERE category = $1`, [category]);
  return rows;
}

async function createProduct(name, category, brand, price) {
  await pool.query(`INSERT INTO ${schema}.products (name, category, brand, price) VALUES ($1, $2, $3, $4)`, [name, category, brand, price]);
  return "Success";
}

async function deleteCategory(category) {
  await pool.query(`DELETE FROM ${schema}.products WHERE category = $1`, [category]);
  return "Success";
}

async function deleteProduct(product_name) {
  await pool.query(`DELETE FROM ${schema}.products WHERE name = $1`, [product_name]);
  return "Success";
}

async function deleteIdProduct(product_id) {
  await pool.query(`DELETE FROM ${schema}.products WHERE id = $1`, [product_id]);
  return "Success";
}

module.exports = {
    getAllCategories,
    getProductsInCategory,
    createProduct,
    getAllProducts,
    deleteCategory,
    deleteProduct,
    getProduct,
    deleteIdProduct
};