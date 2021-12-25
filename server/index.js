const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
// import { validate } from "./validations.mjs";

/*
 *  SET UP
 */
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "aumiau",
});
app.listen(3001, () => {
  console.log("Servidor iniciado.");
});
app.get("/db_setup", () => {
  // Before running these, manually record your especies in DB. ---> {id: 1, name: "Cachorro"}, {id: 2, name: "Gato"} <---
  let racasCachorro = [
    "Vira-lata",
    "Shih Tzu",
    "Yorkshire",
    "Poodle",
    "Lhasa Apso",
    "Buldogue",
    "Golden Retriever",
    "Labrador",
    "Pug",
    "Maltês",
    "Pit Bull",
    "Pinscher",
    "Galgo",
    "Terrier",
    "Lulu da Pomerânia",
  ];
  racasCachorro.sort();
  for (let raca of racasCachorro) {
    db.query(
      `INSERT INTO racas (idespecie, name) VALUES (1, '${raca}')`,
      (err) => {
        err
          ? console.log(err)
          : console.log(`Raça "${raca}" inserida com sucesso.`);
      }
    );
  }
  let racasGato = [
    "Vira-lata",
    "Persa",
    "Maine Coon",
    "Gato-de-bengala",
    "Gato de Pelo Curto Inglês",
    "Siamês",
    "Bombaim",
    "Ragdoll",
    "Sphynx",
    "Munchkin",
    "Siberiano",
    "Angorá",
    "Abssínio",
  ];
  racasGato.sort();
  for (let raca of racasGato) {
    db.query(
      `INSERT INTO racas (idespecie, name) VALUES (2, '${raca}')`,
      (err) => {
        err
          ? console.log(err)
          : console.log(`Raça "${raca}" inserida com sucesso.`);
      }
    );
  }
});

app.use(cors());
app.use(express.json());

/*
 *  REGISTER
 */
app.post("/register", (req, res) => {
  // Validating...
  if (
    !!req.body.name == false ||
    !!req.body.cpf == false ||
    !!req.body.email == false ||
    !!req.body.password == false ||
    !!req.body.birth == false
  ) {
    res.send({ errors: [{ field: "all", msg: "Preencha todos os campos." }] }); // Must fill all fields
  }
  const errors = validate(req.body);

  // If there are no errors, register, if there is, send errorBag
  if (errors.length > 0) {
    res.send({ errors: errors });
  } else {
    bcrypt.hash(req.body.password, 6, (bcryptErr, hash) => {
      if (!bcryptErr) {
        db.query(
          "INSERT INTO users (name, cpf, email, password, birth) VALUES (?, ?, ?, ?, ?)",
          [req.body.name, req.body.cpf, req.body.email, hash, req.body.birth],
          (err, result) => {
            if (err) {
              res.send(err);
            } else {
              db.query(
                `SELECT iduser FROM users WHERE email = '${req.body.email}' LIMIT 1`,
                (err, row) => {
                  if (err) {
                    res.send(err);
                  } else if (result) {
                    res.send({ success: true, logged: row[0].iduser }); // Success, send user id
                  } else {
                    res.send({
                      success: false,
                      msg: "Ocorreu um erro, tente novamente.",
                    }); // User was not recorded in the DB
                  }
                }
              );
            }
          }
        );
      } else {
        res.send(bcryptErr);
      }
    });
  }
});

/*
 *  LOGIN
 */
app.post("/login", (req, res) => {
  // Validating...
  if (!!req.body.email == false || !!req.body.password == false) {
    res.send({ errors: [{ field: "all", msg: "Preencha todos os campos." }] }); // Must fill all fields
  }
  const errors = validate(req.body);

  // If there are no errors, validate login data, if there is, send errorBag
  if (errors.length) {
    res.send({ errors: errors });
  } else {
    db.query(
      `SELECT iduser, password FROM users WHERE email = '${req.body.email}' LIMIT 1`,
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (bcryptErr, bcryptRes) => {
              if (bcryptRes) {
                res.send({ success: true, logged: result[0].iduser }); // Success, send user id
              } else {
                res.send({ success: false, msg: "A senha não confere." }); // Password was not right
              }
            }
          );
        }
      }
    );
  }
});

// -------------------  Está aqui enquanto não consigo modularizar o código
function validate(fields) {
  let errorBag = [];

  for (let key in fields) {
    // Validate e-mail format
    if (
      key == "email" &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        fields[key].toLowerCase()
      )
    ) {
      errorBag.push({
        field: key,
        msg: "E-mail inválido.",
      });
    }

    // Validate password
    if (key == "password" && fields[key].length < 8) {
      errorBag.push({
        field: key,
        msg: "A senha deve ter no mínimo 8 caracteres.",
      });
    }

    // Validate CPF format
    if (
      key == "cpf" &&
      !/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(fields[key])
    ) {
      errorBag.push({
        field: key,
        msg: "O CPF deve seguir o formato 999.999.999-99",
      });
    }
  }

  return errorBag;
}

/*
 *  ADD PET
 */
app.post("/pets/add", (req, res) => {
  console.log(req.body);
  // Validating...
  if (
    !!req.body.iduser == false ||
    !!req.body.idraca == false ||
    !!req.body.idespecie == false ||
    !!req.body.name == false ||
    !!req.body.furcolor == false ||
    !!req.body.birth == false
  ) {
    res.send({ errors: [{ field: "all", msg: "Preencha todos os campos." }] }); // Must fill all fields
    return;
  }
  // Store pet if there are no errors
  else {
    db.query(
      "INSERT INTO pets (iduser, idraca, idespecie, name, furcolor, birth) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.iduser,
        req.body.idraca,
        req.body.idespecie,
        req.body.name,
        req.body.furcolor,
        req.body.birth,
      ],
      (err, result) => {
        if (err) {
          res.send(err);
        } else if (result) {
          res.send({ success: true, msg: "Pet cadastrado com sucesso." }); // Success
        } else {
          res.send({
            success: false,
            msg: "Ocorreu um erro, tente novamente.",
          }); // Pet was not stored in the DB
        }
      }
    );
  }
});

/*
 *  GET RAÇAS AND ESPECIES
 */
app.get("/get/racas", (req, res) => {
  db.query("SELECT * FROM racas", (err, result) => {
    err
      ? console.log(err)
      : result.length > 0
      ? res.send(result)
      : console.log("Sem raças cadastradas no BD.");
  });
});
app.get("/get/especies", (req, res) => {
  db.query("SELECT * FROM especies", (err, result) => {
    err
      ? console.log(err)
      : result.length > 0
      ? res.send(result)
      : console.log("Sem especies cadastradas no BD.");
  });
});
