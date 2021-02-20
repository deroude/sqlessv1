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

The following configuration options are present in the main configuration file:

- `version`: the API version;
- `dbConnection`: DB connection properties
    - `type`: 'postgres' (to be extended with other connection types)
    - `host`: the host of the DB;
    - `port`: the port of the DB;
    - `user`: the username that the application will use to connect to the DB;
    - `password`: the respective password;
    - `database`: the database name;
    - `migrations`: a list of migrations, with the following options:
        - `id`: a human readable unique id (e.g. `001_initial`);
        - `applyPath`: the path of the migration SQL code
        - `rollbackPath`: the path of the SQL code used to rollback this migration;
    - `mail`: Batch mail configuration, with the following options;
        - `smtp`: configuration if SQLess shall send mail using a SMTP server: 
            - `uri`: SMTP URI;
            - `host`: SMTP host;
            - `port`: SMTP port;
            - `secure`: whether the SMTP server uses TLS;
            - `username`: username to connect to the SMTP server;
            - `password`: respective password;
        - `defaultSender`: the email to be displayed;
        - `mailGun`: Options used if the mail uses a MailGun account
            - `apiKey`: the MailGun API Key;
            - `domain`: the domain declared on MailGun
- `apiPath`: the path of the OpenAPI file;
- `methodPaths`: for each method, the paths of the respective operations, e.g.:
```
methodPaths:
  /article:
    get:
      path: queries/get-list-article.yaml
    post:
      path: queries/add-article.yaml
```
- `corsOrigin`: the CORS origin header to be set;
- `permissionClaim`: the claim that should be checked against the API permission requirements;

## Operation Delegates

Each API method is assigned a delegate, via the SQLess config. 

The following delegate types are supported, with their respective configurations:

### SQL Query delegate

This delegate executes a query against the database.

The following options are available:

- `statement`: the SQL prepared statement to be executed;
- `params`: the array of parameter paths (e.g. `body.email`, `params.id` -- note that `body` refers to the request body, which can pe json and thus complex, e.g. `body.address.street`, while `params` refers to the request params, either path or query);
- `resultType`: this defines what kind of result shall be read after executing the query:
    - `row` means a single row shall be expected (e.g. from a query by id)
    - `scalar` means a single value shall be expected (e.g. from a query reading a single column)
    - `set` means a collection of objects shall be expected
    - `none` means that no result is expected (e.g. from a delete query)
- `assign`: assign the result to this field on the context, to be returned or used by other delegates;
- `forEachInArray`: if this option is set, its value shall be used to read an array of param objects and the statement shall be executed for each element of the array, with the mapping defined by the `params` array;

### Mapping delegate

The Mapping Delegate is used to transform an object or array into another object or array, by renaming fields or selecting a projection of the source object.

The following options are available:

- `from`: the object from the context that is the source of the mapping;- `to`: the object that shall be set on the context as a result of the mapping;
- `isArray`: whether the mapping is performed on an array of objects (thus each object shall be mapped and the result collected);
- `fields`: the field mappings:
    - `from`: the source field
    - `to`: the name of the destination field
- `builtIn`: the name of a built in mapping (the `fields` option is no longer necessary if this is specified); such mappings are `camelToSnake` and `snakeToCamel` to translate between database specific fields and camel case fields used commonly in JS apps.

### Assert delegate

The assertion delegate is used to return an error code if a certain condition is not truthy.

- `truthyParam`: the name of the field in the context that is tested;
- `failResponseCode`: the HTTP code to be returned if the tested field is not truthy;
- `failResponseMessage`: the message to be sent back if the tested field is not truthy;

### Mail delegate

The mail delegate is used to perform a templated bulk mail operation.

The following options are available:

- `templateVar`: the variable on the context holding the email template;
- `recipientsVar`:the variable on the context holding the list of receipient emails;

### Handlebars (templating) delegate

The Handlebars delegate is used to perform a template fill operation.

The following options are available:

- `templateVar`: the variable on the context holding the email template;
- `paramVars`: an key value pair object containing the parameters to be filled in the template
- `assign`: the field in the context on which the result of the template fill operation shall be stored

### Html2Pdf delegate

The Html2Pdf delegate is used to perform a conversion of HTML content to PDF (e.g. for download)

The following options are available:

- `sourceVar`: the HTML content to be converted;
- `assign`: the field in the context on which the result of the template fill operation shall be stored;
- `options`: additional Html2PDF options;

### Stub delegate

The Stub delegate is used to simply assign an arbitrary payload to a variable in the context.

It can be used, as the name suggests, for stubbing a method with a relevant result.

The following options are available:

- `payload`: the object that should be returned;
- `assign`: the field in the context on which the result shall be stored

### Custom delegate

The custom delegate allows the SQLess user to execute a custom Node JS function.

The following options are available:

- `path`: the path, relative to the `.sqless` folder, of the `js` function declaration;