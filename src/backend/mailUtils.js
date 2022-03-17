function getEmailHtml(){
  return "<h5>There's a new ticket in your bucket</h5>"
}


function sendMail(toList, ccList) {

  const htmlBody = "<h5>There's a new ticket in your bucket</h5>"


  MailApp.sendEmail({
    to: toList.join(','),
    subject: "New Ticket in your Bucket! 🧺",
    cc: ccList.join(','),
    htmlBody: htmlBody,
  });
}