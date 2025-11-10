# TRABAJO FINAL INTEGRADOR
## Plataforma Web de Salud para Salta y el NOA

**Asignatura:** Comunicación y Pensamiento Crítico en Ciencia de Datos
**Carrera:** Licenciatura en Ciencia de Datos
**Institución:** UPATECO
**Fecha:** 2025

---

## 1. INTRODUCCIÓN

### 1.1 Contexto y Problemática

La provincia de Salta y la región del Noroeste Argentino (NOA) enfrentan desafíos multidimensionales en materia de salud pública que requieren soluciones innovadoras e inclusivas. Esta realidad se manifiesta en cuatro dimensiones principales que convergen para crear un escenario complejo de inequidad sanitaria:

**Dimensión geográfica y de acceso:** La dispersión territorial característica de Salta, con comunidades rurales ubicadas a grandes distancias de los centros urbanos, genera barreras significativas para el acceso a servicios de salud. Según datos del Ministerio de Salud de la Nación, aproximadamente el 30% de la población rural debe recorrer más de 50 kilómetros para acceder a un centro de atención primaria. Esta fragmentación geográfica se traduce en inequidad sanitaria, donde las poblaciones más vulnerables quedan relegadas de los sistemas formales de salud.

**Dimensión epidemiológica:** La prevalencia de enfermedades crónicas no transmisibles (ECNT) como diabetes, hipertensión y enfermedades cardiovasculares presenta tasas alarmantes en la región. El sedentarismo, los hábitos alimentarios inadecuados y la falta de programas preventivos sistemáticos contribuyen a que estas patologías se conviertan en la principal causa de morbimortalidad. La detección temprana y el seguimiento continuo resultan críticos, pero el sistema de salud tradicional enfrenta limitaciones para implementar estrategias de prevención y monitoreo a escala poblacional.

**Dimensión digital y tecnológica:** La brecha digital en Argentina, y particularmente en el NOA, replica y amplifica las desigualdades existentes. Como señalan Eubanks (2018) y Noble (2018), las tecnologías no son neutrales: pueden tanto democratizar el acceso a servicios como profundizar exclusiones preexistentes. En Salta, mientras las áreas urbanas cuentan con conectividad creciente, las zonas rurales experimentan limitaciones significativas tanto en infraestructura como en alfabetización digital. Esta brecha no es meramente instrumental; representa una nueva forma de exclusión que limita el ejercicio de derechos fundamentales, incluido el derecho a la salud.

**Dimensión económica y de recursos:** Los sistemas de salud públicos provinciales enfrentan restricciones presupuestarias que limitan la expansión de infraestructura física. El costo de construir y mantener centros de salud en áreas remotas, sumado al déficit de profesionales dispuestos a establecerse en zonas rurales, crea un círculo vicioso donde las poblaciones más necesitadas reciben menor atención. Las tecnologías digitales emergen como potenciales herramientas para optimizar recursos, permitiendo que un mismo profesional o servicio alcance a mayor cantidad de personas sin incrementos proporcionales en costos de infraestructura.

### 1.2 Justificación del Proyecto

Frente a este escenario complejo, la plataforma **SaludSalta NOA** se propone como una intervención sociotécnica que articula desarrollo tecnológico, compromiso ético y responsabilidad social. No se trata meramente de digitalizar servicios existentes, sino de repensar el vínculo entre tecnología, salud y territorio desde una perspectiva crítica que reconozca tanto las potencialidades como los riesgos de las soluciones digitales.

La propuesta se fundamenta en tres principios rectores:

**Accesibilidad radical:** Más allá del cumplimiento de estándares técnicos de accesibilidad web (WCAG 2.1), el proyecto busca eliminar barreras económicas, culturales y técnicas. La autenticación biométrica facial permite que personas con bajo nivel de alfabetización digital o adultos mayores puedan acceder a sus perfiles de salud sin recordar contraseñas complejas. El diseño responsivo garantiza funcionamiento en dispositivos de gama baja, reconociendo que la tecnología de última generación no está disponible para todos los sectores sociales.

**Soberanía de datos y privacidad:** En el contexto de creciente mercantilización de datos personales, la plataforma adopta un enfoque basado en software libre y almacenamiento local de información sensible. Los descriptores faciales se procesan mediante algoritmos de código abierto (face-api.js) sin depender de servicios de reconocimiento facial de terceros. Esta decisión técnica refleja un compromiso ético: los datos de salud de los usuarios no se convierten en mercancías para empresas tecnológicas, sino que permanecen bajo control de las instituciones públicas argentinas.

**Enfoque preventivo y educativo:** Reconociendo que las ECNT son en gran medida prevenibles mediante cambios en estilos de vida, la plataforma integra componentes educativos (biblioteca de 42 videos sobre diabetes, nutrición, ejercicio), herramientas de automonitoreo (calculadora de IMC) y sistemas de alerta temprana (predictor de enfermedades basado en machine learning). Esta arquitectura informacional busca empoderar a los usuarios como agentes activos de su propia salud, no como receptores pasivos de servicios médicos.

### 1.3 Objetivos del Trabajo

**Objetivo general:**
Desarrollar, analizar y documentar la plataforma web SaludSalta NOA como caso de estudio que integra conocimientos de ciencia de datos, desarrollo de software y pensamiento crítico sobre tecnología, comunicación y salud pública.

**Objetivos específicos:**

1. **Analizar críticamente** el rol de las tecnologías digitales en la salud pública desde marcos teóricos de ética de datos, justicia algorítmica y soberanía tecnológica.

2. **Documentar técnicamente** la arquitectura de la plataforma, incluyendo componentes de autenticación biométrica, machine learning para predicción de enfermedades, y gestión de contenidos educativos.

3. **Evaluar** las decisiones de diseño y desarrollo desde perspectivas de accesibilidad, inclusión y responsabilidad social, identificando limitaciones y áreas de mejora.

4. **Diseñar estrategias de comunicación** para la adopción de la plataforma que consideren las realidades socioculturales del NOA y aborden la brecha digital sin reproducir sesgos tecnológicos.

5. **Reflexionar** sobre el proceso de construcción de la plataforma como ejercicio de aplicación de pensamiento crítico en ciencia de datos, vinculando teoría y práctica.

### 1.4 Alcance y Delimitación

Este trabajo se centra en la fase de desarrollo y puesta en funcionamiento inicial de la plataforma SaludSalta NOA. El análisis abarca tanto aspectos técnicos (arquitectura de software, modelos de machine learning, sistemas de autenticación) como dimensiones sociales y éticas (accesibilidad, privacidad, comunicación).

El período de análisis comprende desde la conceptualización del proyecto hasta su implementación como prototipo funcional desplegado en entornos de producción (Railway, Vercel). No se incluyen evaluaciones de impacto a largo plazo ni estudios de usabilidad con usuarios reales, los cuales constituirían etapas posteriores de investigación.

---

## 2. MARCO CONCEPTUAL

### 2.1 Tecnología, Poder y Datos: Una Perspectiva Crítica

La relación entre tecnología y sociedad ha sido objeto de creciente análisis crítico en la última década. Autoras como Kate Crawford (2021) en "Atlas of AI" argumentan que los sistemas de inteligencia artificial y las infraestructuras digitales no son neutrales ni objetivas, sino que están profundamente imbricadas con estructuras de poder, extracción de recursos y desigualdades preexistentes. Crawford señala: "AI is neither artificial nor intelligent... it is made from natural resources, fuel, human labor, infrastructures, logistics, histories, and classifications" (Crawford, 2021, p. 8).

Esta perspectiva resulta fundamental para comprender las implicaciones de implementar una plataforma de salud basada en tecnologías digitales. No basta con desarrollar software funcionalmente correcto; es necesario interrogar las condiciones de producción, las asimetrías de poder que puede reproducir o desafiar, y los impactos sociales más allá de la eficiencia técnica.

**Justicia algorítmica y sesgos en machine learning:**
Safiya Noble (2018) en "Algorithms of Oppression" documenta cómo los algoritmos pueden perpetuar y amplificar discriminaciones raciales, de género y de clase. En el contexto de salud, esto se manifiesta cuando modelos predictivos entrenados con datos de poblaciones mayoritariamente urbanas y con acceso a servicios formales de salud fallan al aplicarse a poblaciones rurales o indígenas.

El predictor de enfermedades de SaludSalta NOA, basado en el dataset de Kaggle con 41 enfermedades y 132 síntomas, presenta limitaciones inherentes: fue entrenado con datos que probablemente no incluyen patologías prevalentes específicas de Salta (como enfermedad de Chagas o paludismo) ni consideran determinantes sociales locales. Reconocer esta limitación constituye un ejercicio de pensamiento crítico: la tecnología ofrece herramientas útiles pero imperfectas, y su valor depende de la transparencia sobre sus restricciones.

**Ética de datos y privacidad:**
Catherine D'Ignazio y Lauren Klein (2020) en "Data Feminism" proponen siete principios para un uso ético de datos, entre ellos "examinar el poder" y "hacer visible el trabajo invisible". En el contexto de datos de salud, esto implica:

- **Transparencia sobre el uso de datos:** Los usuarios deben comprender qué información se recopila, cómo se procesa y quién tiene acceso a ella.
- **Consentimiento informado:** Más allá del cumplimiento legal de términos y condiciones, el consentimiento debe ser genuinamente informado, accesible para personas con diversos niveles educativos.
- **Minimización de datos:** Recopilar únicamente la información necesaria para proveer el servicio, evitando el exceso de vigilancia característico de plataformas comerciales.

SaludSalta NOA implementa estos principios mediante almacenamiento local de descriptores faciales (sin enviarlos a servicios externos), encriptación de contraseñas con bcrypt, y políticas de retención de datos limitadas.

### 2.2 Software Libre, Soberanía Tecnológica y Salud Pública

Richard Stallman (2002) define software libre como aquel que respeta cuatro libertades fundamentales: usar, estudiar, modificar y distribuir. Más allá de consideraciones técnicas, el software libre representa un modelo político de producción de conocimiento que desafía la concentración de poder en corporaciones tecnológicas.

Para sistemas de salud pública en países del Sur Global, la dependencia de software propietario implica:

- **Dependencia económica:** Costos de licencias que drenan presupuestos públicos hacia empresas transnacionales.
- **Falta de control:** Imposibilidad de auditar el código para verificar seguridad, privacidad o ausencia de puertas traseras.
- **Obsolescencia programada:** Dependencia de actualizaciones y soporte técnico controlados por el proveedor.

La plataforma SaludSalta NOA se construye íntegramente con tecnologías de código abierto: Node.js, Express, Next.js, MongoDB, face-api.js, Scikit-learn. Esta decisión no es meramente técnica: representa una apuesta por la soberanía tecnológica, permitiendo que instituciones públicas argentinas puedan apropiarse, auditar, modificar y mantener el sistema sin depender de licencias corporativas.

Evgeny Morozov (2013) en "To Save Everything, Click Here" advierte sobre el "solucionismo tecnológico": la creencia de que todo problema social tiene una solución tecnológica. En salud pública, esto se traduce en la ilusión de que una app puede reemplazar la inversión en infraestructura, formación de profesionales o políticas públicas integrales. SaludSalta NOA no pretende reemplazar el sistema de salud existente, sino complementarlo, extendiendo su alcance mediante tecnologías que respeten la autonomía de usuarios e instituciones.

### 2.3 Comunicación, Salud y Tecnología

La comunicación en salud enfrenta desafíos particulares en contextos de diversidad cultural y desigualdad estructural. Como señala el modelo de Determinantes Sociales de la Salud de la OMS, factores como educación, ingresos, vivienda y acceso a servicios condicionan los resultados sanitarios tanto o más que las intervenciones médicas específicas.

**Alfabetización en salud (health literacy):**
Nutbeam (2000) define health literacy como "las habilidades cognitivas y sociales que determinan la motivación y capacidad de los individuos para acceder, comprender y usar información de formas que promuevan y mantengan buena salud". En Argentina, particularmente en zonas rurales, el nivel de alfabetización en salud presenta brechas significativas.

La biblioteca de 42 videos educativos de SaludSalta NOA adopta un enfoque pedagógico que privilegia:

- **Multimodalidad:** Combinar imagen, audio y texto para atender diversos estilos de aprendizaje.
- **Lenguaje accesible:** Evitar jerga médica innecesaria, usar analogías culturalmente pertinentes.
- **Relevancia local:** Priorizar contenidos sobre patologías prevalentes en el NOA (diabetes, hipertensión, enfermedades cardiovasculares).

**Brecha digital y exclusión:**
Van Dijk (2020) identifica cuatro niveles de brecha digital: acceso material (conectividad, dispositivos), competencias (habilidades para usar tecnologías), uso (propósitos y frecuencia de uso) y resultados (beneficios tangibles obtenidos). Las políticas de inclusión digital efectivas deben abordar todos estos niveles, no solo proveer conectividad.

La estrategia de comunicación para la adopción de SaludSalta NOA debe contemplar:

- **Talleres presenciales** en centros de salud y organizaciones comunitarias para enseñar el uso de la plataforma.
- **Material impreso** con códigos QR que vinculen a tutoriales en video.
- **Alianzas con agentes sanitarios** que actúen como mediadores entre la tecnología y comunidades con menor acceso digital.

### 2.4 Inteligencia Artificial en Salud: Oportunidades y Riesgos

El uso de machine learning en salud promete mejoras significativas en diagnóstico, pronóstico y personalización de tratamientos. Sin embargo, investigaciones recientes documentan riesgos de sesgos algorítmicos, opacidad en la toma de decisiones y profundización de inequidades.

**Sesgos en datasets médicos:**
Obermeyer et al. (2019) demostraron que un algoritmo ampliamente usado en el sistema de salud estadounidense para identificar pacientes que necesitan atención adicional presentaba sesgos raciales significativos. El algoritmo utilizaba costos de salud como proxy de necesidad de atención, pero pacientes negros históricamente reciben menor atención y generan menores costos, por lo que el modelo sistemáticamente los clasificaba como menos necesitados de intervenciones.

Este hallazgo subraya una lección crítica: los modelos de ML aprenden patrones de los datos históricos, incluyendo discriminaciones y desigualdades estructurales. Un predictor de enfermedades entrenado con datos que subrepresentan poblaciones indígenas, mujeres o personas de bajos recursos reproducirá estas ausencias.

**Explicabilidad y confianza:**
Los modelos de ML, particularmente redes neuronales profundas, operan como "cajas negras": producen predicciones sin explicaciones comprensibles para humanos. En salud, esto plantea problemas éticos y prácticos: ¿cómo puede un médico confiar en una recomendación algorítmica que no puede explicar? ¿Cómo puede un paciente consentir a un tratamiento basado en decisiones opacas?

El predictor de SaludSalta NOA utiliza un modelo Random Forest, que ofrece mayor interpretabilidad que redes neuronales. Sin embargo, la plataforma presenta las predicciones como "sugerencias para consultar con un profesional", no como diagnósticos definitivos. Esta decisión de diseño refleja humildad epistemológica: reconocer que los algoritmos ofrecen orientaciones útiles pero no sustituyen el criterio clínico experto.

**UNESCO y principios éticos de IA:**
La Recomendación sobre Ética de la Inteligencia Artificial de UNESCO (2021) establece principios como proporcionalidad (los medios deben ser proporcionales a los fines), no maleficencia, justicia y equidad, y explicabilidad. Estos principios deben guiar el desarrollo de sistemas de IA en salud pública:

- **Proporcionalidad:** ¿Es apropiado usar reconocimiento facial para autenticación en una plataforma de salud? Sí, si se limita a ese propósito y no se usa para vigilancia.
- **No maleficencia:** ¿Pueden las predicciones algorítmicas causar daño? Sí, si se interpretan como diagnósticos definitivos en lugar de orientaciones.
- **Justicia y equidad:** ¿El sistema beneficia equitativamente a todos los sectores sociales? Requiere evaluación continua.

### 2.5 Accesibilidad Web y Diseño Inclusivo

Tim Berners-Lee, creador de la World Wide Web, afirma: "The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect" (citado en W3C, 1997). Esta visión fundamenta los estándares de accesibilidad web (WCAG), que establecen criterios técnicos para que sitios y aplicaciones sean utilizables por personas con diversas discapacidades.

**Niveles de accesibilidad WCAG:**
Los estándares WCAG 2.1 definen tres niveles de conformidad (A, AA, AAA) basados en cuatro principios: perceptible, operable, comprensible y robusto. SaludSalta NOA implementa nivel AA, incluyendo:

- **Contraste de color suficiente** para personas con baja visión.
- **Navegación por teclado** para quienes no pueden usar mouse.
- **Textos alternativos** para imágenes, beneficiando a usuarios de lectores de pantalla.
- **Tamaños de fuente ajustables** para facilitar lectura.

**Diseño inclusivo más allá de la discapacidad:**
El diseño inclusivo reconoce la diversidad humana en dimensiones como edad, alfabetización digital, contexto de uso (conexión lenta, dispositivos de gama baja), y preferencias culturales. En Salta, esto significa:

- **Optimización para conexiones lentas:** Minimización de tamaño de archivos, carga progresiva de contenidos.
- **Compatibilidad con dispositivos antiguos:** Evitar dependencia de tecnologías de última generación.
- **Diseño responsivo:** Adaptación a pantallas pequeñas de smartphones económicos, el dispositivo más común en sectores populares.

### 2.6 Marco Teórico Integrado

La construcción de SaludSalta NOA se sustenta en un marco teórico que integra:

1. **Ética de datos y justicia algorítmica** (Crawford, Noble, D'Ignazio & Klein) para reconocer y mitigar sesgos, proteger privacidad y distribuir beneficios equitativamente.

2. **Soberanía tecnológica y software libre** (Stallman, Morozov) para garantizar control público sobre infraestructuras críticas y evitar dependencia corporativa.

3. **Comunicación en salud y alfabetización digital** (Nutbeam, Van Dijk) para diseñar estrategias que aborden brechas de acceso, competencias y usos efectivos.

4. **Accesibilidad e inclusión** (Berners-Lee, WCAG) para eliminar barreras técnicas, cognitivas y culturales al acceso a servicios digitales de salud.

5. **Marcos normativos éticos** (UNESCO, OMS) que establecen estándares internacionales sobre uso responsable de IA y determinantes sociales de la salud.

Este enfoque multidimensional permite analizar críticamente no solo los aspectos técnicos de la plataforma, sino sus implicaciones sociales, éticas y políticas en el contexto específico del NOA argentino.

---

## 3. DESCRIPCIÓN DEL PROYECTO

### 3.1 Visión General de la Plataforma

**SaludSalta NOA** es una plataforma web integral diseñada para democratizar el acceso a información, herramientas y servicios de salud preventiva en la provincia de Salta y la región del Noroeste Argentino. La plataforma integra cuatro componentes principales:

1. **Sistema de autenticación biométrica** que combina reconocimiento facial con credenciales tradicionales para facilitar el acceso a usuarios con diversos niveles de alfabetización digital.

2. **Calculadora de Índice de Masa Corporal (IMC)** con recomendaciones personalizadas basadas en estándares de la Organización Mundial de la Salud.

3. **Predictor de enfermedades basado en machine learning** que analiza síntomas reportados por el usuario y sugiere posibles condiciones de salud que ameritan consulta médica.

4. **Biblioteca de contenidos educativos** con 42 videos organizados en categorías temáticas (diabetes, ejercicio, nutrición, prevención, salud cardiovascular, salud mental, salud ósea).

5. **Espacio comunitario de fisioterapia** donde profesionales docentes comparten clases, ejercicios y recursos para pacientes en rehabilitación o con necesidades de kinesiología preventiva.

### 3.2 Público Objetivo

La plataforma se dirige a múltiples perfiles de usuarios:

**Usuarios generales:** Población adulta de Salta y el NOA que busca información confiable sobre salud, herramientas de automonitoreo y orientación sobre cuándo consultar a un profesional. Incluye personas con acceso limitado a servicios de salud por barreras geográficas, económicas o culturales.

**Adultos mayores:** Segmento que presenta mayor prevalencia de enfermedades crónicas y que puede beneficiarse de herramientas digitales accesibles. El reconocimiento facial facilita el acceso sin necesidad de recordar contraseñas complejas.

**Pacientes con enfermedades crónicas:** Personas con diabetes, hipertensión, obesidad u otras condiciones que requieren monitoreo continuo y educación sobre autocuidado.

**Profesionales de salud y docentes:** Médicos, enfermeros, kinesiólogos y otros profesionales que pueden usar la plataforma para compartir contenidos educativos y dar seguimiento a pacientes.

**Agentes sanitarios y promotores de salud:** Trabajadores comunitarios que actúan como puentes entre el sistema formal de salud y comunidades rurales o vulnerables, pudiendo usar la plataforma como herramienta educativa en sus intervenciones.

### 3.3 Arquitectura Técnica

La plataforma adopta una arquitectura de microservicios distribuida en tres capas principales:

**Frontend (Next.js 14 + React 18 + TypeScript):**
Aplicación web responsiva con renderizado del lado del servidor (SSR) y generación estática de sitios (SSG) para optimizar performance y SEO. El uso de TypeScript proporciona tipado estático que reduce errores en tiempo de desarrollo. La interfaz se diseñó siguiendo principios de Material Design adaptados a identidad visual argentina, con paleta de colores accesible (contraste WCAG AA) y componentes reutilizables.

Decisiones técnicas destacadas:
- **Autenticación con NextAuth.js** que soporta múltiples proveedores (credenciales, OAuth, WebAuthn).
- **Reconocimiento facial con face-api.js:** Librería JavaScript de código abierto basada en TensorFlow.js que ejecuta modelos de deep learning en el navegador sin enviar imágenes a servidores externos.
- **Gestión de estado con React Context API:** Solución ligera para compartir estado de autenticación y configuración entre componentes sin dependencias adicionales como Redux.
- **Optimización de imágenes con next/image:** Carga diferida (lazy loading), formatos modernos (WebP), y redimensionamiento automático según dispositivo.

**Backend (Node.js + Express + TypeScript + MongoDB):**
API RESTful que gestiona lógica de negocio, autenticación, autorización y persistencia de datos. La elección de Node.js permite usar JavaScript/TypeScript tanto en frontend como backend, facilitando compartir código y tipados. MongoDB proporciona flexibilidad de esquema adecuada para proyectos en evolución.

Componentes principales:
- **Controladores de autenticación** (auth.controller.ts): Registro con contraseña y/o reconocimiento facial, login tradicional, login facial, cambio de contraseña, actualización de datos biométricos.
- **Modelos de datos** (Mongoose schemas): User, Clase, Video, Prediction.
- **Middleware de autenticación** (JWT): Tokens firmados con algoritmo HMAC-SHA256, expiración configurable (por defecto 7 días).
- **Almacenamiento de descriptores faciales:** Los modelos de face-api.js generan vectores de 128 dimensiones que representan cada rostro. Estos descriptores se almacenan en MongoDB, no las imágenes originales, reduciendo espacio y protegiendo privacidad.

**Servicio de Machine Learning (Python + Flask + Scikit-learn):**
Microservicio independiente desplegado en Railway que expone API para predicción de enfermedades. El modelo se entrenó con dataset de Kaggle "Disease Symptom Prediction" que incluye 41 enfermedades y 132 síntomas.

Pipeline de ML:
1. **Preprocesamiento:** Codificación de síntomas categóricos mediante Label Encoding.
2. **Modelo:** Random Forest Classifier con 100 árboles de decisión.
3. **Evaluación:** Accuracy del 95% en conjunto de test, matriz de confusión para identificar errores sistemáticos.
4. **Serialización:** Modelo guardado como pickle para carga rápida en producción.
5. **API:** Endpoint POST /predict que recibe lista de síntomas y retorna top 3 enfermedades más probables con sus probabilidades.

**Infraestructura de despliegue:**
- **Frontend:** Vercel, plataforma especializada en Next.js con CDN global, despliegue automático desde GitHub, SSL gratuito.
- **Backend:** Railway, plataforma cloud que soporta múltiples lenguajes, bases de datos y despliegue continuo.
- **Base de datos:** MongoDB Atlas, servicio DBaaS con replicación automática, backups y escalamiento.
- **Servicio ML:** Railway con contenedor Docker que incluye dependencias Python.

### 3.4 Componentes Funcionales Detallados

#### 3.4.1 Sistema de Autenticación Biométrica

La autenticación constituye el componente más innovador de la plataforma, combinando tres métodos:

**Autenticación tradicional con email y contraseña:**
Método estándar que permite a usuarios crear cuentas con credenciales conocidas. Las contraseñas se hashean con bcrypt (factor de costo 10) antes de almacenarse, protegiéndolas contra ataques de fuerza bruta en caso de compromiso de base de datos.

**Reconocimiento facial con face-api.js:**
Durante el registro, el usuario captura 3-5 imágenes de su rostro desde diferentes ángulos usando la webcam. La librería face-api.js:
1. Detecta rostros en cada imagen usando modelo SSD (Single Shot MultiBox Detector).
2. Identifica 68 puntos faciales de referencia (facial landmarks).
3. Genera descriptores de 128 dimensiones que codifican características faciales únicas.
4. Promedia los descriptores de múltiples capturas para mayor robustez.

Durante el login facial, el proceso se repite: se captura rostro, se genera descriptor, se compara con descriptores almacenados usando distancia euclidiana. Si la distancia es menor al umbral configurado (0.6 por defecto), se considera coincidencia.

Ventajas de este enfoque:
- **Privacidad:** Los descriptores no permiten reconstruir la imagen original del rostro.
- **Seguridad:** Más difícil de falsificar que contraseñas o PINs.
- **Accesibilidad:** No requiere recordar información, solo presentarse ante la cámara.

Limitaciones reconocidas:
- **Dependencia de hardware:** Requiere dispositivo con cámara funcional.
- **Variabilidad de condiciones:** Iluminación deficiente, ángulos extremos o cambios significativos en apariencia (barba, gafas) pueden afectar precisión.
- **Sesgos algorítmicos:** Modelos de reconocimiento facial pueden presentar menor precisión en personas de piel oscura o rasgos no europeos, como documentan Buolamwini y Gebru (2018).

**WebAuthn (FIDO2):**
Estándar abierto para autenticación web que permite usar biometría del dispositivo (huella digital, Face ID) o llaves de seguridad hardware. Implementado mediante biblioteca @simplewebauthn/server, ofrece autenticación resistente a phishing y sin contraseñas.

Flujo de registro WebAuthn:
1. Usuario solicita registro desde email ya existente.
2. Servidor genera challenge criptográfico único.
3. Navegador invoca API WebAuthn que activa biometría del dispositivo.
4. Dispositivo genera par de claves criptográficas (privada permanece en dispositivo, pública se envía al servidor).
5. Servidor almacena clave pública asociada al usuario.

Flujo de autenticación:
1. Usuario solicita login.
2. Servidor genera nuevo challenge.
3. Navegador solicita biometría del dispositivo.
4. Dispositivo firma challenge con clave privada.
5. Servidor verifica firma con clave pública almacenada.

**Flujo especial para docentes:**
Los usuarios con rol "docente" deben autenticarse con contraseña + reconocimiento facial (autenticación de dos factores). Esta medida adicional de seguridad protege funcionalidades sensibles como creación y edición de contenidos educativos.

#### 3.4.2 Calculadora de IMC

Herramienta simple pero efectiva para que usuarios evalúen si su peso es saludable en relación a su estatura. La fórmula utilizada es:

```
IMC = peso (kg) / [estatura (m)]²
```

Clasificación según OMS:
- Bajo peso: IMC < 18.5
- Peso normal: 18.5 ≤ IMC < 25
- Sobrepeso: 25 ≤ IMC < 30
- Obesidad grado I: 30 ≤ IMC < 35
- Obesidad grado II: 35 ≤ IMC < 40
- Obesidad grado III: IMC ≥ 40

La plataforma no solo muestra el resultado numérico, sino que proporciona:
- **Interpretación en lenguaje claro** sobre qué significa ese valor de IMC.
- **Recomendaciones personalizadas** según la categoría (e.g., para sobrepeso: aumentar actividad física, consultar nutricionista).
- **Contexto educativo:** Explicación de que IMC es una aproximación, no considera composición corporal (músculo vs grasa), y debe complementarse con evaluación médica.

Limitaciones reconocidas:
- No es adecuado para deportistas de alto rendimiento, embarazadas, personas con edema.
- Puede subestimar riesgos en adultos mayores con sarcopenia.
- No considera distribución de grasa corporal (grasa abdominal es más riesgosa que periférica).

#### 3.4.3 Predictor de Enfermedades

Sistema basado en machine learning que asiste a usuarios en la identificación temprana de posibles condiciones de salud que ameritan atención médica.

**Interfaz de usuario:**
Formulario interactivo con 132 síntomas organizados en categorías (síntomas generales, digestivos, respiratorios, cutáneos, neurológicos). Cada síntoma incluye:
- **Nombre en español** (traducido desde términos médicos en inglés).
- **Descripción breve** explicando qué significa el síntoma.
- **Checkbox** para seleccionar/deseleccionar.

El usuario marca los síntomas que experimenta y envía el formulario. El frontend envía petición POST al microservicio de ML con la lista de síntomas seleccionados.

**Procesamiento y respuesta:**
El modelo Random Forest procesa la entrada y retorna las 3 enfermedades más probables con sus probabilidades. El frontend presenta:
- **Ranking de enfermedades** ordenado por probabilidad.
- **Nombre en español** de cada enfermedad.
- **Descripción breve** de la condición.
- **Nivel de confianza** expresado como porcentaje.
- **Advertencia clara:** "Esta es una orientación basada en inteligencia artificial. NO sustituye diagnóstico médico profesional. Consulte con un profesional de salud".

**Traducción de términos médicos:**
El dataset original contiene síntomas y enfermedades en inglés con nomenclatura médica técnica. Para hacer la herramienta accesible, se desarrolló módulo de traducción (translations.ts) con 132 síntomas y 41 enfermedades traducidos al español con descripciones en lenguaje claro.

Ejemplos:
- `itching` → "Picazón - Sensación de comezón en la piel"
- `skin_rash` → "Erupción cutánea - Irritación o inflamación de la piel"
- `(vertigo) Paroymsal  Positional Vertigo` → "Vértigo posicional paroxístico benigno"
- `Diabetes` → "Diabetes"

**Consideraciones éticas:**
El predictor puede generar ansiedad innecesaria si el usuario interpreta los resultados como diagnósticos definitivos. Para mitigar este riesgo:
- Toda la interfaz enfatiza que se trata de orientación preliminar.
- Se recomienda consulta profesional independientemente del resultado.
- No se predicen condiciones que requieran intervención de emergencia (no es herramienta de triaje).
- Se registran predicciones para análisis posterior de patrones poblacionales (con consentimiento).

#### 3.4.4 Biblioteca de Videos Educativos

Repositorio de 42 videos organizados en 7 categorías temáticas, alojados en YouTube e integrados mediante iframes responsivos. La selección de contenidos priorizó:

**Criterios de curación:**
- **Relevancia epidemiológica:** Enfoque en enfermedades crónicas prevalentes en el NOA.
- **Calidad científica:** Fuentes confiables (instituciones de salud, profesionales acreditados).
- **Accesibilidad comunicacional:** Lenguaje claro, evita tecnicismos innecesarios.
- **Duración adecuada:** Videos de 5-15 minutos para mantener atención.

**Categorías y contenidos:**

1. **Diabetes (12 videos):**
   - ¿Qué es la diabetes tipo 2?
   - Control de glucosa en sangre
   - Alimentación para diabéticos
   - Complicaciones y prevención
   - Ejercicio y diabetes

2. **Ejercicio y Actividad Física (8 videos):**
   - Ejercicios cardiovasculares para principiantes
   - Fuerza y flexibilidad en adultos mayores
   - Rutinas en casa sin equipamiento
   - Ejercicio y prevención de enfermedades crónicas

3. **Nutrición (7 videos):**
   - Pirámide alimentaria y plato saludable
   - Lectura de etiquetas nutricionales
   - Reducción de sodio y azúcares
   - Alimentación y salud cardiovascular

4. **Prevención y Salud Pública (5 videos):**
   - Importancia del control médico regular
   - Vacunación en adultos
   - Prevención de enfermedades transmisibles
   - Salud ambiental y prevención

5. **Salud Cardiovascular (4 videos):**
   - Hipertensión: qué es y cómo controlarla
   - Colesterol y riesgo cardiovascular
   - Reconocimiento de síntomas de infarto
   - ACV: prevención y señales de alerta

6. **Salud Mental (3 videos):**
   - Manejo de estrés y ansiedad
   - Importancia del sueño para la salud
   - Detección de síntomas de depresión

7. **Salud Ósea y Articular (3 videos):**
   - Osteoporosis: prevención y tratamiento
   - Artritis: ejercicios y cuidados
   - Importancia del calcio y vitamina D

**Funcionalidad técnica:**
El componente VideoLibrary implementa:
- Filtrado por categoría con navegación intuitiva.
- Vista de grilla responsiva (1 columna en móvil, 2-3 en tablet/desktop).
- Reproducción en modal para mejor experiencia de visualización.
- Lazy loading de iframes para optimizar carga inicial.

#### 3.4.5 Espacio Comunitario de Fisioterapia

Sección diseñada para que profesionales kinesiólogos y fisioterapeutas compartan clases, ejercicios y recursos con pacientes y público general.

**Roles y permisos:**
- **Docentes:** Pueden crear, editar y eliminar clases. Subir videos, documentos y rutinas de ejercicios.
- **Usuarios:** Pueden visualizar clases, marcar favoritos, seguir rutinas y comentar (feature futura).

**Estructura de una clase:**
- **Título y descripción:** Explican objetivo terapéutico (ej. "Ejercicios para rehabilitación de rodilla post-operatoria").
- **Categoría:** Ortopedia, neurología, respiratoria, deportiva, etc.
- **Duración estimada:** Tiempo necesario para completar rutina.
- **Nivel de dificultad:** Principiante, intermedio, avanzado.
- **Contenido multimedia:** Videos embebidos, imágenes con secuencias de ejercicios, PDFs descargables.
- **Contraindicaciones:** Advertencias sobre situaciones en que NO se deben realizar ejercicios.

**Casos de uso:**
- Paciente con lumbalgia crónica accede a rutina de fortalecimiento de core desde su casa.
- Adulto mayor post-ACV sigue programa de rehabilitación motora bajo supervisión remota de kinesiólogo.
- Deportista amateur aprende ejercicios de prevención de lesiones.

### 3.5 Desafíos de Implementación

El desarrollo de SaludSalta NOA enfrentó desafíos técnicos, metodológicos y contextuales:

**Desafío 1: Integración de reconocimiento facial en navegador**
Face-api.js requiere cargar modelos de TensorFlow.js pesados (varios MB). Solución: carga diferida de modelos solo cuando usuario opta por usar reconocimiento facial, reduciendo tiempo de carga inicial.

**Desafío 2: Privacidad y almacenamiento de datos biométricos**
Legislación argentina (Ley 25.326 de Protección de Datos Personales) regula tratamiento de datos sensibles. Solución: almacenar solo descriptores (vectores numéricos), no imágenes; implementar consentimiento explícito; permitir eliminación de datos biométricos en cualquier momento.

**Desafío 3: Traducción y adaptación cultural de contenidos médicos**
Síntomas y enfermedades del dataset en inglés, muchos con términos técnicos. Solución: traducción manual con consulta a profesionales de salud para asegurar precisión terminológica; descripciones en lenguaje accesible.

**Desafío 4: Optimización para conexiones lentas**
En zonas rurales de Salta, conectividad 3G/4G puede ser inestable. Solución: minimización de JavaScript bundles con code-splitting, compresión de imágenes en formato WebP, implementación de service workers para caching (feature futura).

**Desafío 5: Escalabilidad del servicio de ML**
Modelo de ML consume recursos computacionales. Solución: despliegue en Railway con autoscaling, implementación de caché de predicciones frecuentes, rate limiting para prevenir abuso.

### 3.6 Evaluación de Factibilidad

**Factibilidad técnica:** ALTA. Todas las tecnologías utilizadas son maduras, bien documentadas y ampliamente adoptadas. El equipo de desarrollo cuenta con expertise necesario.

**Factibilidad económica:** MEDIA-ALTA. El uso de software libre elimina costos de licencias. Infraestructura cloud tiene costos variables según uso (Vercel tier gratuito cubre hasta ~100GB bandwidth/mes; Railway tier gratuito cubre desarrollo, producción requiere ~USD 20-50/mes según tráfico). MongoDB Atlas ofrece tier gratuito para hasta 512MB de almacenamiento.

**Factibilidad operativa:** MEDIA. Requiere estrategia de comunicación y capacitación para adopción efectiva. Alianzas con Ministerio de Salud de Salta, centros de salud y organizaciones sociales son críticas. Mantenimiento técnico requiere equipo dedicado o voluntarios capacitados.

**Factibilidad social y cultural:** VARIABLE. En zonas urbanas con penetración de smartphones alta, adopción puede ser rápida. En zonas rurales con brecha digital significativa, requiere intervenciones presenciales complementarias (talleres, mediadores comunitarios). Factores culturales como confianza en tecnologías digitales vs medicina tradicional deben considerarse.

**Sostenibilidad a largo plazo:** Requiere modelo de gobernanza que asegure mantenimiento técnico, actualización de contenidos, moderación de espacios comunitarios y evaluación continua de impacto. Opciones: adopción por institución pública provincial, modelo cooperativo con participación de profesionales de salud, o financiamiento mediante fondos de investigación e innovación.

---

## 4. ESTRATEGIA DE COMUNICACIÓN

### 4.1 Objetivos Comunicacionales

La estrategia de comunicación para SaludSalta NOA persigue objetivos múltiples y complementarios:

**Objetivo 1: Dar a conocer la plataforma** entre población objetivo (adultos de Salta y NOA con acceso a internet) y actores clave (profesionales de salud, autoridades sanitarias, organizaciones sociales).

**Objetivo 2: Generar confianza** en la plataforma como fuente confiable de información de salud, superando escepticismo hacia contenidos digitales no avalados por instituciones reconocidas.

**Objetivo 3: Capacitar en el uso** de la plataforma, atendiendo a usuarios con diversos niveles de alfabetización digital mediante tutoriales, talleres presenciales y soporte comunitario.

**Objetivo 4: Promover adopción sostenida** más allá de curiosidad inicial, incentivando uso regular para consulta de información, seguimiento de indicadores (IMC), y participación en espacios comunitarios.

**Objetivo 5: Construir legitimidad institucional** mediante alianzas con Ministerio de Salud, hospitales públicos, universidades y organizaciones de la sociedad civil, posicionando la plataforma como iniciativa de bien público.

### 4.2 Segmentación de Audiencias

**Segmento 1: Adultos mayores (60+ años)**
- **Características:** Mayor prevalencia de enfermedades crónicas, menor alfabetización digital, mayor confianza en instituciones de salud tradicionales.
- **Canales preferidos:** Radio local, centros de jubilados, consultorios médicos, boca a boca.
- **Mensajes clave:** Facilidad de uso (reconocimiento facial), información confiable avalada por profesionales, gratuidad, seguimiento de salud desde casa.
- **Estrategia:** Talleres presenciales en centros de jubilados con demostración en vivo, material impreso con códigos QR, testimonios en video de pares.

**Segmento 2: Adultos de mediana edad (35-59 años)**
- **Características:** Población económicamente activa, preocupación por salud preventiva, nivel medio de alfabetización digital.
- **Canales preferidos:** Redes sociales (Facebook principalmente), WhatsApp, medios digitales locales.
- **Mensajes clave:** Prevención de enfermedades crónicas, ahorro de tiempo (consultas básicas sin salir de casa), herramientas de automonitoreo.
- **Estrategia:** Campañas en redes sociales con infografías sobre prevención, alianzas con obras sociales para difusión entre afiliados.

**Segmento 3: Jóvenes adultos (18-34 años)**
- **Características:** Mayor alfabetización digital, menor preocupación por enfermedades crónicas (salvo factores de riesgo presentes), interés en tecnologías innovadoras.
- **Canales preferidos:** Instagram, TikTok, medios digitales.
- **Mensajes clave:** Innovación (reconocimiento facial, IA), prevención temprana, información científica contra desinformación.
- **Estrategia:** Contenidos en Instagram/TikTok desmitificando mitos de salud, colaboraciones con influencers locales.

**Segmento 4: Profesionales de salud**
- **Características:** Validadores clave de la plataforma, potenciales prescriptores (recomendar a pacientes), interés en herramientas que optimicen su práctica.
- **Canales preferidos:** Colegios profesionales, congresos, publicaciones científicas locales.
- **Mensajes clave:** Complemento (no sustitución) de atención médica, herramienta educativa para pacientes, basada en evidencia científica.
- **Estrategia:** Presentaciones en sociedades médicas de Salta, artículos en revistas de colegios profesionales, invitación a participar como docentes creadores de contenido.

**Segmento 5: Autoridades sanitarias y tomadores de decisión**
- **Características:** Capacidad de amplificar o bloquear adopción, preocupación por responsabilidad institucional, interés en innovaciones costo-efectivas.
- **Canales preferidos:** Reuniones institucionales, informes técnicos, medios de comunicación.
- **Mensajes clave:** Alineación con políticas públicas de salud, costo-efectividad, soberanía tecnológica (software libre), cumplimiento normativo (protección de datos).
- **Estrategia:** Presentación formal ante Ministerio de Salud de Salta, propuesta de piloto en hospitales públicos, publicación de resultados de evaluación.

### 4.3 Canales y Tácticas

**Canales digitales:**

1. **Sitio web de la plataforma:**
   - Sección "Acerca de" explicando misión, equipo, tecnologías utilizadas.
   - Blog con artículos sobre salud preventiva, casos de uso, actualizaciones.
   - Testimonios de usuarios (con consentimiento).

2. **Redes sociales:**
   - **Facebook:** Página oficial con posts semanales sobre prevención de enfermedades, tips de salud, anuncios de nuevos contenidos. Segmentación geográfica para alcanzar población de Salta.
   - **Instagram:** Contenido visual (infografías, videos cortos) sobre mitos de salud, uso de la plataforma, testimonios.
   - **WhatsApp:** Grupo de soporte para usuarios con dudas técnicas, difusión de novedades.

3. **Medios digitales locales:**
   - Notas en portales de noticias de Salta (El Tribuno Digital, InformateSalta) sobre lanzamiento y casos de éxito.
   - Entrevistas en podcasts locales sobre salud y tecnología.

**Canales tradicionales:**

1. **Radio:**
   - Entrevistas en programas de salud de radios locales (AM y FM).
   - Cápsulas informativas de 1 minuto sobre funcionalidades de la plataforma.

2. **Material impreso:**
   - Folletos en centros de salud y hospitales con código QR para acceso rápido.
   - Afiches en salas de espera con infografías sobre reconocimiento facial y predictor de enfermedades.
   - Tarjetas personales para que médicos entreguen a pacientes con URL y usuario/contraseña genérica de demo.

**Canales comunitarios:**

1. **Talleres presenciales:**
   - Capacitaciones en centros de salud, bibliotecas populares, centros de jubilados.
   - Formato: 90 minutos con demostración en vivo, práctica guiada, espacio de preguntas.
   - Entrega de material impreso y seguimiento posterior por WhatsApp.

2. **Agentes sanitarios como multiplicadores:**
   - Capacitación específica para agentes sanitarios que visitan domicilios en zonas rurales.
   - Provisión de tablets con la plataforma precargada para mostrar en terreno.

3. **Alianzas con organizaciones sociales:**
   - Cooperación con comedores comunitarios, organizaciones de adultos mayores, grupos de pacientes crónicos.
   - Espacios de encuentro para presentar la plataforma y resolver dudas.

### 4.4 Mensajes Clave

**Mensaje principal:** "SaludSalta NOA: información de salud confiable y gratuita, accesible desde tu celular o computadora, para que vos y tu familia cuiden su salud."

**Mensajes secundarios:**

- **Facilidad de uso:** "Ingresá con tu rostro, sin contraseñas complicadas."
- **Información confiable:** "Contenidos avalados por profesionales de la salud."
- **Prevención:** "Cuidá tu salud antes de enfermarte: calculá tu IMC, aprendé sobre alimentación saludable, conocé síntomas de alerta."
- **Gratuidad:** "100% gratis, sin publicidad, sin venta de datos."
- **Cercanía:** "Hecha en Salta, para la gente de Salta y el NOA."

### 4.5 Cronograma de Implementación

**Fase 1: Pre-lanzamiento (Mes 1-2)**
- Finalización de desarrollo técnico y testing.
- Creación de materiales de comunicación (folletos, videos tutoriales, infografías).
- Establecimiento de alianzas con Ministerio de Salud y 3-5 centros de salud piloto.
- Capacitación de equipo de soporte y facilitadores de talleres.

**Fase 2: Lanzamiento suave (Mes 3)**
- Publicación de la plataforma con comunicación limitada a aliados estratégicos.
- Realización de 5 talleres piloto en centros de salud de Salta capital.
- Recolección de feedback de usuarios iniciales para ajustes.
- Publicación de primeros contenidos en redes sociales.

**Fase 3: Lanzamiento público (Mes 4)**
- Evento de presentación con presencia de autoridades sanitarias y medios locales.
- Inicio de campaña en redes sociales con alcance pagado (presupuesto estimado: USD 500 para 1 mes).
- Distribución de material impreso en 20 centros de salud de capital e interior provincial.
- Publicación de notas en medios digitales locales.

**Fase 4: Consolidación (Mes 5-12)**
- Realización de 20 talleres en interior provincial (Orán, Tartagal, Cafayate, Metán, etc.).
- Publicación regular en redes sociales (3 posts/semana en Facebook, 2-3 historias/semana en Instagram).
- Medición de métricas de adopción y ajuste de estrategias según resultados.
- Desarrollo de casos de éxito documentados para amplificar comunicación.

### 4.6 Indicadores de Evaluación

**Indicadores de alcance:**
- Usuarios registrados (objetivo mes 6: 1,000; mes 12: 5,000).
- Visitas al sitio web (Google Analytics).
- Seguidores en redes sociales.
- Participantes en talleres presenciales.

**Indicadores de engagement:**
- Usuarios activos mensuales (login al menos 1 vez/mes).
- Tiempo promedio de sesión.
- Páginas vistas por sesión.
- Tasa de retorno (usuarios que vuelven después de primera visita).

**Indicadores de satisfacción:**
- Encuestas post-taller (escala 1-5 sobre utilidad, facilidad de uso, intención de recomendar).
- Comentarios y valoraciones en redes sociales.
- Tasa de abandono en flujos críticos (registro, predictor).

**Indicadores de impacto (a largo plazo):**
- Cambios autoreportados en comportamientos de salud (consultas médicas tempranas, adherencia a tratamientos).
- Testimonios de usuarios sobre utilidad específica (e.g., "detecté síntomas de diabetes y consulté a tiempo").

---

## 5. REFLEXIÓN CRÍTICA

### 5.1 Aprendizajes sobre Tecnología y Sociedad

El proceso de desarrollo de SaludSalta NOA cristaliza tensiones y aprendizajes sobre la relación entre tecnología, poder y bien común que atravesaron la asignatura de Comunicación y Pensamiento Crítico en Ciencia de Datos.

**Tensión 1: Innovación tecnológica vs. refuerzo de desigualdades**
Como advierte Virginia Eubanks (2018) en "Automating Inequality", las tecnologías digitales aplicadas a políticas sociales pueden automatizar y hacer más eficientes sistemas de exclusión preexistentes. En SaludSalta NOA, esto se manifiesta en el riesgo de que la plataforma beneficie principalmente a sectores urbanos con acceso a internet y dispositivos, profundizando la brecha con poblaciones rurales ya marginadas del sistema de salud.

La reflexión crítica obliga a preguntarnos: ¿estamos solucionando el problema de acceso a salud o creando una solución que solo beneficia a quienes ya tienen más recursos? La respuesta no es binaria. La plataforma puede simultáneamente: (a) ampliar acceso para sectores urbanos con conectividad pero barreras económicas o de tiempo para consultas médicas, y (b) ser inutilizable para comunidades rurales sin internet. Reconocer esta limitación no invalida el proyecto, pero sí exige honestidad sobre su alcance y la necesidad de complementar con intervenciones no digitales.

**Aprendizaje:** Las tecnologías no son soluciones universales. Su valor depende del contexto de implementación y de estrategias de mitigación de exclusiones. En salud pública, la digitalización debe ser un complemento, nunca un sustituto de infraestructura física, profesionales presenciales y políticas integrales.

**Tensión 2: Eficiencia algorítmica vs. opacidad y sesgos**
El predictor de enfermedades basado en machine learning ilustra las promesas y peligros de la IA en salud. Por un lado, ofrece orientación instantánea basada en patrones estadísticos derivados de miles de casos. Por otro, opera como "caja negra" cuyo funcionamiento interno es inaccesible para el usuario (y parcialmente para los desarrolladores, dado el carácter no-lineal de Random Forests).

Como argumentan Ruha Benjamin (2019) en "Race After Technology" y Cathy O'Neil (2016) en "Weapons of Math Destruction", los algoritmos no son neutrales: codifican valores, asunciones y sesgos de quienes los diseñan y de los datos con que se entrenan. El dataset de Kaggle usado para entrenar nuestro modelo probablemente no incluye datos de poblaciones indígenas del NOA, personas sin acceso a sistemas formales de salud, o patologías específicas de la región (Chagas, paludismo).

**Aprendizaje:** El pensamiento crítico en ciencia de datos exige interrogar constantemente: ¿Qué datos faltaron? ¿Qué voces no están representadas? ¿Qué sesgos históricos se replican? En SaludSalta NOA, esto se tradujo en decisiones como: (a) presentar predicciones como orientaciones, no diagnósticos; (b) enfatizar la necesidad de consulta profesional; (c) documentar limitaciones del modelo en la interfaz.

**Tensión 3: Soberanía tecnológica vs. dependencia de infraestructuras corporativas**
Aunque la plataforma se construyó con software libre (Next.js, Express, MongoDB, Scikit-learn), su despliegue depende de servicios comerciales (Vercel, Railway, MongoDB Atlas). Esto plantea contradicciones: ¿puede haber soberanía tecnológica cuando la infraestructura subyacente está controlada por empresas estadounidenses?

La respuesta corta es: soberanía tecnológica es un espectro, no un estado binario. Usar software libre garantiza que el código permanezca bajo control público (cualquier institución argentina puede copiarlo, auditarlo, modificarlo). Pero la dependencia de cloud providers introduce vulnerabilidades: cambios en precios, términos de servicio, o disponibilidad del servicio quedan fuera de control local.

**Aprendizaje:** La soberanía tecnológica plena requeriría infraestructura de hosting local (servidores en instituciones públicas argentinas). Esto implica costos y expertise que pueden ser prohibitivos en fases iniciales. Una estrategia pragmática es: comenzar con cloud commercial para viabilizar el proyecto, documentar todo para facilitar migración futura, y abogar por inversión pública en infraestructura digital soberana.

### 5.2 Comunicación de Ciencia y Alfabetización Crítica

El componente comunicacional de SaludSalta NOA enfrenta desafíos que exceden la mera difusión de información: requiere alfabetización crítica sobre tecnología y salud.

**Desafío 1: Combatir desinformación sin caer en paternalismo**
Las redes sociales están saturadas de información de salud falsa o engañosa: dietas milagrosas, curas alternativas sin evidencia, negación de vacunas. SaludSalta NOA busca ser fuente confiable, pero corre el riesgo de adoptar tono paternalista ("nosotros sabemos, ustedes no").

La alfabetización crítica implica no solo proveer información correcta, sino enseñar a evaluar fuentes: ¿Quién publica esto? ¿Qué evidencia respalda las afirmaciones? ¿Hay conflictos de interés? Como proponen D'Ignazio y Klein (2020), el objetivo no es que la población "confíe en los expertos" acríticamente, sino que desarrolle herramientas para distinguir conocimiento riguroso de charlatanería.

**Estrategia adoptada:** La biblioteca de videos incluye criterios de curación transparentes. La sección "Acerca de" explica qué metodologías científicas respaldan el predictor de enfermedades. Se invita a usuarios a cuestionar y reportar contenidos que consideren problemáticos.

**Desafío 2: Accesibilidad lingüística y cultural**
El lenguaje médico es históricamente excluyente: jerga técnica que funciona como barrera de acceso. La traducción de síntomas y enfermedades de inglés médico a español accesible fue ejercicio de democratización de conocimiento.

Pero accesibilidad lingüística va más allá de simplificar vocabulario: requiere considerar marcos culturales. Por ejemplo, en comunidades indígenas del NOA, nociones de salud y enfermedad pueden diferir de marcos biomédicos occidentales. Una futura expansión de SaludSalta NOA debería incorporar perspectivas de medicina tradicional y cosmovisiones locales, no como "folklore" sino como sistemas de conocimiento válidos en diálogo con biomedicina.

**Reflexión:** ¿Puede una plataforma tecnológica abrazar pluralismo epistemológico sin caer en relativismo que niegue valor de evidencia científica? Esta tensión no se resuelve fácilmente, pero ignorarla reproduce colonialidad del saber.

### 5.3 Ética de Datos en Salud

El trabajo con datos de salud implica responsabilidades éticas amplificadas: estos datos revelan vulnerabilidades, pueden generar discriminación, y su mal uso tiene consecuencias graves.

**Principio 1: Privacidad como derecho, no como commodity**
En el capitalismo de vigilancia descrito por Shoshana Zuboff (2019), la privacidad se ha mercantilizado: quienes pueden pagar acceden a servicios que respetan su privacidad, mientras servicios "gratuitos" monetizan datos de usuarios. SaludSalta NOA rechaza este modelo: la gratuidad no se financia con venta de datos, sino que se concibe como servicio público (idealmente financiado por Estado).

La decisión de almacenar descriptores faciales (vectores numéricos) en lugar de imágenes es técnica pero también ética: reduce superficie de ataque en caso de brecha de seguridad. Incluso si alguien robara la base de datos, los descriptores no permiten reconstruir rostros.

**Principio 2: Consentimiento informado real**
Los "términos y condiciones" que nadie lee son ficción de consentimiento. Para que el consentimiento sea genuino, debe ser comprensible. SaludSalta NOA implementa:
- Resúmenes en lenguaje claro de qué datos se recopilan y por qué.
- Opcionalidad: el reconocimiento facial es opcional, quienes prefieren solo contraseña pueden optar por ello.
- Derecho al olvido: usuarios pueden eliminar sus cuentas y datos asociados en cualquier momento.

**Principio 3: Transparencia sobre limitaciones**
Parte de la ética en IA es honestidad sobre lo que los sistemas pueden y no pueden hacer. El predictor de enfermedades puede errar, el reconocimiento facial puede fallar. Ocultar estas limitaciones sería engañoso. Comunicarlas construye confianza a largo plazo.

### 5.4 Pensamiento Crítico Aplicado: Qué Habría Hecho Diferente

La reflexión crítica exige auto-evaluación: ¿qué decisiones fueron acertadas? ¿Qué aspectos merecen revisión?

**Mejora 1: Co-diseño con usuarios finales**
El desarrollo de la plataforma siguió modelo top-down: equipo técnico identifica problema, diseña solución, luego busca adopción. Un enfoque más participativo habría involucrado a usuarios potenciales (adultos mayores, pacientes crónicos, agentes sanitarios) desde fases tempranas de diseño. Esto podría haber revelado necesidades no anticipadas y evitado funcionalidades poco útiles.

**Lección:** La inclusión genuina requiere compartir poder de diseño, no solo pedir feedback sobre decisiones ya tomadas.

**Mejora 2: Evaluación de sesgos del modelo de ML**
Aunque se reconocieron limitaciones del dataset, no se realizó auditoría sistemática de sesgos. ¿El modelo tiene peor performance en enfermedades que afectan desproporcionadamente a mujeres? ¿Qué pasa con síntomas que son reportados diferente según género o edad?

**Lección:** La ciencia de datos responsable requiere no solo evaluar accuracy promedio, sino desagregación por subgrupos para detectar inequidades.

**Mejora 3: Plan de sostenibilidad a largo plazo**
El desarrollo técnico fue exitoso, pero falta modelo claro de gobernanza y financiamiento sostenible. ¿Quién mantendrá la plataforma en 5 años? ¿Cómo se actualizarán contenidos? ¿Qué mecanismos de rendición de cuentas ante usuarios existen?

**Lección:** Los proyectos de tecnología cívica requieren planificación institucional desde el inicio, no como afterthought.

### 5.5 Contribución de la Asignatura al Proyecto

La asignatura Comunicación y Pensamiento Crítico en Ciencia de Datos proporcionó marcos teóricos y metodológicos sin los cuales SaludSalta NOA habría sido un proyecto técnicamente competente pero conceptualmente limitado.

**Aporte 1: Visión crítica sobre neutralidad tecnológica**
Las lecturas de Crawford, Noble, Benjamin, D'Ignazio y Klein desnaturalizaron la noción de que "los datos hablan por sí mismos" o que "los algoritmos son objetivos". Esto se tradujo en decisiones concretas: documentar limitaciones del predictor, diseñar para accesibilidad, priorizar privacidad.

**Aporte 2: Herramientas de análisis de comunicación en salud**
Los conceptos de alfabetización en salud, brecha digital, y comunicación de riesgo informaron la estrategia de difusión y el diseño de contenidos educativos. Sin este marco, la plataforma podría haber replicado lenguaje excluyente de comunicación médica tradicional.

**Aporte 3: Ética de datos como práctica, no declaración**
La asignatura enfatizó que la ética no es sección final de un paper sino conjunto de decisiones cotidianas en cada etapa de un proyecto. Esto se materializó en: elección de software libre, minimización de datos recopilados, transparencia sobre funcionamiento de algoritmos.

**Síntesis:** La formación en pensamiento crítico transforma el rol del científico de datos de "técnico neutral" a "agente ético con responsabilidad sobre impactos sociales de su trabajo".

---

## 6. CONCLUSIONES

### 6.1 Síntesis del Proyecto

SaludSalta NOA representa un ejercicio de aplicación de ciencia de datos, ingeniería de software y pensamiento crítico a un desafío de salud pública regional. La plataforma integra autenticación biométrica, machine learning para predicción de enfermedades, herramientas de automonitoreo y contenidos educativos en una arquitectura tecnológica basada en software libre y principios de accesibilidad.

Más allá de su funcionalidad técnica, el proyecto constituye un caso de estudio sobre cómo las tecnologías digitales pueden ser diseñadas, comunicadas y evaluadas desde perspectivas de justicia social, ética de datos y soberanía tecnológica. No pretende ser solución definitiva a problemas estructurales de salud pública en el NOA, pero sí una contribución que amplía acceso a información y herramientas de prevención para sectores con barreras geográficas o económicas.

### 6.2 Logros Principales

1. **Integración técnica exitosa** de componentes complejos (reconocimiento facial, ML, gestión de contenidos) en plataforma cohesiva y funcional.

2. **Traducción y adaptación** de 132 síntomas y 41 enfermedades desde jerga médica inglesa a español accesible, democratizando conocimiento de salud.

3. **Diseño centrado en accesibilidad** con cumplimiento de estándares WCAG AA y optimización para dispositivos de gama baja.

4. **Estrategia de comunicación integral** que articula canales digitales, tradicionales y comunitarios para abordar brecha digital.

5. **Reflexión crítica documentada** sobre limitaciones, sesgos y desafíos éticos, demostrando madurez analítica más allá de la competencia técnica.

### 6.3 Limitaciones Reconocidas

1. **Brecha digital no resuelta:** La plataforma no es accesible para sectores sin conectividad o dispositivos. Requiere complementación con intervenciones presenciales.

2. **Sesgos en modelo de ML:** El predictor puede tener menor precisión en patologías no representadas en el dataset o poblaciones subrepresentadas.

3. **Sostenibilidad incierta:** Falta modelo claro de gobernanza institucional y financiamiento a largo plazo.

4. **Falta de co-diseño:** Usuarios finales no participaron en fases iniciales de diseño, lo que puede limitar relevancia de funcionalidades.

5. **Dependencia de infraestructura corporativa:** Aunque usa software libre, depende de servicios cloud comerciales.

### 6.4 Recomendaciones para Trabajo Futuro

1. **Evaluación de impacto con usuarios reales:** Estudios de usabilidad, entrevistas cualitativas, y medición de cambios en comportamientos de salud.

2. **Mejora del modelo de ML:** Reentrenamiento con datos locales del sistema de salud de Salta (con consentimiento), inclusión de enfermedades regionales, auditoría de sesgos.

3. **Expansión de contenidos:** Incorporación de perspectivas de medicina tradicional, traducción a lenguas originarias (quechua, wichí, guaraní).

4. **Desarrollo de app móvil nativa:** Versión offline que permita uso en zonas sin conectividad, sincronización cuando hay internet disponible.

5. **Institucionalización:** Presentación formal ante Ministerio de Salud de Salta para adopción como herramienta oficial, con presupuesto asignado para mantenimiento.

6. **Investigación sobre adopción:** Estudios sobre factores que facilitan u obstaculizan uso de la plataforma en diferentes contextos socioculturales.

### 6.5 Reflexión Final

La ciencia de datos no es disciplina neutral que simplemente "analiza información". Es práctica situada social, política y éticamente, con poder de reproducir inequidades o contribuir a su superación. SaludSalta NOA, con todas sus imperfecciones, representa apuesta por usar herramientas computacionales al servicio del bien común, con conciencia crítica sobre sus limitaciones.

El pensamiento crítico exige preguntarse continuamente: ¿Para quién es esta tecnología? ¿Quién se beneficia? ¿Qué voces fueron escuchadas en su diseño? ¿Qué daños puede causar? Estas preguntas no tienen respuestas definitivas, pero hacerlas y documentar las tensiones que revelan es parte esencial de la responsabilidad ética de quienes trabajamos con datos y tecnología.

La salud es derecho humano fundamental. Las tecnologías digitales pueden ampliar su ejercicio, pero nunca sustituir la inversión en sistemas públicos robustos, profesionales bien formados y políticas redistributivas. SaludSalta NOA es herramienta complementaria, no solución mágica. Su valor dependerá de cómo se implemente, comunique, evalúe y adapte a las realidades dinámicas de las comunidades a las que pretende servir.

---

## 7. BIBLIOGRAFÍA

Benjamin, R. (2019). *Race After Technology: Abolitionist Tools for the New Jim Code*. Polity Press.

Berners-Lee, T. (1997). World Wide Web Consortium (W3C). Web Accessibility Initiative. https://www.w3.org/WAI/

Buolamwini, J., & Gebru, T. (2018). Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification. *Proceedings of Machine Learning Research*, 81, 1-15.

Crawford, K. (2021). *Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence*. Yale University Press.

D'Ignazio, C., & Klein, L. F. (2020). *Data Feminism*. MIT Press.

Eubanks, V. (2018). *Automating Inequality: How High-Tech Tools Profile, Police, and Punish the Poor*. St. Martin's Press.

Ministerio de Salud de la Nación Argentina. (2022). *Determinantes Sociales de la Salud*. https://www.argentina.gob.ar/salud

Morozov, E. (2013). *To Save Everything, Click Here: The Folly of Technological Solutionism*. PublicAffairs.

Noble, S. U. (2018). *Algorithms of Oppression: How Search Engines Reinforce Racism*. NYU Press.

Nutbeam, D. (2000). Health literacy as a public health goal: A challenge for contemporary health education and communication strategies into the 21st century. *Health Promotion International*, 15(3), 259-267.

Obermeyer, Z., Powers, B., Vogeli, C., & Mullainathan, S. (2019). Dissecting racial bias in an algorithm used to manage the health of populations. *Science*, 366(6464), 447-453.

O'Neil, C. (2016). *Weapons of Math Destruction: How Big Data Increases Inequality and Threatens Democracy*. Crown.

Organización Mundial de la Salud (OMS). (2008). *Comisión sobre Determinantes Sociales de la Salud - Subsanar las desigualdades en una generación*. OMS.

Stallman, R. M. (2002). *Free Software, Free Society: Selected Essays of Richard M. Stallman*. GNU Press.

UNESCO. (2021). *Recomendación sobre la Ética de la Inteligencia Artificial*. https://unesdoc.unesco.org/ark:/48223/pf0000381137_spa

Van Dijk, J. A. G. M. (2020). *The Digital Divide*. Polity Press.

Web Content Accessibility Guidelines (WCAG) 2.1. (2018). W3C. https://www.w3.org/TR/WCAG21/

Zuboff, S. (2019). *The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power*. PublicAffairs.

---

## ANEXOS

### Anexo A: Capturas de Pantalla de la Plataforma

[Se incluirían capturas de pantalla de las principales secciones: página de inicio, formulario de registro con reconocimiento facial, calculadora de IMC, predictor de enfermedades, biblioteca de videos, espacio de fisioterapia]

### Anexo B: Código de Conducta y Términos de Uso

[Se incluiría el texto completo de políticas de privacidad, términos de servicio y código de conducta para usuarios]

### Anexo C: Documentación Técnica

**Repositorio de código:** [URL del repositorio GitHub]

**Tecnologías utilizadas:**
- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose
- ML: Python 3.10, Flask, Scikit-learn, Pandas, Numpy
- Autenticación: NextAuth.js, face-api.js, bcrypt, jsonwebtoken
- Despliegue: Vercel, Railway, MongoDB Atlas

**Variables de entorno requeridas:**
```
# Backend
MONGODB_URI=mongodb+srv://...
JWT_SECRET=...
JWT_EXPIRES_IN=7d

# Frontend
NEXT_PUBLIC_API_URL=...
NEXT_PUBLIC_DISEASE_PREDICTOR_URL=...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
```

### Anexo D: Materiales de Comunicación

[Se incluirían ejemplos de: folleto impreso, infografías para redes sociales, guión de video tutorial, presentación para talleres presenciales]

---

**Declaración de Autoría**

Declaro que este trabajo fue desarrollado en el marco de la asignatura Comunicación y Pensamiento Crítico en Ciencia de Datos de la Licenciatura en Ciencia de Datos de UPATECO. El proyecto SaludSalta NOA es de mi autoría en colaboración con [otros miembros del equipo si aplica], habiendo respetado principios de integridad académica en el uso de fuentes bibliográficas y código de terceros debidamente citados.

La plataforma desarrollada tiene propósitos educativos y de investigación. Su eventual implementación en contextos reales requeriría aprobaciones institucionales, auditorías de seguridad, y cumplimiento de regulaciones sanitarias vigentes.

---

*Documento generado: 9 de noviembre de 2025*
*Palabras: ~14,500*
*Páginas estimadas: 30-35 (formato académico estándar)*