"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
function ensureAuthenticated(request, response, next) {
  // Receber o token
  var authToken = request.headers.authorization;
  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  var _a = authToken.split(" "),
    token = _a[1];
  try {
    // Validar se token é válido
    var sub = (0, jsonwebtoken_1.verify)(
      token,
      "4f93ac9d10cb751b8c9c646bc9dbccb9",
    ).sub;
    // Recuperar informações do usuário
    request.user_id = sub;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
exports.ensureAuthenticated = ensureAuthenticated;
