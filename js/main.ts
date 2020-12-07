//Definiciones typescript

type coupon = [{
  img: string,
  body: string,
  button: string
}]

type ubicacion = [
  number,number
];



//Validar que la letra del DNI coincide

$.validator.addMethod("nif", function(value, element, param) {
  let resultado = value.match(/\d{8}[A-Z]$/g)
  console.log(resultado);
  let dni1 = <string>$("dni").val();
  let dni = parseInt(dni1.substring(0,8));
  let letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  let resto = dni % 23;
  let letter = letters.substr(resto, 1);
  console.log(letter);
  if (resultado !== null && dni1.substring(8,9) === letter ){
      return true;
  }
 else {
   return false;
 }
}, "¿Me intentas timar? este NIF no es válido!");


//Validar que la edad esta entre 1 y 99

$.validator.addMethod("edad", function(v, element, param){
    let birth_date = <string>$("#birth_date").val();
    let b_date = new Date(birth_date);
    let n_date = new Date();
    let dif = n_date.getTime() - b_date.getTime();
    let dif_days = dif / (1000 * 3600 * 24 * 365);
    let dias = Math.round(dif_days);
    console.log (dias);
    if( dias !== null && dias <= 99 && dias >= 18 ){
      return true;
  }
  else {
    return false;
  }
  }, "Debes tener entre 18 y 99 años");



  //Validar que el formato de la matricula sea correcto

  $.validator.addMethod("matriculacheck", function(value, element, param) {
    let resultado = value.match(/^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$|^[A-Z]{2}-[0-9]{4}(?!.*(LL|CH))-[A-Z]{2}$/)
    if (resultado === null) {
      return false;
    }
      return true;
  }, "El formato de la matricula introducida no es valido");


//Rules


$("form").validate({
   errorClass: "text-danger",
   rules:{
     email: {
       required: true,
       email:true
     },
     pass: {
      required: true,
      minlength:8
    },
    pass2: {
      required: true,
      equalTo: "pass"
    },
     nombre: {
       required: true,

     },
     apellidos: {
       required: true,

     },
     dni: {
       required: true,
       maxlength:9,
       nif: true
     },
     birth_date: {
       required: true,
       edad: true
     },
     car_plate: {
       required: true,
       matriculacheck: true
     },



//Mensajes



   messages: {
     email: {
       required: "No tan rápido amigou! que te faltan campos por rellenar",
       email: "Pero tu sabes lo que es un email, alma de cantaro?"
     },
     pass: {
      required: "No tan rápido amigou! que te faltan campos por rellenar",
      minlength:  "El password debe contener al menos 8 car"
     },
     pass2: {
      required: "No tan rápido amigou! que te faltan campos por rellenar",
      equalTo:  "La contraseña no coincide"
     },

     nombre: {
       required: "No tan rápido amigou! que te faltan campos por rellenar"
     },
     apellidos: {
       required: "No tan rápido amigou! que te faltan campos por rellenar"
     },
     dni: {
       required: "No tan rápido amigou! que te faltan campos por rellenar",
       nif: "He dicho tu DNI ¬¬"
     },
     env_class: {
       required: "Debes seleccionar una opción del desplegable"
      },
     birth_date: {
       required: "Es obligatorio introducir la fecha de nacimiento",
       edad: "La edad debe estar comprendida entre 1 y 99 años"
     }

    },
  }
});






//letIABLES GLOBALES
let map: any;
let position: ubicacion;
let base_price: number = 75;
let coupons = [];
let marker: any;
let markers: any[];

let user = {
  username: "esunol01@gmail.com",
  name: "Elisa",
  surnames: "Suñol Winkler",
  nif: "42159300F",
  birth_date: "1983-03-18",
  car_plate: "0123-ABC",
  env_class: "ECO"
};




//CUPONES



function print_coupons() {
  let articles_list = document.querySelectorAll("#coupons .card-columns")[0];
  articles_list.innerHTML = "";
  // articles_list.childNodes.forEach(function(item) {
  //   articles_list.removeChild(item);
  // });

  coupons.forEach(function(item) {
    let article = document.createElement("article");
    article.classList.add("card");
    articles_list.appendChild(article);

    let img = document.createElement("img");
    img.src = "img/coupons/" + item.image;
    img.alt = item.name;
    img.classList.add("card-img-top", "p-2");
    article.appendChild(img);

    let article_body = document.createElement("div");
    article_body.classList.add("card-body", "text-center");
    article.appendChild(article_body);

    let p = document.createElement("p");
    p.classList.add("card-text", "lead");
    p.innerHTML = item.name;
    article_body.appendChild(p);

    let link = document.createElement("a");
    link.href = "#";
    link.classList.add("btn", "btn-primary", "stretched-link");
    link.innerHTML = "See Coupon";
    link.setAttribute("data-toggle", "modal");
    link.setAttribute("data-target", "#coupon");
    article_body.appendChild(link);
  });
}



//USUARIO

function start_user() {
  document.querySelectorAll("#username")[0].innerHTML = user.name + " " + user.surnames;
  let elements = document.getElementsByClassName("logged-in");
  for (let i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.remove("d-none");
    } else {
      elements[i].classList.add("d-none");
    }
  }
  elements = document.getElementsByClassName("logged-out");
  for (let i = 0; i < elements.length; i++) {
    if (localStorage["is_logged_in"] === "true") {
      elements[i].classList.add("d-none");
    } else {
      elements[i].classList.remove("d-none");
    }
  }
}

function fill_user_profile() {
  let table = document.querySelectorAll("#user-profile tbody")[0];
  table.innerHTML = "";
  for (let i in user) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = i;
    tr.appendChild(td1);
    let td2 = document.createElement("td");
    td2.innerHTML = user[i];
    tr.appendChild(td2);

    table.appendChild(tr);
  }

}

//FORMULARIO SIGN UP

function dni_letter(dni: number) {
  let letters = "TRWAGMYFPDXBNJZSQVHLCKE";
  let resto = dni % 23;
  let letter = letters.substr(resto, 1);
  return letter;
}

function calc_age(birth_date: string) {
  let b_date = new Date(birth_date);
  let n_date = new Date();
  let dif = n_date.getTime() - b_date.getTime();
  let dif_days = dif / (1000 * 3600 * 24 * 365);
  return Math.round(dif_days);
}

function get_discount(env_class:string) {
  let discount:number = 0;
  switch (env_class) {
    case "ECO":
      discount= 5;
      break;
    case "0":
      discount = 10;
      break;
    default:
      discount = 0;
  }
  return discount;
}


//USER


$("#login_id").on("click", function () {
  localStorage["is_logged_in"] = true;
  start_user();
})

$("#logout_id").on("click", function() {
  localStorage["is_logged_in"] = false;
  window.location.href = "index.html";
})

function initIsLoggedIn() {
  if (localStorage["is_logged_in"] === undefined) {
    localStorage["is_logged_in"] = false;
  }
}





//$(document).ready(function(){})  <--- Pasar la funcion de Init aqui


//Mapa



function cargar_api(resolve: any, reject: any) {
      $.ajax({
      url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
      method: "GET",
    }).done(function (response) {
      if(response !== undefined){
        resolve(response)
      } else {
        reject ("La llamada a la API ha fallado")
      }
    /*  let parking = response["@graph"];
      console.log(parking);

      parking.forEach(function(item) {
        console.log(item.title);
        let finder = <string>$("#finder").val();

      let str = item.title.toUpperCase().includes(finder.toUpperCase());

      if (str) {
      let latitude = item.location.latitude;
      let longitude = item.location.longitude;
      let title = item.title;
      let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        title
      );
      marker = new mapboxgl.Marker()
      //usar el marker como letiable global y traerte el listado de markers y guardarlo en una array y poder ir borrandolos al volver a buscar
      .setLngLat([longitude, latitude])
      .setPopup(popup)
      .addTo(map);
       markers.push(marker);

          console.log("hemos encontrado ", item.title);
        } else {
          console.log("No hemos encontrado el parking");
        };
      });
*/

    }).fail(function() {
      console.log("Ha habido un error");
    });
}


async function get_parkings() {
  return new Promise(cargar_api)}

  async function load_parkings() {
    try{
      const response = await get_parkings();
      let parking = response["@graph"];
      console.log(parking);

      parking.forEach(function(item) {
        console.log(item.title);
        let finder = <string>$("#finder").val();

      let str = item.title.toUpperCase().includes(finder.toUpperCase());

      if (str) {
      let latitude = item.location.latitude;
      let longitude = item.location.longitude;
      let title = item.title;
      let popup = new mapboxgl.Popup({ offset: 25 }).setText(
        title
      );
      marker = new mapboxgl.Marker()
      //usar el marker como letiable global y traerte el listado de markers y guardarlo en una array y poder ir borrandolos al volver a buscar
      .setLngLat([longitude, latitude])
      .setPopup(popup)
      .addTo(map);
       markers.push(marker);

          console.log("hemos encontrado ", item.title);
        } else {
          console.log("No hemos encontrado el parking");
        };
      });
    }
    catch(e){
      console.log(e);
    }
  }
  $("#boton").on("click", load_parkings);





function cargar_mapa(){
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXN3MTgwMyIsImEiOiJja2g5ZjZ1a20wd2c5MnJydDIwNXZydGVmIn0.CpPbLxXY-XO29tG4O0fGdw';
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: position, // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
  };


$(document).ready (function () {
  initIsLoggedIn();

  /* Sólamente signup.html */
  if (document.getElementById("prices_body") !== null) {
    calc_prices();
  }

  /* Sólamente coupons.html */
  if (document.getElementById("coupons") !== null) {
    function load_coupons() {
        $.ajax({
          url: "coupons.json"
        }).done(function (response) {
      print_coupons();
    });
  }
}

  /* Sólamente profile.html */
  if (document.getElementById("user-profile") !== null) {
    fill_user_profile();
  }

  /* Todos menos signup.html */
  if (document.getElementById("prices_body") === null) {
    start_user();
  }

  if (document.getElementById("map") !== null) {
    cargar_mapa();
  };

});
