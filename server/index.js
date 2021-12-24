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

app.use(cors());
app.use(express.json());

/*
 *  REGISTER
 */
app.post("/register", (req, res) => {
  const errors = validate(req.body);

  // Caso não hajam erros, cadastra, senão retorna a errorbag
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
                    res.send({ success: true, logged: row[0].iduser }); // Sucesso, manda o id do user
                  } else {
                    res.send({
                      success: false,
                      msg: "Ocorreu um erro, tente novamente.",
                    }); // Usuário não foi salvo no banco
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
  const errors = validate(req.body);

  // Caso não hajam erros verifica o login, senão retorna a errorbag
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
                res.send({ success: true, logged: result[0].iduser }); // Sucesso, manda o id do user
              } else {
                res.send({ success: false, msg: "A senha não confere." }); // Senha não confere
              }
            }
          );
        }
      }
    );
  }
});

// Aqui enquanto não consigo modularizar o código
function validate(fields) {
  let errorBag = [];

  for (let key in fields) {
    // Valida formato do e-mail
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

    // Valida a senha
    if (key == "password" && fields[key].length < 8) {
      errorBag.push({
        field: key,
        msg: "A senha deve ter no mínimo 8 caracteres.",
      });
    }

    // Valida formato do CPF
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

// PORT
app.listen(3001, () => {
  console.log("Servidor iniciado.");
});
