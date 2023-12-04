const obtenerTODOS = (miCallback, source) => {
  const request = new XMLHttpRequest();
  //
  request.addEventListener("readystatechange", () => {
    // 4 significa que ha terminado la peticion
    // El 200 significa si ha tenido una respuesta exitosa(successful responses)
    if (request.readyState === 4 && request.status === 200) {
      // console.log(request, request.readyState);
      // console.log(request.responseText);
      // Le pasamos un undefined porque se puede comparar a un false como si fuera un boolean, utilizamos el json parse para transformar el texto que parecia un json a un arrayde objetos
      const respuesta = JSON.parse(request.responseText);
      miCallback(undefined, respuesta);
    } else if (request.readyState === 4) {
      // console.log("No se han podido obtener los datos");
      miCallback("No se han podido obtener los datos", undefined);
    }
  });
  // open
  // parametro 1 -> Tipo de solicitud
  // parametro 2 -> A quién le hacemos la solicitud(a qué endpoint)
  //Peticion
  // request.open('GET', 'https://jsonplaceholder.typicode.com/todos/');
  request.open("GET", source);
  //Enviar
  // send
  request.send();
};

console.log("uno");
console.log("dos");

// callback llama a esta funcion
obtenerTODOS((error, datos) => {
	console.log("callback invocado 1");
	gestionarRespuesta(error, datos);
  	// Se repite el codigo para que la siguiente cosa que me devuelva sea el segundo.json
  	obtenerTODOS((error, datos) => {
    	console.log("callback invocado 2");
    	gestionarRespuesta(error, datos);
  	}, "/todos/tareas2.json");

}, "/todos/tareas1.json");

function gestionarRespuesta(error, datos) {
	if (error) {
    	console.log(error);
  	} else {
    	console.log(datos);
  	}
}

console.log("tres");
console.log("cuatro");
