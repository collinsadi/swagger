
const generateSwaggerDocumentation = (app, port, live) => {
const swaggerDocs = require('swagger-ui-express')
const path = require("path")
const fs = require("fs")

const pathToPackageJson = path.join(process.cwd(), "package.json")
const packageJson = JSON.parse(fs.readFileSync(pathToPackageJson, { encoding: "utf-8" }).toString())

app.use('/docs',swaggerDocs.serve)

const routes = app._router.stack

let routesToDocument = {}

routes.forEach(route => {


    if (route.route) {

        let mainDocumentation = {}
        
        const initialMethod = Object.keys(route.route.methods).length > 1 
        const methodKey = Object.keys(route.route.methods).toString()
        const handlerName = ""
        const stacks = route.route.stack

        let methodForCheck = ""

    const arrayOfMethods = Object.keys(routes[routes.indexOf(route)].route.methods)
       

        let  docs = {

                    tags: [""],
                    summary: "",
                    description: "",
                    // requestBody: {

                    //     content: {
                    //         "Application/Json": {
                    //             schema: {
                    //                 type: "object",
                    //                 properties: {
                    //                     name: {
                    //                         type: "string",
                    //                         description: "Name of School",
                    //                         required: true,
                    //                         example: "Timi Group Schools"
                    //                     },
                                       
                    //                 }
                    //             }
                    //         }
                    //     }

                    // },
                    responses: {
                        201: {
                            description: "Sign Up Sucessful",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            status: "success",
                                        }
                                    }
                                }
                            }
                        },
                        // 422: {
                        //     description: "Email  in Use or Required Field Missing",
                        //     content: {
                        //         "application/json": {
                        //             schema: {
                        //                 type: "object",
                        //                 example: {
                        //                     message: "Unable to sign Up User"
                        //                 }
                        //             }
                        //         }
                        //     }
                        // },
                        500: {
                            description: "Server Side Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        example: {
                                            message: "an Error Occured on the Server Side"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

        
        if(arrayOfMethods.length > 1){


        } else {
            docs["summary"] = route.route.stack[0].name
        }

        const routeHasMultipleMethods = Object.keys(route.route.methods)



        if (initialMethod) {


            for (const theCurrentMethod of routeHasMultipleMethods) {
            

                stacks.forEach((stack) => {
                mainDocumentation[stack.method] = docs
                    
                mainDocumentation[stack.method].summary = stack.name

                    
                    
                console.log("Hello WOrld", {method:theCurrentMethod, name:stack.name})
                

                })

      

       
            
                // methodForCheck = method
          
        }
            
           
        } else {
            
        mainDocumentation[methodKey]= docs

        }


  //  // for the records: I FELT EMOTIONAL AFTER THIS LOGIC DONT REMOVE THIS COMENT INT YOUR CONTRIBUTION

        routesToDocument[route.route.path] = mainDocumentation
                


    }

   
    
});


app.use('/docs', swaggerDocs.setup({

    openapi: "3.0.0",
    info: {

        title : packageJson.name,
      version: packageJson.version,
      description: packageJson.description
    },
    servers: [

        {
            url: `http://localhost:${port}`,
            description: "Local Server"
        },

        live ? {

            url: live,
            description: "Deployment Server"

        }:""
  
    ],
    tags: [



    ],
    paths: routesToDocument

}))



}


module.exports = generateSwaggerDocumentation;