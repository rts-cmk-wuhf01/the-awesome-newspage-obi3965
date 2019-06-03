module.exports = (app) => {

   app.get('/', (req, res, next) => {
      res.render('home');
   });

   app.get('/home', (req, res, next) => {
      let now = new Date('2019-01-14 07:00:14');
      console.log(app.locals.dateAndTime.format(now, 'h:mm A | MMMM DD'));
   });

};