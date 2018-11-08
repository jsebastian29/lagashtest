const TareasDao = require("../models/TareasDao");

class TareasList {
  /**
   * Handles the various APIs for displaying and managing tasks
   * @param {tareasDao} tareasDao
  */
 constructor(tareasDao) {
 this.tareasDao = tareasDao;
 }
 async showTasks(req, res) {
   const querySpec = {
     query: "SELECT * FROM root r WHERE r.completed=@completed",
     parameters: [
       {
         name: "@completed",
         value: false
       }
     ]
   };

   const items = await this.tareasDao.find(querySpec);
   res.render("index", {
     title: "Mis Tareas Pendientes",
     tasks: items
   });
 }

 async addTarea(req, res) {
   const item = req.body;

   await this.tareasDao.addItem(item);
   res.redirect("/");
 }

 async completeTarea(req, res) {
   const completedTareas = Object.keys(req.body);
   const tareas = [];

   completedTareas.forEach(tarea => {
     tareas.push(this.tareasDao.updateItem(tarea));
   });

   await Promise.all(tareas);

   res.redirect("/");
 }
}

module.exports = TareasList;