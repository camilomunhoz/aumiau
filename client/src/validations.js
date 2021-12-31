function validate(value, type) {
  if (!!value) {
    // Validate email format
    if (
      type === "email" &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value.toLowerCase()
      )
    ) {
      return { ok: false, msg: "Formato do e-mail inválido." };
    }

    // Validate passwords
    else if (type === "password" && value.length < 8) {
      return { ok: false, msg: "A senha deve ter ao menos 8 caracteres." };
    }

    // Check if it is a full name
    else if (type === "fullname") {
      const names = value.split(" ");
      if (names.length <= 1) {
        return { ok: false, msg: "Insira seu nome completo" };
      } else {
        // No errors
        return { ok: true };
      }
    }

    // Validate date
    else if (type === "date") {
      // Format
      if (!/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/.test(value)) {
        return {
          ok: false,
          msg: "A data deve estar no formato dd/mm/aaaa.",
        };
      }
      // Ranges
      else {
        const date = value.split("/");
        const d = date[0];
        const m = date[1];
        const y = date[2];

        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Adjust for leap years
        if (y % 400 == 0 || (y % 100 != 0 && y % 4 == 0)) monthLength[1] = 29;

        // Check the ranges
        if (
          y < 1900 ||
          y > new Date().getFullYear() ||
          m == 0 ||
          m > 12 ||
          !(d > 0 && d <= monthLength[m - 1])
        ) {
          return {
            ok: false,
            msg: "A data inserida é inválida.",
          };
        } else if (new Date(y, m - 1, d).getTime() > new Date().getTime()) {
          return {
            ok: false,
            msg: "A data inserida é futura.",
          };
        } else {
          return { ok: true };
        }
      }
    }

    // Validate CPF format
    else if (
      type === "cpf" &&
      !/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/.test(value)
    ) {
      return { ok: false, msg: "O CPF deve seguir o formato 000.000.000-00" };
    } else {
      // No errors
      return { ok: true };
    }
  } else {
    return { ok: false, msg: "Preencha esse campo." };
  }
}

export default validate;
