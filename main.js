var translate = require('translate-api');

var fs = require('fs');
var path = require('path');

function text2fr(transText) {
  return translate.getText(transText, { from: 'en', to: 'fr' });
}

var frJson = fs.readFileSync(path.resolve(__dirname, 'fr.json'), 'utf8');

var words = JSON.parse(frJson);

var messages = {};

var job = Object.keys(words).reduce((job, key) => {
  var word = words[key];
  return job.then(_ => {
    console.log('Translating ', word);
    return text2fr(word).then(translation => {
      messages[key] = translation.text;
      console.log('Got ', translation.text);
      return translation;
    });
  });
}, Promise.resolve());

job.then(_ => {
  fs.writeFileSync(
    path.resolve(__dirname, 'en.json'),
    JSON.stringify(messages, null, 2),
  );
  console.log('Succès');
});
