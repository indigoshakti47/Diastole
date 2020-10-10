const express = require("express");
const router = express.Router();
var createError = require("http-errors");

const { analizarYResponderNivelUnoIVRExampleB } = require('../actions/WorkShopExample2Actions');
const { sendMessage, makeCall } = require('../avaya/functions');
const { createMessageUser } = require("../services/messageService");

router.post("/sendUserMessage", async (req, res, next) => {
  try {
    await createMessageUser(req.body.person)

    res.json({
      status: 200,
      response: "MESSAGE_SENT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    });
  } catch (err) {
    throw createError(err);
  }
});


// Bases
router.post("/panic", async (req, res, next) => {
  console.log(req.body);
  try {
    if (req.body.name && req.body.position && req.body.to) {
      const name = req.body.name;
      const nameCall = name.replace(/ /g, "%20");
      const position = req.body.position;
      const positionCall = position.replace(/ /g, "%20");
      const to = req.body.to;

      const xmlInbound = `http://cloud.zang.io/data/inboundxml/eea7a6551ecfd161ffd383b24aa37a07e3fa905b?name=${String(
        nameCall
      )}&position=${String(positionCall)}`;

      let body = `${name} está en peligro inminente y lanzó esta alerta. Ve a estas coordenadas ${position} o avisa a un superior por ayuda.`;

      //Envío el mensaje
      await sendMessage(to, body);

      //Hago la llamada
      await makeCall(to, xmlInbound);

      res.json({
        status: 200,
        response: "CREATED",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      });
    } else {
      throw new Error("Falta un dato.");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/service", async (req, res, next) => {
  try {
    if (req.body.example2 && req.body.digit) {
      let exampleType = req.body.example2;
      let digit = req.body.digit;
      switch (exampleType) {
        case "one":
          let case1 = await analizarYResponderNivelUnoIVRExampleB(digit);
          res.send(case1);
          break;
        default:
          //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
          break;
      }
    } else {
      throw new Error("No reconoce el dígito");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
