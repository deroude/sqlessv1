(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['001_initial.sql'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "CREATE TABLE \""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":27}}}) : helper)))
    + "\" (\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":3,"column":0},"end":{"line":10,"column":9}}})) != null ? stack1 : "")
    + ");\r\n\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data,"loc":{"start":{"line":4,"column":4},"end":{"line":8,"column":13}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":0},"end":{"line":9,"column":30}}})) != null ? stack1 : "")
    + "\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":4,"column":18},"end":{"line":4,"column":31}}}) : helper)))
    + "\" serial NOT NULL PRIMARY KEY";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":14},"end":{"line":5,"column":27}}}) : helper)))
    + "\" "
    + alias4(((helper = (helper = lookupProperty(helpers,"type") || (depth0 != null ? lookupProperty(depth0,"type") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data,"loc":{"start":{"line":5,"column":29},"end":{"line":5,"column":37}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isRequired") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":43}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"fk") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":53}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "NOT NULL";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " REFERENCES \""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"fk") || (depth0 != null ? lookupProperty(depth0,"fk") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"fk","hash":{},"data":data,"loc":{"start":{"line":7,"column":32},"end":{"line":7,"column":38}}}) : helper)))
    + "\"(\"id\")";
},"10":function(container,depth0,helpers,partials,data) {
    return ",";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"entities") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":13,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['001_initial_rollback.sql'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "DELETE TABLE IF EXISTS \""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":2,"column":24},"end":{"line":2,"column":37}}}) : helper)))
    + "\" CASCADE;\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"entities") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":3,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['add-entity.yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":28},"end":{"line":6,"column":102}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":6,"column":45},"end":{"line":6,"column":60}}}) : helper)))
    + "\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":61},"end":{"line":6,"column":91}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return ",";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":34},"end":{"line":8,"column":102}}})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "$"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":8,"column":51},"end":{"line":8,"column":61}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":61},"end":{"line":8,"column":91}}})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      "
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":11,"column":70}}})) != null ? stack1 : "")
    + "\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "- body."
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":39}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"fk") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":39},"end":{"line":11,"column":59}}})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return ".id";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "operations:\r\n  - id: Add"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":11},"end":{"line":2,"column":21}}}) : helper)))
    + "\r\n    type: sql\r\n    template: >-\r\n      INSERT INTO \""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":19},"end":{"line":5,"column":34}}}) : helper)))
    + "\" ( \r\n        "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":8},"end":{"line":6,"column":111}}})) != null ? stack1 : "")
    + " \r\n      )\r\n      VALUES ("
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":8,"column":14},"end":{"line":8,"column":111}}})) != null ? stack1 : "")
    + ") RETURNING *;\r\n    params:"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "    singleRow: true\r\n    assign: \r\n      var: New"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":15,"column":14},"end":{"line":15,"column":24}}}) : helper)))
    + "\r\nreturn: New"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":11},"end":{"line":16,"column":21}}}) : helper)))
    + "\r\n";
},"useData":true});
templates['delete-entity.yaml'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "operations:\r\n  - id: Delete"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":24}}}) : helper)))
    + "\r\n    type: sql\r\n    template: >-\r\n      DELETE FROM \""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":19},"end":{"line":5,"column":32}}}) : helper)))
    + "\" where \"id\" = $1;\r\n    params:\r\n      - params.id";
},"useData":true});
templates['docker-compose.yaml'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "version: '2.0'\r\nservices:\r\n    db:\r\n        image: postgres\r\n        ports:\r\n            - \"5432:5432\"\r\n        environment:\r\n            POSTGRES_PASSWORD: postgres\r\n        volumes:\r\n            - ./postgres-init.sql:/docker-entrypoint-initdb.d/01-init.sql\r\n    keycloak:\r\n        image: jboss/keycloak\r\n        ports:\r\n            - \"8180:8080\"\r\n        depends_on:\r\n            - db\r\n        volumes:\r\n            - ./realm-config.json:/tmp/realm-config.json\r\n        environment:\r\n            DB_VENDOR: postgres\r\n            DB_DATABASE: keycloak\r\n            DB_ADDR: db\r\n            DB_PORT: 5432\r\n            DB_USER: keycloak\r\n            DB_PASSWORD: keycloak\r\n            KEYCLOAK_USER: admin\r\n            KEYCLOAK_PASSWORD: admin\r\n            KEYCLOAK_IMPORT: /tmp/realm-config.json\r\n        ";
},"useData":true});
templates['generic-handler.yaml'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "operations:\r\n  - id: GenericOperation\r\n    type: sql\r\n    template: >-\r\n      SELECT 1;\r\n    singleRow: true\r\n    assign: \r\n      var: Result\r\nreturn: Result";
},"useData":true});
templates['get-entity-list.yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":34},"end":{"line":5,"column":49}}}) : helper)))
    + "\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":50},"end":{"line":5,"column":80}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return ",";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "operations:\r\n  - id: GetList"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":15},"end":{"line":2,"column":25}}}) : helper)))
    + "\r\n    type: sql\r\n    template: >-\r\n      SELECT "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":89}}})) != null ? stack1 : "")
    + " \r\n      FROM \""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":27}}}) : helper)))
    + "\" ;    \r\n    singleRow: false\r\n    assign: \r\n      var: List"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":9,"column":15},"end":{"line":9,"column":25}}}) : helper)))
    + "\r\nreturn: List"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":10,"column":22}}}) : helper)));
},"useData":true});
templates['get-entity-single.yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":34},"end":{"line":5,"column":49}}}) : helper)))
    + "\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":50},"end":{"line":5,"column":80}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return ",";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "operations:\r\n  - id: GetSingle"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":17},"end":{"line":2,"column":27}}}) : helper)))
    + "\r\n    type: sql\r\n    template: >-\r\n      SELECT "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":89}}})) != null ? stack1 : "")
    + " \r\n      FROM \""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":6,"column":12},"end":{"line":6,"column":25}}}) : helper)))
    + "\" where \"id\" = $1;\r\n    params:\r\n      - params.id\r\n    singleRow: true\r\n    assign: \r\n      var: Single"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":17},"end":{"line":11,"column":27}}}) : helper)))
    + "\r\nreturn: Single"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":12,"column":14},"end":{"line":12,"column":24}}}) : helper)));
},"useData":true});
templates['postgres-init.sql'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "CREATE SCHEMA IF NOT EXISTS sqless;\r\nCREATE EXTENSION IF NOT EXISTS \"uuid-ossp\" WITH SCHEMA sqless;\r\nDROP TABLE IF EXISTS sqless.apis;\r\nDROP TABLE IF EXISTS sqless.accounts;\r\nCREATE TABLE IF NOT EXISTS sqless.accounts (\r\n    id uuid NOT NULL DEFAULT sqless.uuid_generate_v1() PRIMARY KEY,\r\n    email varchar NOT NULL,\r\n    kind varchar NOT NULL DEFAULT 'FREE',\r\n    \"password\" varchar NOT NULL DEFAULT sqless.uuid_generate_v4()\r\n);\r\nCREATE TABLE IF NOT EXISTS sqless.apis (\r\n    id uuid NOT NULL DEFAULT sqless.uuid_generate_v1() PRIMARY KEY,\r\n    account uuid NOT NULL REFERENCES sqless.accounts(id),\r\n    hash varchar NULL,\r\n    \"schema\" varchar NOT NULL\r\n);\r\nCREATE USER keycloak WITH PASSWORD 'keycloak';\r\nCREATE DATABASE keycloak;\r\nGRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;";
},"useData":true});
templates['realm-config.json'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            {\r\n                \"name\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":19,"column":25},"end":{"line":19,"column":35}}}) : helper)))
    + "\",\r\n                \"description\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":20,"column":32},"end":{"line":20,"column":49}}}) : helper)))
    + "\"\r\n            }"
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":13},"end":{"line":21,"column":43}}})) != null ? stack1 : "")
    + "\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return ",";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":28,"column":38},"end":{"line":28,"column":46}}}) : helper)))
    + "\""
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":47},"end":{"line":28,"column":77}}})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "{\r\n    \"realm\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"realmName") || (depth0 != null ? lookupProperty(depth0,"realmName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"realmName","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":29}}}) : helper)))
    + "\",\r\n    \"enabled\": true,\r\n    \"accessTokenLifespan\": 60,\r\n    \"accessCodeLifespan\": 60,\r\n    \"accessCodeLifespanUserAction\": 300,\r\n    \"ssoSessionIdleTimeout\": 600,\r\n    \"ssoSessionMaxLifespan\": 36000,\r\n    \"sslRequired\": \"external\",\r\n    \"registrationAllowed\": false,\r\n    \"privateKey\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"privateKey") || (depth0 != null ? lookupProperty(depth0,"privateKey") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"privateKey","hash":{},"data":data,"loc":{"start":{"line":11,"column":19},"end":{"line":11,"column":35}}}) : helper)))
    + "\",\r\n    \"publicKey\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"publicKey") || (depth0 != null ? lookupProperty(depth0,"publicKey") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"publicKey","hash":{},"data":data,"loc":{"start":{"line":12,"column":18},"end":{"line":12,"column":33}}}) : helper)))
    + "\",\r\n    \"requiredCredentials\": [ \"password\" ],\r\n    \"users\" : [],\r\n    \"roles\" : {\r\n        \"realm\" : [\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":0},"end":{"line":22,"column":9}}})) != null ? stack1 : "")
    + "        ]\r\n    },\r\n    \"scopeMappings\": [\r\n        {\r\n            \"client\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"realmName") || (depth0 != null ? lookupProperty(depth0,"realmName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"realmName","hash":{},"data":data,"loc":{"start":{"line":27,"column":23},"end":{"line":27,"column":38}}}) : helper)))
    + "-client\",\r\n            \"roles\": ["
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"roles") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":28,"column":22},"end":{"line":28,"column":86}}})) != null ? stack1 : "")
    + "]\r\n        }\r\n    ],\r\n    \"clients\": [\r\n        {\r\n            \"clientId\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"realmName") || (depth0 != null ? lookupProperty(depth0,"realmName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"realmName","hash":{},"data":data,"loc":{"start":{"line":33,"column":25},"end":{"line":33,"column":40}}}) : helper)))
    + "-client\",\r\n            \"enabled\": true,\r\n            \"publicClient\": true,\r\n            \"baseUrl\": \""
    + alias4(((helper = (helper = lookupProperty(helpers,"server") || (depth0 != null ? lookupProperty(depth0,"server") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"server","hash":{},"data":data,"loc":{"start":{"line":36,"column":24},"end":{"line":36,"column":36}}}) : helper)))
    + "\",\r\n            \"redirectUris\": [\r\n                \""
    + alias4(((helper = (helper = lookupProperty(helpers,"server") || (depth0 != null ? lookupProperty(depth0,"server") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"server","hash":{},"data":data,"loc":{"start":{"line":38,"column":17},"end":{"line":38,"column":29}}}) : helper)))
    + "/*\"\r\n            ],\r\n            \"webOrigins\": [\r\n                \""
    + alias4(((helper = (helper = lookupProperty(helpers,"server") || (depth0 != null ? lookupProperty(depth0,"server") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"server","hash":{},"data":data,"loc":{"start":{"line":41,"column":17},"end":{"line":41,"column":29}}}) : helper)))
    + "\"\r\n            ]\r\n        }\r\n    ]\r\n}";
},"useData":true});
templates['sqless-config.yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"path") || (depth0 != null ? lookupProperty(depth0,"path") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"path","hash":{},"data":data,"loc":{"start":{"line":16,"column":2},"end":{"line":16,"column":10}}}) : helper)))
    + ":\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"operations") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":0},"end":{"line":20,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    "
    + alias4(((helper = (helper = lookupProperty(helpers,"method") || (depth0 != null ? lookupProperty(depth0,"method") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"method","hash":{},"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":18,"column":14}}}) : helper)))
    + ":\r\n      path: "
    + alias4(((helper = (helper = lookupProperty(helpers,"delegate") || (depth0 != null ? lookupProperty(depth0,"delegate") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"delegate","hash":{},"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":19,"column":24}}}) : helper)))
    + "\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "version: 0.0.1\r\ndbConnection:\r\n    type: postgres\r\n    database: postgres\r\n    host: localhost\r\n    port: 5432\r\n    user: postgres\r\n    password: postgres\r\nmigrations: \r\n  - id: 001_initial\r\n    applyPath: migrations/001_initial.sql\r\n    rollbackPath: migrations/001_initial_rollback.sql\r\napi: ../"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"apiPath") || (depth0 != null ? lookupProperty(depth0,"apiPath") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"apiPath","hash":{},"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":13,"column":21}}}) : helper)))
    + "\r\ndelegatePaths:\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"pathDelegates") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":15,"column":0},"end":{"line":21,"column":9}}})) != null ? stack1 : "");
},"useData":true});
templates['update-entity.yaml'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"unless","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":26},"end":{"line":6,"column":119}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\""
    + alias3(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":6,"column":43},"end":{"line":6,"column":58}}}) : helper)))
    + "\" = $"
    + alias3((lookupProperty(helpers,"inc")||(depth0 && lookupProperty(depth0,"inc"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"inc","hash":{},"data":data,"loc":{"start":{"line":6,"column":63},"end":{"line":6,"column":77}}}))
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":78},"end":{"line":6,"column":108}}})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return ",";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      "
    + ((stack1 = lookupProperty(helpers,"unless").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isId") : depth0),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":11,"column":70}}})) != null ? stack1 : "")
    + "\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "- body."
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":11,"column":29},"end":{"line":11,"column":39}}}) : helper)))
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"fk") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":39},"end":{"line":11,"column":59}}})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return ".id";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "operations:\r\n  - id: Update"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":2,"column":14},"end":{"line":2,"column":24}}}) : helper)))
    + "\r\n    type: sql\r\n    template: >-\r\n      UPDATE \""
    + alias4(((helper = (helper = lookupProperty(helpers,"nameSnake") || (depth0 != null ? lookupProperty(depth0,"nameSnake") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nameSnake","hash":{},"data":data,"loc":{"start":{"line":5,"column":14},"end":{"line":5,"column":29}}}) : helper)))
    + "\" SET \r\n      "
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":6},"end":{"line":6,"column":128}}})) != null ? stack1 : "")
    + "\r\n      WHERE id = $1 RETURNING *\r\n    params:\r\n      - params.id"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"properties") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":6},"end":{"line":12,"column":15}}})) != null ? stack1 : "")
    + "    singleRow: true      \r\n    assign: \r\n      var: Updated"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":15,"column":18},"end":{"line":15,"column":28}}}) : helper)))
    + "\r\nreturn: Updated"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":15},"end":{"line":16,"column":25}}}) : helper)));
},"useData":true});
})();