#EXPRESS.JS INSTALLATION
to enter npm init in our VSCODE Terminal, means that we should enter some information about our application such as Name Version of our application
`npm init`

But npm init -y will built our package.json application by default.
`npm init -y`

to install our express in package.json dependencies we should enter
`npm install express --save`

to install nodemon, will help us for not refreshing our terminal and browser page
for a small change in our code, it will updates automatically 


we should also install mysql2 because we will work with mysql2 Database
to install mysql2 in our dependencies enter below code
 `npm install mysql2 --save`

 
## ROUTING
it refers to our application where our endpoint(url) respond to our browser.
**how to define the route in express js**
we should use methods to define a routes.
our route should have more then one callback function as an argument and it is better to use next as argument for callback function to call for next endpoints.
`app.get('/home',(res,req,next){ res.send('<h1>it is made a get request to the homepage<h1>')})`

`app.post('contact',(req,res,next){res})`