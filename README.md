# SQLess

SQLess is a framework for generating and maintaining a complete REST backend with SQL persistence, based on an OpenAPI spec.

## Installation and quick startup

Add the SQLess core library to your `devDependencies`:

```bash
npm i --save-dev @sqless/core
```

Generate your initial backend configuration using an OpenAPI spec:

```bash
sqless init -a your-api-spec.yaml
```

Start the dockerized PosgreSQL:

```bash
cd .sqless && docker-compose up db
```

Start the server:

```bash
sqless start
```

This will apply the necessary migrations in Postgres and start a REST server with a naive / default implementation of the methods from the OpenAPI spec.

## SQLess configuration

## Operation Delegates

### SQL Query delegate

### Mapping delegate

### Assert delegate

### Mail delegate

### Handlebars (templating) delegate

### Html2Pdf delegate

### Stub delegate

### Custom delegate