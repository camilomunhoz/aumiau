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
// app.get("/db_setup", () => {
//
//   let racasCachorro = [
//     "sem raça definida",
//     "Shih Tzu",
//     "Yorkshire",
//     "Poodle",
//     "Lhasa Apso",
//     "Buldogue",
//     "Golden Retriever",
//     "Labrador",
//     "Pug",
//     "Maltês",
//     "Pit Bull",
//     "Pinscher",
//     "Galgo",
//     "Terrier",
//     "Lulu da Pomerânia",
//   ];
//   racasCachorro.sort();
//   for (let raca of racasCachorro) {
//     db.query(
//       `INSERT INTO racas (idespecie, name) VALUES (1, '${raca}')`,
//       (err) => {
//         err
//           ? console.log(err)
//           : console.log(`Raça "${raca}" inserida com sucesso.`);
//       }
//     );
//   }
//   let racasGato = [
//     "sem raça definida",
//     "Persa",
//     "Maine Coon",
//     "Gato-de-bengala",
//     "Gato de Pelo Curto Inglês",
//     "Siamês",
//     "Bombaim",
//     "Ragdoll",
//     "Sphynx",
//     "Munchkin",
//     "Siberiano",
//     "Angorá",
//     "Abssínio",
//   ];
//   racasGato.sort();
//   for (let raca of racasGato) {
//     db.query(
//       `INSERT INTO racas (idespecie, name) VALUES (2, '${raca}')`,
//       (err) => {
//         err
//           ? console.log(err)
//           : console.log(`Raça "${raca}" inserida com sucesso.`);
//       }
//     );
//   }
// });

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

  // If there are no errors, register, if there is, send errorBag. Callback hell? lol
  if (errors.length > 0) {
    res.send({ errors: errors });
  } else {
    db.query(
      `SELECT iduser FROM users WHERE email = '${req.body.email}'`,
      (err, result) => {
        if (err) {
          res.send(err);
        } else if (result.length) {
          // Error: E-mail already taken
          res.send({
            success: false,
            field: "email",
            msg: "Este e-mail já está em uso.",
          });
        } else {
          db.query(
            `SELECT iduser FROM users WHERE cpf = '${req.body.cpf}'`,
            (err, result) => {
              if (err) {
                res.send(err);
              } else if (result.length) {
                // Error: CPF already taken
                res.send({
                  success: false,
                  field: "cpf",
                  msg: "Este CPF já está em uso.",
                });
              } else {
                // Ready to register user
                bcrypt.hash(req.body.password, 6, (bcryptErr, hash) => {
                  if (!bcryptErr) {
                    db.query(
                      "INSERT INTO users (name, cpf, email, password, birth) VALUES (?, ?, ?, ?, ?)",
                      [
                        req.body.name,
                        req.body.cpf,
                        req.body.email,
                        hash,
                        req.body.birth,
                      ],
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
                                // Success: Send user id
                                res.send({
                                  success: true,
                                  logged: row[0].iduser,
                                });
                              } else {
                                res.send({
                                  // Error: User was not recorded in the DB
                                  success: false,
                                  msg: "Ocorreu um erro, tente novamente.",
                                });
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
            }
          );
        }
      }
    );
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
        } else if (!result.length) {
          res.send({
            success: false,
            field: "email",
            msg: "Este e-mail não está cadastrado.",
          });
        } else {
          bcrypt.compare(
            req.body.password,
            result[0].password,
            (bcryptErr, bcryptRes) => {
              if (bcryptRes) {
                res.send({ success: true, logged: result[0].iduser }); // Success, send user id
              } else {
                res.send({
                  success: false,
                  field: "password",
                  msg: "A senha informada não confere.",
                }); // Password was not right
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
 *  EDIT PET
 */
app.put("/pets/edit", (req, res) => {
  //
  // First, here should occur the validation of the auth user
  //
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
  // Update pet if there are no errors
  else {
    db.query(
      "UPDATE pets SET idraca = ?, idespecie = ?, name = ?, furcolor = ?, birth = ? WHERE idpet = ?;",
      [
        req.body.idraca,
        req.body.idespecie,
        req.body.name,
        req.body.furcolor,
        req.body.birth,
        req.body.idpet,
      ],
      (err, result) => {
        if (err) {
          res.send(err);
        } else if (result) {
          res.send({ success: true, msg: "Pet atualizado com sucesso." }); // Success
        } else {
          res.send({
            success: false,
            msg: "Ocorreu um erro, tente novamente.",
          }); // Pet was not updated in the DB
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

/*
 *  GET USERNAME OF THE GIVEN USER
 */
app.get("/get/username", (req, res) => {
  //
  // First, here should occur the validation of the auth user
  //

  // If an user was passed via GET...
  if (req.query.id) {
    db.query(
      "SELECT name FROM users WHERE iduser = ?",
      [req.query.id],
      (err, result) => {
        err
          ? console.log(err)
          : result.length > 0
          ? res.send(result)
          : console.log("Sem dados.");
      }
    );
  }
});

/*
 *  GET USER'S PETS
 */
app.get("/get/pets/user", (req, res) => {
  //
  // First, here should occur the validation of the auth user
  //

  // If an user was passed via GET...
  if (req.query.id) {
    db.query(
      "SELECT idpet, idespecie, name FROM pets WHERE iduser = ?",
      [req.query.id],
      (err, result) => {
        err ? console.log(err) : res.send(result);
      }
    );
  }
});

/*
 *  GET AN ESPECIFIC PET
 */
app.get("/get/pet", (req, res) => {
  //
  // First, here should occur the validation of the auth user
  //

  // If a pet was passed via GET...
  if (req.query.id) {
    db.query(
      "SELECT p.idpet, p.idraca, p.iduser, p.idespecie, p.name, p.furcolor, p.birth, e.name as especie, r.name as raca FROM pets p INNER JOIN especies e ON p.idespecie = e.idespecie INNER JOIN racas r ON p.idraca = r.idraca WHERE p.idpet = ?",
      [req.query.id],
      (err, result) => {
        err
          ? console.log(err)
          : result.length > 0
          ? res.send(result)
          : console.log("Pet não encontrado.");
      }
    );
  }
});

/*
 *  DELETE USER'S PET
 */
app.delete("/delete/pet/:id", (req, res) => {
  //
  // First, here should occur the validation of the auth user
  //

  // If a pet ID was passed...
  if (req.params.id) {
    db.query(
      "SELECT idpet FROM pets WHERE idpet = ?",
      [req.params.id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.length > 0) {
          db.query(
            "DELETE FROM pets WHERE idpet = ?",
            [req.params.id],
            (err) => {
              if (!err) {
                console.log(
                  "Pet de id " + req.params.id + " deletado com sucesso."
                );
                res.send({ success: true, msg: "Pet deletado com sucesso." });
                return;
              }
            }
          );
        } else {
          console.log("Pet não encontrado.");
          res.send({ success: false, msg: "Pet não encontrado." });
        }
      }
    );
  }
});
