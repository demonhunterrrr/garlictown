const express = require("express");
const router  = express.Router();

// http requests
router.get("/", (req, res) => {
    res.render('../public/headliners/index');
});

module.exports = router;