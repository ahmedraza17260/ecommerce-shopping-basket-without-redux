import { Server } from "miragejs"
import products from '../Json/products.json';

export function makeServer() {
    let server = new Server({

        routes() {
            this.namespace = "api"
            this.get("/products", () => {
                return products;
            })
            // this.post("/add", (schema, req) => {
            //     const newBook = JSON.parse(req.requestBody);
            //     products.push(newBook)
            // })
        },
    })

    return server
}