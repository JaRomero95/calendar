# Introducción

Tanto en *frontend* como en *backend* he incluido una serie de gemas y librerías adicionales para realizar un proyecto lo más parecido posible a la realidad, con las herramientas que acostumbro a emplear o que creo que son importantes con un stack Rails + React, pese a no ser necesarias la mayoría de ellas en un proyecto de este tamaño.

# Organización del proyecto y docker

Para simplificarlo y que resulte más sencillo montarlo y probarlo si queréis, backend y frontend están incluidos en el mismo repositorio, y con `docker-compose` se pueden levantar los tres servicios a la vez: postgres, rails y frontend.

El contenedor no está preparado para despliegue en producción. Levanta los servicios en entorno de desarrollo e instala además las dependencias necesarias para poder ejecutar los tests, en especial los paquetes requeridos para que funcionen los tests de Capybara.

Si queréis verlo en funcionamiento también podéis acceder [aquí](http://51.254.126.66/) sin necesidad de levantarlo.

# Backend

El backend consiste en un proyecto Rails en modo **API-only**. Muy poquito código aquí, únicamente un controlador y un modelo para los eventos.

He extraído algo de código al `ApplicationController` para que sea más sencillo unificar la interfaz de la API, aunque no sea necesario ya que no existen más controladores.

Existe también un pequeño *concern* para añadir filtros a los modelos y nada más. No incluye paginación ni ordenación ya que no iban a utilizarse en la aplicación.

### Gemas empleadas

- `rubocop`: instalada con las reglas por defecto. No he añadido las reglas que usamos habitualmente en mi empresa así que simplemente he ido modificando algunas de ellas conforme las necesitaba.
- `rspec`: es la gema que empleo siempre para los tests por encima de minitest, junto a  `rspec-rails` para facilitar la integración.
- `factory_bot`: es la gema que suelo emplear para crear datos de prueba, por encima de fixtures o semillas más complejas.
- `faker`: principalmente como soporte para su uso en las factorías.
- `capybara`: para realizar las pruebas e2e que se encuentran en `spec/features`. Se han añadido varias configuraciones en el archivo `spec/capybara_helper.rb`, para lo siguiente:
  - Configurar el webdriver de chrome con Selenium en modo headless para los tests.
  - Generación de la build del frontend.
  - Screenshots del navegador para los errores producidos en estos tests.
  - Lanzamiento de excepciones si se producen errores en la consola del navegador.
- `database_cleaner`: una de las imprescindibles para tests.
- `shoulda-matchers`: aunque estos tests no aporten mucho y últimamente me cuestionaba si valía la pena incluirlos, finalmente he incluido la gema ya que habitualmente trabajo con ella.
- `rspec-longrun`: para reducir el impacto de rendimiento en los tests e2e incluyo múltiples pasos y `expect` en cada uno de los ejemplos que realizo. Para minimizar las dificultades a la hora de entender y mantener estos tests, esta gema permite añadir diferentes `steps` a cada ejemplo, que facilitan la legibilidad y mejoran el *output* de rspec gracias al *formatter* que incluye.
- `simplecov`: el básico para el *coverage*.

# Frontend

El frontend está inicializado con [create-react-app](https://github.com/facebook/create-react-app). Aquí he instalado bastante más librerías que en backend donde la mayoría eran para los tests. He tratado de hacer un proyecto con el stack que utilizaba en React en los últimos proyectos en los que trabajé con él, aunque no estoy seguro de si alguna de las dependencias que he usado han perdido peso o son ahora desaconsejadas por la comunidad.

Me ha faltado reducir el boilerplate que se encuentra principalmente en los módulos de la *store*, así como extraer algún componente más pequeño, en especial en componentes presentacionales donde algunos incluyen `styled-components` y necesitan una mejor organización.

Las vistas están testadas con Capybara a modo de tests e2e. Por otro lado, los componentes, los módulos de la store y el resto de servicios y útiles se han testeado con `jest`.

### Librerías empleadas

- `redux`: es la librería que siempre he usado para la gestión del estado. En su día, antes de cambiar de framework, me decanté por el planteamiento de [re-ducks](https://github.com/alexnm/re-ducks) para la organización del *store* ya que con otras estructuras mas simples me era difícil mantener aplicaciones grandes.
- `redux-saga`: no usé mucho esta librería ya que solo la implementé en un proyecto, por entonces usaba `redux-thunk`, pero esta empezaba a ganar peso y me gustó ya que los tests ganaban bastante. Me ha faltado profundizar más en la documentación ya que no recordaba mucho y no sé si empleado los efectos de la manera recomendada.
- `reselect`: usada para los selectores computados de la *store*, aunque en este caso solo existe una propiedad que lo necesita.
- `prop-types`: aunque ha perdido mucho peso actualmente en la comunidad, es la manera que usaba por entonces para validar las props de los componentes.
- `axios`: la suelo instalar ya que me ayuda a reducir el boilerplate de las llamadas a la API de manera más sencilla que si usase directamente `fetch`.
- `react-big-calendar`: el frontend de la aplicación es manejado en gran parte por este componente. Es bastante completo y me ahorraba bastantes horas de desarrollar un calendario propio. La principal pega es que no es totalmente `responsive`, ya que en resoluciones con un ancho inferior a unos 400~500px empieza a aparecer scroll horizontal, algo a lo que no le he dedicado tiempo de arreglar en esta ocasión.
- `react-bootstrap`: básicamente para ahorrar algo de tiempo añadiendo css y creando un componente que actúe como *Modal*.
- `styled-components`: hasta la fecha era la manera que más me gustó para aislar el css de los componentes de React y que estos fueran realmente reutilizables. Creo que el CSS de los componentes forma parte de estos y separarlo dificulta mantenerlos y reutilizarlos en otros proyecto. Para mi gusto los Single File Components aportan valor si realmente se separan los componentes de presentación de los contenedores y se mantienen con tamaño reducido.
- `enzyme`: la herramienta principal que he usado para los tests de los componentes junto con Jest. He optado por hacer un test básico a todos los componentes para comprobar que se montaban correctamente sin lanzar errores, y luego tests más completos para aquellos componentes que incluían algo de lógica. En esta ocasión no he hecho snapshots de los componentes.
- `redux-saga-test-plan`: soporte para facilitar los tests de redux-saga. No sé si es actualmente la librería más adecuada aunque parece la más popular en el enfoque de tests de integración de sagas. En su día ya probé y desistí de los tests que proboban las sagas efecto tras efecto, aunque no recuerdo con qué librería implementé los nuevos tests de integración, así que hecho una búsqueda y me he decantado por esta.
- `react-intl`: para manejar las traducciones y la localización de fechas. La aplicación estaría preparada para añadir más idiomas fácilmente aunque actualmente solo está añadido el inglés.
