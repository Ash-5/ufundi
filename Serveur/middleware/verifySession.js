class CheckLog {
  constructor() {

  }

  static connection(sessionName, request, response, fromPage, redirection, cb) {
    if (sessionName === undefined || sessionName === '' || sessionName === null) {
      request.session.forwardingURL = fromPage;
      response.redirect(redirection);
      return false;
    }
  }

  static onConnected(sessionName, response, request, go, cb) {
    if (sessionName !== undefined && sessionName !== '' && sessionName !== null) {
      response.redirect(go);
    } else {
      cb();
    }
  }

  static redirectIntentOr(request, response, go) {
    if (request.session.forwardingURL !== undefined && request.session.forwardingURL != '') {
      response.redirect(request.session.forwardingURL);
      request.session.forwardingURL = {};
      return false;
    }
  }
}
export default CheckLog;
