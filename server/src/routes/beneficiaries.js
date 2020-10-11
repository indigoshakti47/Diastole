const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { getAllBeneficiaries, createBeneficiaries, getOneBeneficiarie, setOneBeneficiarie } = require("../services/beneficiariesService");

router.get("/allBeneficierie", async (req, res, next) => {

  try {
    const { limit } = req.query;
      
    const beneficiaries = await getAllBeneficiaries(limit)

    res.json({
      status: 200,
      beneficiaries: beneficiaries
    });

  } catch (err) {
    throw createError(err);
  }

});

router.get("/beneficierie", async (req, res, next) => {

  try {
    const { document_number } = req.query;
      
    const beneficiaries = await getOneBeneficiarie(document_number)

    res.json({
      status: 200,
      beneficiarie: beneficiaries
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

router.put("/beneficierie", async (req, res, next) => {
  try {

    const { document_number, code } = req.query;
    
    await setOneBeneficiarie(document_number, code)
    
    res.json({
      status: 200,
      message: "BENEFICIARIE_UPDATED"
    });

  } catch (err) {
    throw createError(err);
  }

});

module.exports = router;