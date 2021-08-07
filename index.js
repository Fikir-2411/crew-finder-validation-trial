const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult, checkSchema } = require('express-validator');
const userRouter = require('./routes/registration.route');
const path = require('path');
// const { validate } = require('./validate');
// const { registrationSchema } = require('./registrationValidation');

const app = express();
const port = 3000;

const registrationSchema = {
    username: {
      custom: {
        options: (value) => {
          return User.find({
            username: value,
          }).then((user) => {
            if (user.length > 0) {
              return Promise.reject("Username already in use");
            }
          });
        },
      },
    },
    gender: {
      notEmpty: true,
      errorMessage: "Gender field cannot be empty",
    },
    password: {
      isStrongPassword: {
        minLength: 6,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
      },
      errorMessage:
        "Password must be greater than 6 and contain at least 1 lowerCase, 1 upperCase and 1 number",
    },
    phone: {
      notEmpty: true,
      errorMessage: "Phone number cannot be empty",
    },
    email: {
      normalizeEmail: true,
      custom: {
        options: (value) => {
          return User.find({
            email: value,
          }).then((user) => {
            if (user.length > 0) {
              return Promise.reject("Email address is taken");
            }
          });
        },
      },
    },
  };


  const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if(errors.isEmpty){
            return next();
        }

        res.status(400).json({
            errors: errors.array,
        });
    };
};



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json);
app.use((req, res, next) =>{
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl} ${req.url} ${delta}`);
});


app.use('/site', express.static(path.join(__dirname,'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Page Title',
        caption: 'This seems working!',
    });
});

app.use('/register', userRouter);



// app.post('/register',validate(checkSchema(registrationSchema)) , (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Registration was successful",
//     });
// });

// app.post('/register', validate(checkSchema(registrationSchema)), userController.httpRegister)
// app.get('/registered', userController.httpGetRegisters);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});