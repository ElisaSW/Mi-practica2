//Definiciones typescript
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
//letIABLES GLOBALES
var map;
var position;
var base_price = 75;
var coupons = [];
var marker;
var markers;
var user = {
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
    elements = document.getElementsByClassName("logged-out");
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
function cargar_api(resolve, reject) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://datos.madrid.es/egob/catalogo/202625-0-aparcamientos-publicos.json",
        method: "GET",
    }).done(function (response) {
        if (response !== undefined) {
            resolve(response);
        }
        else {
            reject("La llamada a la API ha fallado");
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
    }).fail(function () {
        console.log("Ha habido un error");
    });
}
function get_parkings() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(cargar_api)];
        });
    });
}
function load_parkings() {
    return __awaiter(this, void 0, void 0, function () {
        var response, parking, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, get_parkings()];
                case 1:
                    response = _a.sent();
                    parking = response["@graph"];
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
                            marker = new mapboxgl.Marker()
                                //usar el marker como letiable global y traerte el listado de markers y guardarlo en una array y poder ir borrandolos al volver a buscar
                                .setLngLat([longitude, latitude])
                                .setPopup(popup)
                                .addTo(map);
                            markers.push(marker);
                            console.log("hemos encontrado ", item.title);
                        }
                        else {
                            console.log("No hemos encontrado el parking");
                        }
                        ;
                    });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
$("#boton").on("click", load_parkings);
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
    }
    ;
});
