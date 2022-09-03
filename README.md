# academy-integrative-work
Ejercico Integrador Academy Ranty

- A fines prácticos se debe comentar la siguiente línea de código: 

// injectMeta(publishParams, eventMeta); 

La misma se encuentra en la dirección: node_modules/ebased/service/downstream/sns.js

En esta función injectMeta, no se porque razón no almacena el eventMeta correctamente lo cual nos da un error que falta traced-duration el cual efectivamente si viaja en el header. Al comentar esta línea no vuelve a generar el problema, seguramente se busque una mejor solución pero para fines prácticos lo solucioné de esa manera.