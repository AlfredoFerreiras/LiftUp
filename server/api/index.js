const router = require("express").Router();
module.exports = router;

const companyRoutes = require("./company");
const googleRoutes = require("./googleai");

router.use("/users", require("./users"));

router.use("/companies", companyRoutes);
router.use("/googleai", googleRoutes);
router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
