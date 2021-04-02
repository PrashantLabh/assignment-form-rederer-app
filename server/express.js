const express = require('express');
const mongoose = require('mongoose');
const modelForm = mongoose.model('forms');
const formInputs = mongoose.model('formvalues');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express();

  app.set('port', (process.env.PORT || 3000));

  app.set('view engine', 'ejs');
  
  app.use(cors());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  app.use('/form', async function(req, res, next){
            
          let { id } = req.query, form = null;

          console.log(id);
          if(!id) return res.render('NotFound')

          try {
            form = await modelForm.findById(id);
            console.log(">>>>>>>>", form);

          } catch(err){
            console.error("Error while fetching form data", err)
          }
           
          return res.render('Form', { form: form.formConfig, id})
      
  });


  app.post('/api/postForm',function(req, res, next){
    let { formId, formValues = {}} = req.body;

    if(!formId) return res.json({ success: false, message: "formId not found", statusCode: 500 });

    let newFormValue = new formInputs({formId,  formValues } );

    newFormValue.save()
      .then((resp) => {
        console.log(resp);
        res.json({ success: true, message: "Successfully saved the form", statusCode: 201, _id: resp._id })
      })
      .catch((err) => {
        console.log(err);
        res.json({ success: false, message: err, statusCode: 500 });
          
        });
});

  return app;
}