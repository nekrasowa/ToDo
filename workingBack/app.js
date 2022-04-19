const express = require('express')
const { engine } = require('express-handlebars')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const port = 5000

const app = express()

const crypto = require('crypto');

const users = [
  {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
  }
];

const authTokens = {};


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.engine('.hbs', engine({ 
  extname: '.hbs', 
}))

app.set('view engine', '.hbs')
app.set('views', './views')

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256')
    const hash = sha256.update(password).digest('base64')
    return hash
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex');
}


app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);

    const user = users.find(u => {
        return u.email === email && hashedPassword === u.password
    });

    console.log('[users]', users)

    console.log('[user]', user)
    
    if (user) {
        const authToken = generateAuthToken();

        authTokens[authToken] = user;

        res.cookie('AuthToken', authToken);

        res.redirect('/protected');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});

app.post('/register', (req, res) => {
  console.log('[req.body]', req.body)
  const { email, firstName, lastName, password, confirmPassword } = req.body;

  // Проверьте, совпадают ли пароль
  if (password === confirmPassword) {

      // Проверьте, зарегистрирован ли пользователь с тем же адресом электронной почты
      if (users.find(user => user.email === email)) {

          res.render('register', {
              message: 'User already registered.',
              messageClass: 'alert-danger'
          });
          return;
        }

        const hashedPassword = getHashedPassword(password);

        users.push({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
});



app.get('/', function (req, res) {
  res.render('home');
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login');
});


app.use((req, res, next) => {
  const authToken = req.cookies['AuthToken'];

  req.user = authTokens[authToken];

  next();
});

app.get('/protected', (req, res) => {
  console.log('[req.user]', req.user)
  if (req.user) {
      res.render('protected');
  } else {
      res.render('login', {
          message: 'Please login to continue',
          messageClass: 'alert-danger'
      });
  }
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})




app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})

