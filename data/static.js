var petstore = {"openapi": "3.0.0","servers": [{"url": "http://petstore.swagger.io/v2"}],"info": {"description": ":dog: :cat: :rabbit: This is a sample server Petstore server.  You can find out more about Swagger at [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/).  For this sample, you can use the api key `special-key` to test the authorization filters.","version": "1.0.0","title": "Swagger Petstore","termsOfService": "http://swagger.io/terms/","contact": {"email": "apiteam@swagger.io"},"license": {"name": "Apache 2.0","url": "http://www.apache.org/licenses/LICENSE-2.0.html"}},"tags": [{"name": "pet","description": "Everything about your Pets","externalDocs": {"description": "Find out more","url": "http://swagger.io"}},{"name": "store","description": "Access to Petstore orders"},{"name": "user","description": "Operations about user","externalDocs": {"description": "Find out more about our store","url": "http://swagger.io"}}],"paths": {"/pet": {"post": {"tags": ["pet"],"summary": "Add a new pet to the store","description": "","operationId": "addPet","responses": {"405": {"description": "Invalid input"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}],"requestBody": {"$ref": "#/components/requestBodies/Pet"}},"put": {"tags": ["pet"],"summary": "Update an existing pet","description": "","operationId": "updatePet","responses": {"400": {"description": "Invalid ID supplied"},"404": {"description": "Pet not found"},"405": {"description": "Validation exception"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}],"requestBody": {"$ref": "#/components/requestBodies/Pet"}}},"/pet/findByStatus": {"get": {"tags": ["pet"],"summary": "Finds Pets by status","description": "Multiple status values can be provided with comma separated strings","operationId": "findPetsByStatus","parameters": [{"name": "status","in": "query","description": "Status values that need to be considered for filter","required": true,"explode": true,"schema": {"type": "array","items": {"type": "string","enum": ["available","pending","sold"],"default": "available"}}}],"responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"type": "array","items": {"$ref": "#/components/schemas/Pet"}}},"application/json": {"schema": {"type": "array","items": {"$ref": "#/components/schemas/Pet"}}}}},"400": {"description": "Invalid status value"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}]}},"/pet/findByTags": {"get": {"tags": ["pet"],"summary": "Finds Pets by tags","description": "Muliple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.","operationId": "findPetsByTags","parameters": [{"name": "tags","in": "query","description": "Tags to filter by","required": true,"explode": true,"schema": {"type": "array","items": {"type": "string"}}}],"responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"type": "array","items": {"$ref": "#/components/schemas/Pet"}}},"application/json": {"schema": {"type": "array","items": {"$ref": "#/components/schemas/Pet"}}}}},"400": {"description": "Invalid tag value"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}],"deprecated": true}},"/pet/{petId}": {"get": {"tags": ["pet"],"summary": "Find pet by ID","description": "Returns a single pet","operationId": "getPetById","parameters": [{"name": "petId","in": "path","description": "ID of pet to return","required": true,"schema": {"type": "integer","format": "int64"}}],"responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"$ref": "#/components/schemas/Pet"}},"application/json": {"schema": {"$ref": "#/components/schemas/Pet"}}}},"400": {"description": "Invalid ID supplied"},"404": {"description": "Pet not found"}},"security": [{"api_key": []}]},"post": {"tags": ["pet"],"summary": "Updates a pet in the store with form data","description": "","operationId": "updatePetWithForm","parameters": [{"name": "petId","in": "path","description": "ID of pet that needs to be updated","required": true,"schema": {"type": "integer","format": "int64"}}],"responses": {"405": {"description": "Invalid input"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}],"requestBody": {"content": {"application/x-www-form-urlencoded": {"schema": {"type": "object","properties": {"name": {"description": "Updated name of the pet","type": "string"},"status": {"description": "Updated status of the pet","type": "string"}}}}}}},"delete": {"tags": ["pet"],"summary": "Deletes a pet","description": "","operationId": "deletePet","parameters": [{"name": "api_key","in": "header","required": false,"schema": {"type": "string"}},{"name": "petId","in": "path","description": "Pet id to delete","required": true,"schema": {"type": "integer","format": "int64"}}],"responses": {"400": {"description": "Invalid ID supplied"},"404": {"description": "Pet not found"}},"security": [{"petstore_auth": ["write:pets","read:pets"]}]}},"/pet/{petId}/uploadImage": {"post": {"tags": ["pet"],"summary": "uploads an image","description": "","operationId": "uploadFile","parameters": [{"name": "petId","in": "path","description": "ID of pet to update","required": true,"schema": {"type": "integer","format": "int64"}}],"responses": {"200": {"description": "successful operation","content": {"application/json": {"schema": {"$ref": "#/components/schemas/ApiResponse"}}}}},"security": [{"petstore_auth": ["write:pets","read:pets"]}],"requestBody": {"content": {"application/octet-stream": {"schema": {"type": "string","format": "binary"}}}}}},"/store/inventory": {"get": {"tags": ["store"],"summary": "Returns pet inventories by status","description": "Returns a map of status codes to quantities","operationId": "getInventory","responses": {"200": {"description": "successful operation","content": {"application/json": {"schema": {"type": "object","additionalProperties": {"type": "integer","format": "int32"}}}}}},"security": [{"api_key": []}]}},"/store/order": {"post": {"tags": ["store"],"summary": "Place an order for a pet","description": "","operationId": "placeOrder","responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"$ref": "#/components/schemas/Order"}},"application/json": {"schema": {"$ref": "#/components/schemas/Order"}}}},"400": {"description": "Invalid Order"}},"requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/Order"}}},"description": "order placed for purchasing the pet","required": true}}},"/store/order/{orderId}": {"get": {"tags": ["store"],"summary": "Find purchase order by ID","description": "For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions","operationId": "getOrderById","parameters": [{"name": "orderId","in": "path","description": "ID of pet that needs to be fetched","required": true,"schema": {"type": "integer","format": "int64","minimum": 1,"maximum": 10}}],"responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"$ref": "#/components/schemas/Order"}},"application/json": {"schema": {"$ref": "#/components/schemas/Order"}}}},"400": {"description": "Invalid ID supplied"},"404": {"description": "Order not found"}}},"delete": {"tags": ["store"],"summary": "Delete purchase order by ID","description": "For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors","operationId": "deleteOrder","parameters": [{"name": "orderId","in": "path","description": "ID of the order that needs to be deleted","required": true,"schema": {"type": "integer","format": "int64","minimum": 1}}],"responses": {"400": {"description": "Invalid ID supplied"},"404": {"description": "Order not found"}}}},"/user": {"post": {"tags": ["user"],"summary": "Create user","description": "This can only be done by the logged in user.","operationId": "createUser","responses": {"default": {"description": "successful operation"}},"requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/User"}}},"description": "Created user object","required": true}}},"/user/createWithArray": {"post": {"tags": ["user"],"summary": "Creates list of users with given input array","description": "","operationId": "createUsersWithArrayInput","responses": {"default": {"description": "successful operation"}},"requestBody": {"$ref": "#/components/requestBodies/UserArray"}}},"/user/createWithList": {"post": {"tags": ["user"],"summary": "Creates list of users with given input array","description": "","operationId": "createUsersWithListInput","responses": {"default": {"description": "successful operation"}},"requestBody": {"$ref": "#/components/requestBodies/UserArray"}}},"/user/login": {"get": {"tags": ["user"],"summary": "Logs user into the system","description": "","operationId": "loginUser","parameters": [{"name": "username","in": "query","description": "The user name for login","required": true,"schema": {"type": "string"}},{"name": "password","in": "query","description": "The password for login in clear text","required": true,"schema": {"type": "string","format": "password"}}],"responses": {"200": {"description": "successful operation","headers": {"X-Rate-Limit": {"description": "calls per hour allowed by the user","schema": {"type": "integer","format": "int32"}},"X-Expires-After": {"description": "date in UTC when token expires","schema": {"type": "string","format": "date-time"}}},"content": {"application/xml": {"schema": {"type": "string"}},"application/json": {"schema": {"type": "string"}}}},"400": {"description": "Invalid username/password supplied"}}}},"/user/logout": {"get": {"tags": ["user"],"summary": "Logs out current logged in user session","description": "","operationId": "logoutUser","responses": {"default": {"description": "successful operation"}}}},"/user/{username}": {"get": {"tags": ["user"],"summary": "Get user by user name","description": "","operationId": "getUserByName","parameters": [{"name": "username","in": "path","description": "The name that needs to be fetched. Use user1 for testing. ","required": true,"schema": {"type": "string"}}],"responses": {"200": {"description": "successful operation","content": {"application/xml": {"schema": {"$ref": "#/components/schemas/User"}},"application/json": {"schema": {"$ref": "#/components/schemas/User"}}}},"400": {"description": "Invalid username supplied"},"404": {"description": "User not found"}}},"put": {"tags": ["user"],"summary": "Updated user","description": "This can only be done by the logged in user.","operationId": "updateUser","parameters": [{"name": "username","in": "path","description": "name that need to be updated","required": true,"schema": {"type": "string"}}],"responses": {"400": {"description": "Invalid user supplied"},"404": {"description": "User not found"}},"requestBody": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/User"}}},"description": "Updated user object","required": true}},"delete": {"tags": ["user"],"summary": "Delete user","description": "This can only be done by the logged in user.","operationId": "deleteUser","parameters": [{"name": "username","in": "path","description": "The name that needs to be deleted","required": true,"schema": {"type": "string"}}],"responses": {"400": {"description": "Invalid username supplied"},"404": {"description": "User not found"}}}}},"externalDocs": {"description": "See AsyncAPI example","url": "https://mermade.github.io/shins/asyncapi.html"},"components": {"schemas": {"Order": {"type": "object","properties": {"id": {"type": "integer","format": "int64"},"petId": {"type": "integer","format": "int64"},"quantity": {"type": "integer","format": "int32"},"shipDate": {"type": "string","format": "date-time"},"status": {"type": "string","description": "Order Status","enum": ["placed","approved","delivered"]},"complete": {"type": "boolean","default": false}},"xml": {"name": "Order"}},"Category": {"type": "object","properties": {"id": {"type": "integer","format": "int64"},"name": {"type": "string"}},"xml": {"name": "Category"}},"User": {"type": "object","properties": {"id": {"type": "integer","format": "int64"},"username": {"type": "string"},"firstName": {"type": "string"},"lastName": {"type": "string"},"email": {"type": "string"},"password": {"type": "string"},"phone": {"type": "string"},"userStatus": {"type": "integer","format": "int32","description": "User Status"}},"xml": {"name": "User"}},"Tag": {"type": "object","properties": {"id": {"type": "integer","format": "int64"},"name": {"type": "string"}},"xml": {"name": "Tag"}},"Pet": {"type": "object","required": ["name","photoUrls"],"properties": {"id": {"type": "integer","format": "int64"},"category": {"$ref": "#/components/schemas/Category"},"name": {"type": "string","example": "doggie"},"photoUrls": {"type": "array","xml": {"name": "photoUrl","wrapped": true},"items": {"type": "string"}},"tags": {"type": "array","xml": {"name": "tag","wrapped": true},"items": {"$ref": "#/components/schemas/Tag"}},"status": {"type": "string","description": "pet status in the store","enum": ["available","pending","sold"]}},"xml": {"name": "Pet"}},"ApiResponse": {"type": "object","properties": {"code": {"type": "integer","format": "int32"},"type": {"type": "string"},"message": {"type": "string"}}}},"requestBodies": {"Pet": {"content": {"application/json": {"schema": {"$ref": "#/components/schemas/Pet"}},"application/xml": {"schema": {"$ref": "#/components/schemas/Pet"}}},"description": "Pet object that needs to be added to the store","required": true},"UserArray": {"content": {"application/json": {"schema": {"type": "array","items": {"$ref": "#/components/schemas/User"}}}},"description": "List of user object","required": true}},"securitySchemes": {"petstore_auth": {"type": "oauth2","flows": {"implicit": {"authorizationUrl": "http://petstore.swagger.io/oauth/dialog","scopes": {"write:pets": "modify pets in your account","read:pets": "read your pets"}}}},"api_key": {"type": "apiKey","name": "api_key","in": "header"}}}}

var emptyOpenAPI = { "openapi": "3.0.1", "info": { "title": "Datora Mobile BSS API", "description": "Datora Open API - bss Mobile", "version": "1.0" } };

var jsonSchemaDraft4 = {
    "servers": [
        {
            "url": "https://proxy.api.ip101.cloud/mvno"
        }
    ],
    "paths": {
        "/Partners/Customers/add_customer": {
            "post": {
                "summary": "Add a new Customer",
                "description": "Add a new Customer",
                "operationId": "post-partners-customers-add_customer",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/customerInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/make_customer_manual_transaction": {
            "post": {
                "summary": "Proceed with a external/manual charge or credit",
                "description": "Proceed with a external/manual charge or credit",
                "operationId": "post-partners-customers-make_customer_manual_transaction",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/transactionInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_customer_usage/{customerId}": {
            "get": {
                "summary": "get Customer Usage Details for download, by Period",
                "description": "get Customer Usage Details for download, by Period",
                "operationId": "get-partners-customers-get_customer_usage-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },

                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_customer_usage_summary/{customerId}": {
            "get": {
                "summary": "get Customer Usage summary for download, by Period",
                "description": "get Customer Usage summary for download, by Period",
                "operationId": "get-partners-customers-get_customer_usage_summary-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_customer_list": {
            "get": {
                "summary": "get a Complete or a Filtered Customer List",
                "description": "get a Complete or a Filtered Customer List",
                "operationId": "get-partners-customers-get_customer_list",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_customer_counters/{customerId}": {
            "get": {
                "summary": "get Customer Usage Snapshot (Counters Information) by Customer ID",
                "description": "get Customer Usage Snapshot (Counters Information) by Customer ID",
                "operationId": "get-partners-customers-get_customer_counters-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_transactions_Info/{transactionId}": {
            "get": {
                "summary": "get a Manual/External transaction Information, by Transaction ID",
                "description": "get a Manual/External transaction Information, by Transaction ID",
                "operationId": "get-partners-customers-get_transactions_info-transactionid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "transactionId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/get_customer_Info/{customerId}": {
            "get": {
                "summary": "get Customer Information by Customer ID",
                "description": "get Customer Information by Customer ID",
                "operationId": "get-partners-customers-get_customer_info-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/update_customer": {
            "post": {
                "summary": "Update Customer Information by Customer ID",
                "description": "Update Customer Information by Customer ID",
                "operationId": "post-partners-customers-update_customer",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/customerInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/suspend_customer/{customerId}": {
            "post": {
                "summary": "Suspend Customer by Customer ID",
                "description": "Suspend Customer by Customer ID",
                "operationId": "post-partners-customers-suspend_customer-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/unsuspend_customer/{customerId}": {
            "post": {
                "summary": "Unsuspend Customer by Customer ID",
                "description": "Unsuspend Customer by Customer ID",
                "operationId": "post-partners-customers-unsuspend_customer-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Customers/terminate_customer/{customerId}": {
            "post": {
                "summary": "Terminate Customer by Customer ID",
                "description": "Terminate Customer by Customer ID",
                "operationId": "post-partners-customers-terminate_customer-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/add_contract": {
            "post": {
                "summary": "Add a new Contract",
                "description": "Add a new Contract",
                "operationId": "post-partners-contracts-add_contract",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/contractInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/add_contract_addon_product": {
            "post": {
                "summary": "Add one or more Addons for a Contract",
                "description": "Add one or more Addons for a Contract",
                "operationId": "post-partners-contracts-add_contract_addon_product",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/contractProductsInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/get_contract_Info/{contractId}": {
            "get": {
                "summary": "get Contract Information by Contract ID",
                "description": "get Contract Information by Contract ID",
                "operationId": "get-partners-contracts-get_contract_info-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {

                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/get_contract_list/{customerId}": {
            "get": {
                "summary": "get a Complete or a Filtered Contract List",
                "description": "get a Complete or a Filtered Contract List",
                "operationId": "get-partners-contracts-get_contract_list-customerid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "customerId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/get_contract_products/{contractId}": {
            "get": {
                "summary": "get all Products associated with a Contract",
                "description": "get all Products associated with a Contract",
                "operationId": "get-partners-contracts-get_contract_products-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/get_contract_counters/{contractId}": {
            "get": {
                "summary": "get Contract Usage Snapshot (Counters Information) by Contract ID",
                "description": "get Contract Usage Snapshot (Counters Information) by Contract ID",
                "operationId": "get-partners-contracts-get_contract_counters-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/get_transactions_Info/{transactionId}": {
            "get": {
                "summary": "get a Manual/External transaction Information, by Transaction ID",
                "description": "get a Manual/External transaction Information, by Transaction ID",
                "operationId": "get-partners-contracts-get_transactions_info-transactionid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },

                    {
                        "name": "transactionId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/delete_contract_addons_product": {
            "post": {
                "summary": "delete one or more Addons for a Contract",
                "description": "delete one or more Addons for a Contract",
                "operationId": "post-partners-contracts-delete_contract_addons_product",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/contractAddons"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/suspend_contract/{contractId}": {
            "post": {
                "summary": "Suspend Contract by Contract ID",
                "description": "Suspend Contract by Contract ID",
                "operationId": "post-partners-contracts-suspend_contract-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },

                    {
                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/unsuspend_contract/{contractId}": {
            "post": {
                "summary": "Unsuspend Contract by Contract ID",
                "description": "Unsuspend Contract by Contract ID",
                "operationId": "post-partners-contracts-unsuspend_contract-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },

                    {
                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/terminate_contract/{contractId}": {
            "post": {
                "summary": "Terminate Contract by Contract ID",
                "description": "Terminate Contract by Contract ID",
                "operationId": "post-partners-contracts-terminate_contract-contractid",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },

                    {
                        "name": "contractId",
                        "in": "path",
                        "description": "request",
                        "required": true,
                        "schema": {
                            "type": "integer"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/update_contract_main_product": {
            "post": {
                "summary": "Update Contract Main Product",
                "description": "Update Contract Main Product",
                "operationId": "post-partners-contracts-update_contract_main_product",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/contractInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/make_contract_manual_transaction": {
            "post": {
                "summary": "Proceed with a external/manual charge or credit",
                "description": "Proceed with a external/manual charge or credit",
                "operationId": "post-partners-contracts-make_contract_manual_transaction",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/transactionInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Contracts/update_contract": {
            "post": {
                "summary": "Update Contract Information by Contract ID",
                "description": "Update Contract Information by Contract ID",
                "operationId": "post-partners-contracts-update_contract",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/contractInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Resources/get_active_dids": {
            "get": {
                "summary": "get a List of Available DIDs",
                "description": "get a List of Available DIDs",
                "operationId": "get-partners-resources-get_active_dids",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Partners/Resources/get_active_products": {
            "get": {
                "summary": "get a List of Active Products",
                "description": "get a List of Active Products",
                "operationId": "get-partners-resources-get_active_products",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        },
        "/Admin/Inventory/simcard_inventory_transfer": {
            "post": {
                "summary": "Transfer a SIM card to another Reseller",
                "description": "Transfer a SIM card to another Reseller",
                "operationId": "post-admin-inventory-simcard_inventory_transfer",
                "parameters": [
                    {
                        "name": "platform",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "enum": ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
                            "type": "integer"
                        }
                    },
                    {
                        "name": "impersonate",
                        "in": "header",
                        "description": "This is an ID provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    },
                    {
                        "name": "token",
                        "in": "header",
                        "description": "This is an token provided by Datora Telecom Team",
                        "required": true,
                        "schema": {
                            "type": "string"
                        }
                    }

                ],
                "requestBody": {
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/schemas/simcardTransferInfo"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Action Performed OK",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/OKResponse"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "400": {
                        "description": "Bad Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "401": {
                        "description": "Unauthorized Request",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "404": {
                        "description": "Resource Not Found",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "405": {
                        "description": "Method Not Allowed",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    },
                    "500": {
                        "description": "Internal Server Error",
                        "content": {
                            "application/json": {
                                "schema": {
                                    "$ref": "#/components/schemas/Error"
                                },
                                "example": {
                                    "CheckDocumentation": "datora.net"
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "components": {
        "schemas": {
            "address": {
                "required": [
                    "addressType",
                    "zip",
                    "streetName",
                    "streetNumber",
                    "unitIdentification",
                    "city",
                    "state",
                    "countryID"
                ],
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "string"
                    },
                    "addressType": {
                        "type": "integer",
                        "description": "1 - main, 2 - shipping, 3 - billing address"
                    },
                    "countryID": {
                        "type": "string",
                        "description": "ISO3166A3"
                    },
                    "zip": {
                        "type": "string",
                        "description": "string"
                    },
                    "unitIdentification": {
                        "type": "string",
                        "description": "string"
                    },
                    "state": {
                        "type": "string",
                        "description": "string"
                    },
                    "streetNumber": {
                        "type": "string",
                        "description": "string"
                    },
                    "streetName": {
                        "type": "string",
                        "description": "string"
                    }
                }
            },
            "email": {
                "required": [
                    "emailID",
                    "emailAddress",
                    "emailType"
                ],
                "type": "object",
                "properties": {
                    "emailID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "emailType": {
                        "type": "integer",
                        "description": "1 - personal, 2 - business"
                    },
                    "emailAddress": {
                        "type": "string",
                        "description": "string"
                    }
                }
            },
            "product": {
                "required": [
                    "productID",
                    "productType"
                ],
                "type": "object",
                "properties": {
                    "productID": {
                        "type": "integer",
                        "description": "productID"
                    },
                    "productType": {
                        "type": "integer",
                        "description": "0 - main, 1 - addon"
                    }
                }
            },
            "phone": {
                "required": [
                    "phoneType",
                    "countryCode",
                    "AreaCode",
                    "phoneNumber"
                ],
                "type": "object",
                "properties": {
                    "AreaCode": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "phoneNumber": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "phoneType": {
                        "type": "integer",
                        "description": "1 - home, 2 - business, 3 - mobile"
                    },
                    "countryCode": {
                        "type": "integer",
                        "description": "integer"
                    }
                }
            },
            "customerInfo": {
                "required": [
                    "customerType",
                    "name",
                    "citizenshipID",
                    "CountryID",
                    "StateID",
                    "cityID",
                    "addresses",
                    "phones",
                    "emails"
                ],
                "type": "object",
                "properties": {
                    "citizenshipID": {
                        "type": "string",
                        "description": "ISO3166A3"
                    },
                    "CountryID": {
                        "type": "string",
                        "description": "ISO3166A3"
                    },
                    "name": {
                        "type": "string",
                        "description": "string"
                    },
                    "StateID": {
                        "type": "string",
                        "description": "string"
                    },
                    "phones": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/phone"
                        },
                        "description": "phones"
                    },
                    "customerID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "cityID": {
                        "type": "string",
                        "description": "string"
                    },
                    "customerType": {
                        "type": "integer",
                        "description": "1 - person, 2 - business, 3 - ngo, 4 - government"
                    },
                    "emails": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/email"
                        },
                        "description": "array"
                    },
                    "addresses": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/address"
                        },
                        "description": "Address"
                    }
                }
            },
            "contractInfo": {
                "required": [
                    "contractID",
                    "service",
                    "product",
                    "simcardID",
                    "didID"
                ],
                "type": "object",
                "properties": {
                    "discount": {
                        "type": "number",
                        "description": "float"
                    },
                    "product": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "simcardID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "service": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "didID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "contractID": {
                        "type": "integer",
                        "description": "integer"
                    }
                }
            },
            "contractAddons": {
                "required": [
                    "contractID",
                    "addons"
                ],
                "type": "object",
                "properties": {
                    "contractID": {
                        "type": "integer",
                        "description": "contractID"
                    },
                    "addons": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/product"
                        },
                        "description": "integer"
                    }
                }
            },
            "contractProductsInfo": {
                "required": [
                    "contractID",
                    "products"
                ],
                "type": "object",
                "properties": {
                    "discount": {
                        "type": "number",
                        "description": "float"
                    },
                    "product": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "simcardID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "service": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "didID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "contractID": {
                        "type": "integer",
                        "description": "integer"
                    }
                }
            },
            "transactionInfo": {
                "required": [
                    "transactionID",
                    "applyTo",
                    "customerID",
                    "value",
                    "currencyID",
                    "reason"
                ],
                "type": "object",
                "properties": {
                    "currencyID": {
                        "type": "string",
                        "description": "string"
                    },
                    "reason": {
                        "type": "string",
                        "description": "1 - Manual credit, 2 - Payment, 3 - Manual Charge"
                    },
                    "service": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "applyTo": {
                        "type": "integer",
                        "description": "1 - Contract, 2 - Customer, 3 - Wallet"
                    },
                    "transactionID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "customerID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "value": {
                        "type": "number",
                        "description": "number"
                    }
                }
            },
            "simcardTransferInfo": {
                "required": [
                    "simcardID"
                ],
                "type": "object",
                "properties": {
                    "ICCID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "simcardID": {
                        "type": "integer",
                        "description": "integer"
                    },
                    "IMSI": {
                        "type": "integer",
                        "description": "integer"
                    }
                }
            },
            "OKResponse": {
                "required": [
                    "code"
                ],
                "type": "object",
                "properties": {
                    "reply": {
                        "type": "object"
                    },
                    "message": {
                        "type": "string"
                    },
                    "code": {
                        "type": "string"
                    }
                }
            },
            "Error": {
                "required": [
                    "code",
                    "message"
                ],
                "type": "object",
                "properties": {
                    "message": {
                        "type": "string"
                    },
                    "code": {
                        "type": "string"
                    }
                }
            }




        },
        "securitySchemes": {
            "apiKeyHeader": {
                "type": "apiKey",
                "name": "Ocp-Apim-Subscription-Key",
                "in": "header"
            },
            "apiKeyQuery": {
                "type": "apiKey",
                "name": "subscription-key",
                "in": "query"
            }
        }
    },
    "security": [
        {
            "apiKeyHeader": []
        },
        {
            "apiKeyQuery": []
        }
    ]
};

if (typeof module !== 'undefined') {
  module.exports = {
    petstore: petstore
  };
}

