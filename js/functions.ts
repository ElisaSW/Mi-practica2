//CHANGE SIGNUP

function change_dni() {
  var dni = <string>$("#dni").val();
  if (dni.length == 8) {
    var dni_num = parseInt(dni);
    document.getElementById("dnil").innerHTML = dni_letter(dni_num);
  } else {
    document.getElementById("dnil").innerHTML = "";
  }
}

function change_birth_date() {
  var birth_date = <string>$("#birth_date").val();
  if (birth_date != "") {
    var age = calc_age(birth_date);
    if (age < 100 && age > 0) {
      document.getElementById("age").innerHTML = age + " years old";
    } else {
      document.getElementById("age").innerHTML = "";
    }
  } else {
    document.getElementById("age").innerHTML = "";
  }
}

function change_env_class() {
  var env_class = <string>$("#env_class").val();
  if (env_class != "") {
    var discount = get_discount(env_class);
    if (discount > 0) {
      document.getElementById("eco_discount").innerHTML = discount + "% discount";
    } else {
      document.getElementById("eco_discount").innerHTML = "no discount";
    }
  } else {
    document.getElementById("eco_discount").innerHTML = "";
  }
}

function calc_prices() {
  var text = "";
  for (var i = 0; i <= 50; i += 5) {
    var price = base_price - (base_price * i / 100);
    text += "<tr><td>" + i + "%</td><td>" + price + "€</td></tr>";
  }

  document.getElementById("prices_body").innerHTML = text;
}
