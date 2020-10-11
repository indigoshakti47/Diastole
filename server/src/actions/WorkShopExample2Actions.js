const { setRedirectInboundXML, InboundXML } = require("../helpers/inboundXML");

async function analizarYResponderNivelUnoIVRExampleB(digit) {
  switch (digit) {
    case "1":
      return setRedirectInboundXML(
        InboundXML.EXAMPLE2_INPUT_NUMERO_DE_CUENTA);
    case "2":
      return setRedirectInboundXML(
        InboundXML.EXAMPLE2_INPUT_NUMERO_DE_CUENTA);
    case "0":
      return setRedirectInboundXML(
        InboundXML.EXAMPLE2_INPUT_NUMERO_DE_CUENTA);
    default:
      //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      break;
  }
}

module.exports.analizarYResponderNivelUnoIVRExampleB = analizarYResponderNivelUnoIVRExampleB;
