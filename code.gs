const POST_URL = '';

// In the Script Editor, run initialize() at least once to make your code execute on form submit
function initialize() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i in triggers) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
  ScriptApp.newTrigger('submitValuesToSlack')
    .forForm(FormApp.getActiveForm())
    .onFormSubmit()
    .create();
}

function submitValuesToSlack(e) {
  // Parse response
  const items = e.response.getItemResponses();
  let surveyResponse = '';
  for (i in items) {
    surveyResponse += `${items[i].getItem().getTitle()}: ${items[
      i
    ].getResponse()}\n`;
  }

  // Make a POST request with a JSON payload.
  const options = {
    method: 'post',
    contentType: 'application/json',
    // Convert the JavaScript object to a JSON string.
    payload: JSON.stringify({ surveyResponse }),
  };
  UrlFetchApp.fetch(POST_URL, options);
}
