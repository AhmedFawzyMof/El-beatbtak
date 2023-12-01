const db = require("../db/index");
const promisePool = db.promise();

const controller = {
  GetHome: async (req, res) => {
    const [categories, _] = await promisePool.query("SELECT * FROM Categories");
    const [offers, __] = await promisePool.query("SELECT * FROM Offers");
    const [products, ___] = await promisePool.query("SELECT * FROM Products");

    offers.forEach((offer) => {
      offer.image = offer.image.toString("base64");
    });

    res.render("index", {
      categories: categories,
      offers: offers,
      products: products,
    });
  },
  Category: async (req, res) => {
    const name = req.params.name;

    const [Furniture, _] = await promisePool.query(
      "SELECT * FROM Products WHERE category = ?",
      name
    );

    res.render("category", {
      Furniture: Furniture,
      search: undefined,
    });
  },
  Search: async (req, res) => {
    const { search } = req.body;

    let query = `%${search}%`;

    const [Furniture, _] = await promisePool.query(
      "SELECT * FROM Products WHERE name LIKE ? OR price LIKE ?",
      [query, query]
    );

    res.render("search", {
      Furniture: Furniture,
      search: search,
    });
  },
  ProductById: async (req, res) => {
    const id = req.params.id;
    const [Furniture, _] = await promisePool.query(
      "SELECT * FROM Products WHERE id = ?",
      id
    );
    Furniture[0].image = Furniture[0].image.toString("base64");

    res.render("product", {
      f: Furniture[0],
    });
  },
  Favourite: (req, res) => {
    res.render("favourite");
  },
  Menu: (req, res) => {
    res.render("menu");
  },
  FavouriteFurniture: async (req, res) => {
    const ids = req.body.ids;
    if (ids.length > 0) {
      const [Furniture, _] = await promisePool.query(
        "SELECT * FROM Furniture WHERE id IN (?)",
        [ids]
      );
      Furniture.forEach((f) => {
        f.image = f.image.toString("base64");
      });
      res.json({
        Furniture: Furniture,
      });
      return;
    }
    res.json({
      Furniture: [],
    });
  },
  Contact: async (req, res) => {
    res.render("contactus");
  },
};

module.exports = controller;
