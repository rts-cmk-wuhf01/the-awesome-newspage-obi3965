const mysql = require('../config/mysql'); // mysql
async function getCategories() {
   let db = await mysql.connect();
   let [categories] = await db.execute(`
      SELECT category_id, category_title 
      FROM categories
      ORDER BY category_title ASC`);
   db.end();
   return categories;
}
module.exports = (app) => {

   //    // Test
   app.get('/database', async (req, res, next) => {
      let db = await mysql.connect();
      let [newspage] = await db.execute('SELECT * FROM articles');
      db.end();
      // res.send(products)
      // inde i routen
      res.render('newspage', {
         'newspage': newspage
      });
   })

   // Hvad skal der ske på denne side?
   // (...)

   app.get('/', async function (req, res, next) {

      // featurePostArea = [{
      //    image: "img/bg-img/19.jpg",
      //    postTitle: "FINANCE",
      //    description: "Pellentesque mattis arcu massa, nec fringilla turpis eleifend id.",
      //    time: "7:00 AM",
      //    date:"April 14"
      // }]
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();

      res.render('home.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories
      })



   })

   // Hvad skal der ske på denne side?
   // (...)

   app.get('/about', async function (req, res, next) {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      res.render('about.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories
      })
   })




   // Hvad skal der ske på denne side?
   // (...)

   // Overvej om jeg skal omdøbe denne route til: "articlesByCategory"

   app.get('/categories', async function (req, res, next) {
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();

      let commentsList = [{
         name: "JAMES SMITH",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/29.jpg",
         date: "06:34 am, April 14, 2018"
      },
      {
         name: "ANNA HANSEN",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/30.jpg",
         date: "06:34 am, April 15, 2018"
      },

      {
         name: "CHRISTINA PRIOR",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/31.jpg",
         date: "06:34 am, April 15, 2018"
      }
      ]
      res.render('categories.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories,
         "latestCommentsList": commentsList
      })


   })

   app.get('/categories/:category_id', async function (req, res, next) {

      let db = await mysql.connect();

      // Til Navigation
      let [categories] = await db.execute('SELECT * FROM categories');

      console.log(req.params.category_id);


      // Artikler der tilhører den valgte kategori
      let [articlesByCategory] = await db.execute(`
         SELECT
            *
         FROM articles
         WHERE fk_category_id = ?
         `,
         [req.params.category_id]
      );


      db.end();
      let commentsList = [{
         name: "JAMES SMITH",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/29.jpg",
         date: "06:34 am, April 14, 2018"
      },
      {
         name: "ANNA HANSEN",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/30.jpg",
         date: "06:34 am, April 15, 2018"
      },

      {
         name: "CHRISTINA PRIOR",
         text: "Facebook is offering facial recognition..",
         image: "img/bg-img/31.jpg",
         date: "06:34 am, April 15, 2018"
      }
      ]
      res.render('categories.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories,  // Nav
         "articlesByCategory": articlesByCategory,

         "latestCommentsList": commentsList
      })


   })


   app.get('/single-post', async function (req, res, next) {
      // DB: hent alle kategorier
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      console.log(categories)

      res.render('single-post.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories
      })
   })


   app.get('/contact', async function (req, res, next) {

      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');

      db.end();
      res.render('contact.ejs', {
         "title": "The News Paper - News &amp; Lifestyle Magazine Template",
         "categories": categories,

      })
   })

   app.post('/contact', async (req, res, next) => {

      let name = req.body.name;
      let email = req.body.email;
      let subject = req.body.subject;
      let message = req.body.message;
      let contactDate = new Date();

      let errorMessages = {};

      //here we should create an empty array to handle our all input messages
      let return_message = [];
      //for validation, it will push our all values into our empty array
      if (name == 'undefined' || name == '') {
         errorMessages.nameError = "Please Enter Your Name";
      }
      if (email == 'undefined' || email == '') {
         errorMessages.emailError = "Please Enter Your Email";
      }
      if (subject == 'undefined' || subject == '') {
         errorMessages.subjectError = "Please Enter Your Subject";
      }
      if (message == 'undefined' || message == '') {
         errorMessages.messageError = "Please Enter Your Message";
      }
      if (Object.keys(errorMessages).length > 0) {
         // Der har været en fejl i formular-input

         let categories = await getCategories(); // denne forklares lige om lidt!

         res.render('contact', {
            "title": "The News Paper - News &amp; Lifestyle Magazine Template",
            'categories': categories,
            'errorMessages': errorMessages,    // Object
            'values': req.body // læg mærke til vi "bare" sender req.body tilbage
         });

      } else {
         // Formular input er ok

         let db = await mysql.connect();

         try {
            let result = await db.execute(`
            INSERT INTO messages 
            (message_name, message_email, message_subject, message_text, message_date) 
            VALUES 
            (?,?,?,?,?)`, [name, email, subject, message, contactDate]);
            db.end();
            // send det modtagede data tilbage, så vi kan se det er korrekt
            // res.send(req.body);
            // affected rows er større end nul, hvis en (eller flere) række(r) blev indsat
            if (result[0].affectedRows > 0) {
               return_message.push('Tak for din besked, vi vender tilbage hurtigst muligt');
            } else {
               return_message.push('Din besked blev ikke modtaget.... ');
            }
         } catch (errors) {

         };

         let categories = await getCategories(); // denne har jeg ikke forklaret endnu! 
         
         console.log("Render after: try catch");
         
         res.render('contact', {
            "title": "The News Paper - News &amp; Lifestyle Magazine Template",
            'categories': categories,
            'return_message': return_message.join(', '),
            //  'values': []
         });
      }

   })

   app.get('/', (req, res, next) => {
      let now = new Date('2019-01-14 07:00:14');
      console.log(app.locals.dateAndTime.format(now, 'h:mm A | MMMM DD'));
   });

};


// Denne SQL henter alle artikler og tilhørende kategori
/*
SELECT
	articles.article_id,
	articles.article_title,
    articles.article_postdate,
    articles.article_image,

    categories.category_id,
    categories.category_title
FROM `articles`
INNER JOIN categories ON articles.fk_category_id = categories.category_id



*/