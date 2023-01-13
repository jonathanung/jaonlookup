const QueryController = require("../controllers/query-controller")


module.exports = app =>{
    app.post("/api/query/create",QueryController.createQuery)
    app.get("/api/query/getUserQueries", QueryController.getUserQueries)
    app.delete("/api/query/delete/:id",QueryController.deleteQuery)
}
