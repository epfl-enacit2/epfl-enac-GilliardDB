# EPFL-ENAC-GILLIARDDB

## Installation

```bash
$ npm install epfl-enac-gilliarddb
```

## Description

Connexion à la DB pour le projet Gilliard (Service d'acquisition de données Arduino)

## Utilisation

```js
var GilliardDb = require('epfl-enac-gilliarddb')(configs.db);
```

où 'configs.db' correspond aux configurations pour la connexion àa DB (hostname,name,username,password).
La variable GilliardDb pourra être utilisée comme un modèle de sequelize à part entière.

## Docs

* [Modèle de la DB en script SQL](./docs/GilliardDbModel.sql)
* [Modèle de la DB en image PNG (à voir ci-dessous aussi)](./docs/GilliardDbModel.png)

## Modèle

[![Modèle de la DB](./docs/GilliardDbModel.png)](http://enacit2.epfl.ch/)