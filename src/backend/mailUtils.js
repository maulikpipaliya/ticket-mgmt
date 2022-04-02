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

function sendResolveMail(toList, ccList){
  const htmlBody = "<h5>Below ticket has been marked resolved by the technician. Please review and close.</h5>"


  MailApp.sendEmail({
    to: toList.join(','),
    subject: "FixIT | Ticket to Review",
    cc: ccList.join(','),
    htmlBody: htmlBody,
  });
}