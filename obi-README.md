#EXPRESS.JS INSTALLATION


to enter npm init in our VSCODE Terminal, means that we should enter some information about our application such as Name Version of our application
`npm init`



But npm init -y will built our package.json application by default.
`npm init -y`



to install our express in package.json dependencies we should enter following
`npm install express --save`



to install morgan in our package.json dependencies,why are we using morgan here,
we should enter following.
if we notice in our terminal it shows that in how many milliseconds the pages have been loaded. 
`npm install morgan --save`



to install express template engine in our package.json dependencies, we should enter following.because here are using we the template engine called (EJS); 
`npm install ejs --save`



to install express body-parser in our package.json dependencies, we should enter 
following.
`npm install body-parser --save`

to install nodemon, will help us for not refreshing our terminal and browser page
for a small change in our code,just save and it will updates automatically 


we should also install mysql2 because we will work with mysql2 Database
to install mysql2 in our dependencies enter below code
 `npm install mysql2 --save`

now our all installation is saved in our package.json dependencies.
**what dose dependencies means**
it means that what our app depends on

at the end our package.json should look like this
`{
  "name": "the-awesome-newspage",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/rts-cmk/the-awesome-newspage.git"
  },
  "keywords": [],
  "author": "Jack Baltzer",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/rts-cmk/the-awesome-newspage/issues"
  },
  "homepage": "https://github.com/rts-cmk/the-awesome-newspage#readme",
  "dependencies": {
    "body-parser": "^1.19.0",
    "date-and-time": "^0.7.0",
    "ejs": "^2.6.1",
    "express": "^4.17.0",
    "morgan": "^1.9.1",
    "mysql2": "^1.6.5"
  }
}
`

## ROUTING
it refers to our application where our endpoint(url) respond to our browser.
**how to define the route in express js**
we should use methods to define a routes.
our route should have more then one callback function as an argument and it is better to use next as argument for callback function to call for next endpoints.
`app.get('/home',(res,req,next){ res.send('<h1>it is made a get request to the homepage<h1>')})`


i think we can only use post methods, when we work on forms
`app.post('contact',(req,res,next){res.send('<form>it will send post request to our contact page</form>')})`