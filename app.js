// indlæs express modulet, dette er vores serverprogram
const express = require('express');


// opret en express applikation 
const app = express();


// const date = require('date-and-time'); // Gammel (slettes om lidt)

app.locals.dateAndTime = require('date-and-time');


// let now = new Date(); 
// let formattedDate = app.locals.dateAndTime.format(now, 'D/M/YYYY');
// console.log("Obis dato:", formattedDate )

/* aktiver serverside console.log af side indlæsninger. 
 * Dette sættes op så vi kan følge med i hvilke HTML filer 
 * og ROUTES der forsøges at blive indlæst */
const logger = require('morgan');
app.use(logger('dev', {
   // hvis ALLE requests skal ses i loggen, udkommenter næste linje
   skip: req => (!req.url.endsWith(".html") && req.url.indexOf('.') > -1)
}));



// sæt viewengine til ejs 
app.set('view engine', 'ejs');
// peg på den mappe hvor alle views filerne er placeret
app.set('views', './server/views');

app.locals.dateAndTime = require('date-and-time');

app.get('/home', function(req, res){

   // let commentList = [
   //    {   
   //       name:"finance",
   //       text: "Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
   //       date: "7:00 AM | April 14"

   //        },
   // ]
   res.render('home.ejs',{
      
      "title":"The News Paper - News &amp; Lifestyle Magazine Template"
   })
})

app.get('/about', function(req,res){
   res.render('about.ejs',{
      "title":"The News Paper - News &amp; Lifestyle Magazine Template"
   })
})

app.get('/catagories-post', function(req,res){
   res.render('catagories-post.ejs',{
      "title":"The News Paper - News &amp; Lifestyle Magazine Template"
      
   })
})

app.get('/single-post', function(req, res){
   res.render('single-post.ejs',{
      "title":"The News Paper - News &amp; Lifestyle Magazine Template"
      
   })
})


app.get('/contact', function(req, res){
   res.render('contact.ejs',{
      "title":"The News Paper - News &amp; Lifestyle Magazine Template"
   })
})

/* indlæs alle de routes serveren skal håndtere
 * dette sker igennem en ny fil, for at splitte koden op i smartere blokke */
require('./server/routes/routes.js')(app);

/* sæt serveren op så den kan servere html/css/javascript
 * og billeder direkte fra public mappen, efter alle routes er kørt */
app.use(express.static('public'));



// start serveren på port 3000 
const port = 3001;
app.listen(port, (error) => {
   if (error) console.log(error);
   console.log('\x1b[35m%s\x1b[0m', '================================================================'); // udskriver en lilla streg i konsol
   console.log('Server is listening on port %s, address: %s', port, 'http://localhost:' + port);
});
