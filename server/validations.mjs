const validate = (fields, form) => {
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

    // Valida se o e-mail já está cadastrado na hora do registro
    if (key == "email" && form == "register") {
      db.query(
        `SELECT * FROM users WHERE email = '${req.body.email}' LIMIT 1`,
        (err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length > 0) {
            errorBag.push({
              field: "emailInUse",
              msg: "O e-mail informado já está em uso.",
            });
          }
        }
      );
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

    // Valida se o CPF já está cadastrado na hora do registro
    if (key == "cpf" && form == "register") {
      db.query(
        `SELECT * FROM users WHERE cpf = '${req.body.cpf}' LIMIT 1`,
        (err, result) => {
          if (err) {
            res.send(err);
          } else if (result.length > 0) {
            errorBag.push({ field: "cpfInUse", msg: "O CPF já está em uso." });
          }
        }
      );
    }
  }

  return errorBag;
};

export { validate };
