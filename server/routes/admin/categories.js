const mysql = require("../../config/mysql"); // mysql

async function getCategories(){
    let db = await mysql.connect();
    let [categories] = await db.execute(`
    SELECT category_id,
    category_title FROM categories 
    ORDER BY category_title ASC
    `);

    db.end();
    return categories;
}
module.exports = (app) => {
    app.get('/admin/admin_categories', async(req,res,next)=>{

        let categories = await getCategories();
        res.render('admin/admin_categories.ejs',{
            'categories':categories,
            'adminCategoriesTitle': 'my Admin'
        })
     })

     app.post('/admin/admin_categories', async(req,res,next)=>{

        res.render('admin/admin_categories.ejs',{
            'categories':categories,
            'adminCategoriesTitle': 'my Admin'
            
        })
     })

     app.get("/admin/categories/edit/:category_id", async (req, res, next) => {
        // denne route skal hente både alle kategorier og den ene kategori
        // data skal sendes til template filen
      });

      app.post("/admin/categories/edit/:category_id", async (req, res, next) => {
        // tag form data og parameter fra endpoint og opdater databasen
        // send bruger tilbage til kategori admin listen
      });

      app.get("/admin/categories/delete/:category_id", async (req, res, next) => {
        // benyt endpoint parameter til at slette en kategori fra databasen
        // send bruger tilbage til kategori admin listen
      });
}