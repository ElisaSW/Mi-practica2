//Validar que la letra del DNI coincide
$.validator.addMethod("nif", function (value, element, param) {
    var resultado = value.match(/\d{8}[A-Z]$/g);
    console.log(resultado);
    var dni1 = $("dni").val();
    var dni = parseInt(dni1.substring(0, 8));
    var letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    var resto = dni % 23;
    var letter = letters.substr(resto, 1);
    console.log(letter);
    if (resultado !== null && dni1.substring(8, 9) === letter) {
        return true;
    }
    else {
        return false;
    }
}, "¿Me intentas timar? este NIF no es válido!");
//Validar que la edad esta entre 1 y 99
$.validator.addMethod("edad", function (v, element, param) {
    var birth_date = $("#birth_date").val();
    var b_date = new Date(birth_date);
    var n_date = new Date();
    var dif = n_date.getTime() - b_date.getTime();
    var dif_days = dif / (1000 * 3600 * 24 * 365);
    var dias = Math.round(dif_days);
    console.log(dias);
    if (dias !== null && dias <= 99 && dias >= 18) {
        return true;
    }
    else {
        return false;
    }
}, "Debes tener entre 18 y 99 años");
//Validar que el formato de la matricula sea correcto
$.validator.addMethod("matriculacheck", function (value, element, param) {
    var resultado = value.match(/^[0-9]{1,4}(?!.*(LL|CH))[BCDFGHJKLMNPRSTVWXYZ]{3}$|^[A-Z]{2}-[0-9]{4}(?!.*(LL|CH))-[A-Z]{2}$/);
    if (resultado === null) {
        return false;
    }
    return true;
}, "El formato de la matricula introducida no es valido");
//Rules
$("form").validate({
    errorClass: "text-danger",
    rules: {
        email: {
            required: true,
            email: true
        },
        pass: {
            required: true,
            minlength: 8
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
            maxlength: 9,
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
                minlength: "El password debe contener al menos 8 car"
            },
            pass2: {
                required: "No tan rápido amigou! que te faltan campos por rellenar",
                equalTo: "La contraseña no coincide"
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
//ejemplo de evento --> $("#buscar").on("click", function(){})
//VARIABLES GLOBALES
var map;
var position;
var base_price = 75;
var coupons = [];
var user = {
    username: "esunol01@gmail.com",
    name: "Elisa",
    surnames: "Suñol Winkler",
    nif: "42159300F",
    birth_date: "1983-03-18",
    car_plate: "0123-ABC",
    env_class: "ECO"
};
//CHANGE SIGNUP
function change_dni() {
    var dni = $("#dni").val();
    if (dni.length == 8) {
        var dni_num = parseInt(dni);
        document.getElementById("dnil").innerHTML = dni_letter(dni_num);
    }
    else {
        document.getElementById("dnil").innerHTML = "";
    }
}
function change_birth_date() {
    var birth_date = $("#birth_date").val();
    if (birth_date != "") {
        var age = calc_age(birth_date);
        if (age < 100 && age > 0) {
            document.getElementById("age").innerHTML = age + " years old";
        }
        else {
            document.getElementById("age").innerHTML = "";
        }
    }
    else {
        document.getElementById("age").innerHTML = "";
    }
}
function change_env_class() {
    var env_class = $("#env_class").val();
    if (env_class != "") {
        var discount = get_discount(env_class);
        if (discount > 0) {
            document.getElementById("eco_discount").innerHTML = discount + "% discount";
        }
        else {
            document.getElementById("eco_discount").innerHTML = "no discount";
        }
    }
    else {
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
//CUPONES
function load_coupons() {
    // JSON desde URL
    coupons = JSON.parse(cupons_data);
    //usar $ ajax para llamar al json
    print_coupons();
}
function print_coupons() {
    var articles_list = document.querySelectorAll("#coupons .card-columns")[0];
    articles_list.innerHTML = "";
    // articles_list.childNodes.forEach(function(item) {
    //   articles_list.removeChild(item);
    // });
    coupons.forEach(function (item) {
        var article = document.createElement("article");
        article.classList.add("card");
        articles_list.appendChild(article);
        var img = document.createElement("img");
        img.src = "img/coupons/" + item.image;
        img.alt = item.name;
        img.classList.add("card-img-top", "p-2");
        article.appendChild(img);
        var article_body = document.createElement("div");
        article_body.classList.add("card-body", "text-center");
        article.appendChild(article_body);
        var p = document.createElement("p");
        p.classList.add("card-text", "lead");
        p.innerHTML = item.name;
        article_body.appendChild(p);
        var link = document.createElement("a");
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
    var elements = document.getElementsByClassName("logged-in");
    for (var i = 0; i < elements.length; i++) {
        if (localStorage["is_logged_in"] === "true") {
            elements[i].classList.remove("d-none");
        }
        else {
            elements[i].classList.add("d-none");
        }
    }
    var elements = document.getElementsByClassName("logged-out");
    for (var i = 0; i < elements.length; i++) {
        if (localStorage["is_logged_in"] === "true") {
            elements[i].classList.add("d-none");
        }
        else {
            elements[i].classList.remove("d-none");
        }
    }
}
function fill_user_profile() {
    var table = document.querySelectorAll("#user-profile tbody")[0];
    table.innerHTML = "";
    for (var i in user) {
        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        td1.innerHTML = i;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerHTML = user[i];
        tr.appendChild(td2);
        table.appendChild(tr);
    }
}
//FORMULARIO SIGN UP
function dni_letter(dni) {
    var letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    var resto = dni % 23;
    var letter = letters.substr(resto, 1);
    return letter;
}
function calc_age(birth_date) {
    var b_date = new Date(birth_date);
    var n_date = new Date();
    var dif = n_date.getTime() - b_date.getTime();
    var dif_days = dif / (1000 * 3600 * 24 * 365);
    return Math.round(dif_days);
}
function get_discount(env_class) {
    var discount = 0;
    switch (env_class) {
        case "ECO":
            discount = 5;
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
});
$("#logout_id").on("click", function () {
    localStorage["is_logged_in"] = false;
    window.location.href = "index.html";
});
function initIsLoggedIn() {
    if (localStorage["is_logged_in"] === undefined) {
        localStorage["is_logged_in"] = false;
    }
}
//$(document).ready(function(){})  <--- Pasar la funcion de Init aqui
//Mapa
$("#boton").on("click", function () {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
        method: "GET",
    }).done(function (response) {
        var parking = response["@graph"];
        console.log(parking);
        parking.forEach(function (item) {
            console.log(item.title);
            var finder = $("#finder").val();
            var str = item.title.toUpperCase().includes(finder.toUpperCase());
            if (str) {
                var latitude = item.location.latitude;
                var longitude = item.location.longitude;
                var title = item.title;
                var popup = new mapboxgl.Popup({ offset: 25 }).setText(title);
                var marker = new mapboxgl.Marker()
                    //usar el marker como variable global y traerte el listado de markers y guardarlo en una array y poder ir borrandolos al volver a buscar
                    .setLngLat([longitude, latitude])
                    .setPopup(popup)
                    .addTo(map);
                console.log("hemos encontrado ", item.title);
            }
            else {
                console.log("No hemos encontrado el parking");
            }
            ;
        });
    }).fail(function (response) {
        console.log("Ha habido un error");
    });
});
function cargar_mapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXN3MTgwMyIsImEiOiJja2g5ZjZ1a20wd2c5MnJydDIwNXZydGVmIn0.CpPbLxXY-XO29tG4O0fGdw';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: position,
        zoom: 9 // starting zoom
    });
}
;
$(document).ready(function () {
    initIsLoggedIn();
    /* Sólamente signup.html */
    if (document.getElementById("prices_body") !== null) {
        calc_prices();
    }
    /* Sólamente coupons.html */
    if (document.getElementById("coupons") !== null) {
        load_coupons();
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
    }
});
