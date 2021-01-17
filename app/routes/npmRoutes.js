const express = require("express");
const router = express.Router();

const DependenciesController = require('../controllers/dependencies');

//get all dependencies
router.get("/:dependenciesName", DependenciesController.get_all_dependencies);

module.exports = router;