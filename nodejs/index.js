var fs = require('fs');
var SDK = require('ringcentral');
var FormData = require('form-data');
var Handlebars = require('handlebars');


var config = JSON.parse(fs.readFileSync('.env', 'utf8'));

var rcsdk = new SDK({ server: config.RC_APP_SERVER_URL,
  appKey: config.RC_APP_KEY,
  appSecret: config.RC_APP_SECRET });

function errorHandler(e) {
  console.error(e);
}


var formData = new FormData();

var body = {
  to: [{ phoneNumber: config.RC_DEMO_FAX_TO }],
  faxResolution: 'High',
  coverIndex: 0
};
formData.append('json', new Buffer(JSON.stringify(body)),
  {filename: 'request.json', contentType: 'application/json'});

var template = Handlebars.compile(fs.readFileSync(config.RC_DEMO_FAX_COVERPAGE_TEMPLATE, 'utf8'));
var data = {
  "fax_date": new Date(),
  "fax_pages": config.RC_DEMO_FAX_PAGES,
  "fax_to_name": config.RC_DEMO_FAX_TO_NAME,
  "fax_to_phone": config.RC_DEMO_FAX_TO,
  "fax_to_fax": config.RC_DEMO_FAX_TO,
  "fax_from_name": config.RC_DEMO_FAX_FROM_NAME,
  "fax_from_phone": config.RC_DEMO_FAX_FROM,
  "fax_from_fax": config.RC_DEMO_FAX_FROM,
  "fax_coverpage_text": config.RC_DEMO_FAX_COVERPAGE_TEXT
};
var result = template(data);
fs.writeFileSync('cover.html', result);
formData.append('attachment', fs.createReadStream('cover.html'),
    { filename: 'cover.html', contentType: 'text/html',
      knownLength: fs.statSync('cover.html')['size'] });

formData.append('attachment', fs.createReadStream(config.RC_DEMO_FAX_FILEPATH),
  { filename: 'asset_file.pdf', contentType: 'application/pdf',
    knownLength: fs.statSync(config.RC_DEMO_FAX_FILEPATH)['size'] });

rcsdk.platform()
  .login({
      username: config.RC_USER_USERNAME,
      extension: '',
      password: config.RC_USER_PASSWORD
  })
  .then(function(response) {
    rcsdk.platform().post('/account/~/extension/~/fax', formData)
      .then(function(){
        console.log('DONE');
        fs.unlinkSync('cover.html');
      }).catch(errorHandler);
  })
  .catch(errorHandler);
