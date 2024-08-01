# Leo Wrapper

Un cliente de Nodejs (server) para el API de LEO (Universidad de Guadalajara)

## Tabla de Contenidos

- [Funcionalidades](#funcionalidades)
- [Instalación](#instalación)
- [Uso](#uso)
- [Desarrollo](#desarrollo)

## Funcionalidades

Esta librería incluye funcionalidades para la consulta de:

#### Obtener información del estudiante

- Información personal
- Planes de estudio
- Horarios

## Instalación

    $ npm install leo-wrapper --save

## Uso

Primeramente, declare la inicialización del cliente

```javascript
import LeoWrapper from 'leo-wrapper';

const LEO = await LeoWrapper.build({
  userCode: 123456789,
  userPassword: 'SECRETPASSWORD',
});
```

Despues, use los métodos del cliente para hacer peticiones al API. El cliente utiliza async/await, por lo que necesitas proveer de un bloque trycatch para el manejo de errores.

```javascript
// Obtener información personal del estudiante
const studentInfo = await LEO.getStudentInfo<T>();

// Obtener horario del estudiante
const studentSchedule = await LEO.getStudentSchedule<T>({
  careerProgramID: 'INNI',
  academicTerm: '2024-B',
});
```

## Desarrollo

¿Crees que algo puede ser mejorado o incluido a la librería? [Abre un nuevo issue](https://github.com/notroaloch/leo-wrapper/issues/new) o clona el proyecto y envía un pull request con tus cambios
