const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const OPENFOODFACTS_API = process.env.OPENFOODFACTS_API || "https://world.openfoodfacts.org";

app.get("/api/products", async (req, res) => {
  try {
    const { page = 1, pageSize = 20, category, query, sort } = req.query;
    let url = `${OPENFOODFACTS_API}/cgi/search.pl?action=process&json=true&page=${page}&page_size=${pageSize}`;

    if (category) {
      url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}`;
    }

    if (query) {
      url += `&search_terms=${query}`;
    }

    const response = await axios.get(url);
    let products = response.data.products;

    // Custom sorting
    if (sort) {
      switch (sort) {
        case "product_name":
          products.sort((a, b) => a.product_name.localeCompare(b.product_name));
          break;
        case "-product_name":
          products.sort((a, b) => b.product_name.localeCompare(a.product_name));
          break;
        case "nutrition_grades":
          products.sort((a, b) => {
            const gradeA = a.nutrition_grades
              ? a.nutrition_grades.charCodeAt(0)
              : Infinity;
            const gradeB = b.nutrition_grades
              ? b.nutrition_grades.charCodeAt(0)
              : Infinity;
            return gradeA - gradeB;
          });
          break;
        case "-nutrition_grades":
          products.sort((a, b) => {
            const gradeA = a.nutrition_grades
              ? a.nutrition_grades.charCodeAt(0)
              : -Infinity;
            const gradeB = b.nutrition_grades
              ? b.nutrition_grades.charCodeAt(0)
              : -Infinity;
            return gradeB - gradeA;
          });
          break;
      }
    }

    res.json({
      count: response.data.count,
      page: response.data.page,
      page_size: response.data.page_size,
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching products" });
  }
});

app.get("/api/categories", async (req, res) => {
  try {
    const response = await axios.get(`${OPENFOODFACTS_API}/categories.json`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching categories" });
  }
});

app.get("/api/product/:barcode", async (req, res) => {
  try {
    const { barcode } = req.params;
    const response = await axios.get(
      `${OPENFOODFACTS_API}/api/v0/product/${barcode}.json`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching product details" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
