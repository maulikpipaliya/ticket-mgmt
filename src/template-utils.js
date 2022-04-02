function include(fileName, params) {
  return render(fileName, params).getContent();
}

function render(path, params) {
  let htmlBody = HtmlService.createTemplateFromFile(path);
  htmlBody.allParams = {};

  if (params) {
    htmlBody.allParams = params;
    Object.keys(params).forEach((key) => {
      htmlBody[key] = params[key];
    });
  }
  return htmlBody.evaluate();
}

function redirect(redirectURL) {
  return HtmlService.createHtmlOutput(
    "<a href='" + redirectURL + "' id='redirectURLAnchor'></a>" +
    "<script>document.getElementById('redirectURLAnchor').click();</script>");
}