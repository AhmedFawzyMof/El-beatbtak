const express = require("express");
const router = express.Router();
const cache = require("../routerCache");
const Main = require("../controller/Main.controller");

router.get("/", Main.GetHome);
router.get("/category/:name", Main.Category);
router.post("/search", Main.Search);
router.get("/product/:id", Main.ProductById);
router.get("/menu", Main.Menu);
// router.get("/fav", Main.Favourite);
router.get("/contact", Main.Contact);
// router.post("/getFurnture", Main.FavouriteFurniture);

module.exports = router;
