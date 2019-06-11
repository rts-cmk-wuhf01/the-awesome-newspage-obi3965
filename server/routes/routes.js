const mysql = require('../config/mysql'); // mysql

module.exports = (app) => {

   app.get('/database', async(req,res,next)=>{
      let db = await mysql.connect();
      let [newspage] = await db.execute('SELECT * FROM articles');
      db.end();
      // res.send(products)
      // inde i routen
      res('newspage', {
       'newspage': newspage
});
   })     
   
   
   app.get('/', async function(req, res, next){

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

      res.render('home.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories
      }) 
   
      
      
   })
   
   app.get('/about', async function(req,res, next){
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      res.render('about.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories
      })
   })
   
   app.get('/catagories-post',async function(req,res, next){
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
       
      let commentsList = [{
         name: "JAMES SMITH",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/29.jpg",
         date: "06:34 am, April 14, 2018"
      },
      {
         name: "ANNA HANSEN",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/30.jpg",
         date: "06:34 am, April 15, 2018"
      },
      
      {
         name: "CHRISTINA PRIOR",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/31.jpg",
         date: "06:34 am, April 15, 2018"
      }
   ]
      res.render('catagories-post.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories,
         "latestCommentsList": commentsList
      })

      
   })

   app.get('/categories-post/:category_id',async function(req,res, next){
      
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      let commentsList = [{
         name: "JAMES SMITH",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/29.jpg",
         date: "06:34 am, April 14, 2018"
      },
      {
         name: "ANNA HANSEN",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/30.jpg",
         date: "06:34 am, April 15, 2018"
      },
      
      {
         name: "CHRISTINA PRIOR",
         text:"Facebook is offering facial recognition..",
         image:"img/bg-img/31.jpg",
         date: "06:34 am, April 15, 2018"
      }
   ]
      res.render('catagories-post.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories,
         "latestCommentsList": commentsList
      })

      
   })

   
   app.get('/single-post', async function(req, res, next){
      // DB: hent alle kategorier
      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      console.log(categories)

      res.render('single-post.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories
      })
   })
   
   
   app.get('/contact',async function(req, res, next){

      let db = await mysql.connect();
      let [categories] = await db.execute('SELECT * FROM categories');
      db.end();
      res.render('contact.ejs',{
         "title":"The News Paper - News &amp; Lifestyle Magazine Template",
         "categories":categories,
      })
   })

       
   // app.get('/', (req, res, next) => {
   //    let now = new Date('2019-01-14 07:00:14');
   //    console.log(app.locals.dateAndTime.format(now, 'h:mm A | MMMM DD'));
   // });

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