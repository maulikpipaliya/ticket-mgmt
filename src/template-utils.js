function include(fileName) {
    return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}

function render(path, params) {
    const htmlBody = HtmlService.createTemplateFromFile(path);

    if (params) {
        Object.keys(params).forEach(key => {
            htmlBody[key] = params[key];
        });
    }
    return htmlBody.evaluate();
}