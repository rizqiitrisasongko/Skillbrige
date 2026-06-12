const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/",(req,res)=>{

 db.query(
  "SELECT * FROM trainings WHERE status='approved'",
  (err,result)=>{
   res.json(result);
  }
 );

});

router.post("/",(req,res)=>{

 const {
   title,
   category,
   level,
   description,
   mentor,
   price,
   quota
 } = req.body;

 db.query(
   `INSERT INTO trainings
   (title,category,level,description,mentor,price,quota,status)
   VALUES(?,?,?,?,?,?,?,'pending')`,
   [
     title,
     category,
     level,
     description,
     mentor,
     price,
     quota
   ]
 );

 res.json({
  message:"Training Submitted"
 });

});

module.exports = router;