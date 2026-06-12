const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
      [name, email, hash, role],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        res.json({
          message: "Register Success",
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (result.length === 0)
        return res.status(404).json({ msg: "User Not Found" });

      const valid = await bcrypt.compare(
        password,
        result[0].password
      );

      if (!valid)
        return res.status(400).json({ msg: "Wrong Password" });

      const token = jwt.sign(
        {
          id: result[0].id,
          role: result[0].role,
        },
        "SECRETKEY",
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});

module.exports = router;