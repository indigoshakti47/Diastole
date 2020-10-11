/**
 * Returns the necessary data for the application to start.
 * 
 * @return {Object}
 */
function getFirebaseCredentials() {
  return {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
      auth_uri: process.env.AUTH_URI,
      token_uri: process.env.TOKEN_URI,
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
  };
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
}

module.exports.getFirebaseCredentials = getFirebaseCredentials;
module.exports.errorHandler = errorHandler;