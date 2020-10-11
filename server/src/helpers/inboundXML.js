/*
 * INBOUND CALL IVR FINANCE TWO FACTOR AUTHUENTICATION.
 */
const EXAMPLE2_MENU = "https://cloud.zang.io/data/inboundxml/57ac2ed0fe227b80270f45ff66d57d08b7d5e8f6";
const EXAMPLE2_INPUT_NUMERO_DE_CUENTA = "https://cloud.zang.io/data/inboundxml/cc7932316b2081620c9f9e6659529a783c5d7607";
const EXAMPLE2_SMS_PIN = "https://cloud.zang.io/data/inboundxml/2b2485ca956a7cdce8a49e92841250beff503413";
const EXAMPLE2_SALDO_ACTUAL = "https://cloud.zang.io/data/inboundxml/253f4b1c9bc22a054e42f5324d6e74aeab30573d";
const EXAMPLE2_HORARIOS_DE_ATENCION = "https://cloud.zang.io/sandbox/editor/view/21589/";
const EXAMPLE2_TRANSFERENCIA = "https://cloud.zang.io/data/inboundxml/cc7932316b2081620c9f9e6659529a783c5d7607";
const EXAMPLE2_ERROR_CON_CAUSA = "https://cloud.zang.io/data/inboundxml/57ac2ed0fe227b80270f45ff66d57d08b7d5e8f6";

function setRedirectInboundXML(redirectInboundXML, causa) {
  return "<Response>" + "<Redirect method=\"GET\">" + redirectInboundXML + "?causa=" + causa + "</Redirect>"
    + "</Response>";
}

function setNumeroDeCuentaEnXML(numeroDeCuenta) {
  return EXAMPLE2_SMS_PIN + "?numerodecuenta=" + numeroDeCuenta;
}

function setRedirectInboundXML(redirectInboundXML) {
  return "<Response>" + "<Redirect method=\"GET\">" + redirectInboundXML + "</Redirect>" + "</Response>";
}

module.exports.setRedirectInboundXML = setRedirectInboundXML;
module.exports.setNumeroDeCuentaEnXML = setNumeroDeCuentaEnXML;
module.exports.setRedirectInboundXML = setRedirectInboundXML;
module.exports.InboundXML = {
  EXAMPLE2_MENU, EXAMPLE2_INPUT_NUMERO_DE_CUENTA, EXAMPLE2_SMS_PIN, EXAMPLE2_SALDO_ACTUAL,
  EXAMPLE2_HORARIOS_DE_ATENCION, EXAMPLE2_TRANSFERENCIA, EXAMPLE2_ERROR_CON_CAUSA
};