const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { getAllBeneficiaries, createBeneficiaries } = require("../services/beneficiariesService");

router.get("/allBeneficierie", async (req, res, next) => {

  try {

    const beneficiaries = await getAllBeneficiaries(req.body.limit)

    res.json({
      status: 200,
      beneficiaries: beneficiaries
    });

  } catch (err) {
    throw createError(err);
  }

});

router.post("/beneficierie", async (req, res, next) => {

  try {

    const beneficiaries = await createBeneficiaries()

    res.json({
      status: 200,
      beneficiaries: beneficiaries
    });

  } catch (err) {
    throw createError(err);
  }

});

module.exports = router;