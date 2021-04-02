require('./server/database');
require('./server/models/forms');
require('./server/models/formValues');

const app = require('./server/express')();

app.get('/script.js', function(req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + '/node_modules/zivame-assignment-universal-form-renderer/dist/src.a2b27638.js');
});

app.listen(app.get('port'), () => {
  console.log(`server listening on port ${app.get('port')}`);
});