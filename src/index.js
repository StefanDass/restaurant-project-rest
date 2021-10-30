import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import data from "../data";
import * as utilities from "./utils/functions";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";



const app = express();
const {PORT = 4000} = process.env;

app.use(bodyParser.json()).use(cors());

// THE APPETIZERS
app.get("/api/v1/appetizers", (req, res) => res.json(data.appetizers));

app.get("/api/v1/appetizers/:id", (req, res) => {
    if (utilities.IsInvalidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id." });
    }
    const id = parseInt(req.params.id);
    const appetizer = data.appetizers.find((app) => app.id === id);
    if (!appetizer) {
        return res.status(404).json({error: `Appetizer with id ${id} not found`});
    }
    return res.json(appetizer);
});

app.post("/api/v1/appetizers", (req, res) => {
    const nextId= data.appetizers.length+1;
    const appetizer ={id:nextId, ...req.body};

    data.appetizers.push(appetizer);
    res.status(201).json(appetizer);
});



// THE MAINS
app.get("/api/v1/mains", (req, res) => res.json(data.mains));

app.get("/api/v1/mains/:id", (req, res) => {
    if (utilities.IsInvalidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id." });
    }
    const id = parseInt(req.params.id);
    const main = data.mains.find((mn) => mn.id === id);
    if (!main) {
        return res.status(404).json({error: `Main with id ${id} not found`});
    }
    return res.json(main);
});

app.post("/api/v1/mains", (req, res) => {
    const nextId= data.mains.length+1;
    const main ={id:nextId, ...req.body};

    data.mains.push(main);
    res.status(201).json(main);
});

// THE DESSERTS
app.get("/api/v1/desserts", (req, res) => res.json(data.desserts));

app.get("/api/v1/desserts/:id", (req, res) => {
    if (utilities.IsInvalidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id." });
    }
    const id = parseInt(req.params.id);
    const dessert = data.desserts.find((des) => des.id === id);
    if (!dessert) {
        return res.status(404).json({error: `Dessert with id ${id} not found`});
    }
    return res.json(dessert);
});

app.post("/api/v1/desserts", (req, res) => {
    const nextId= data.desserts.length+1;
    const dessert ={id:nextId, ...req.body};

    data.desserts.push(dessert);
    res.status(201).json(dessert);
});

// THE DRINKS
app.get("/api/v1/drinks", (req, res) => res.json(data.drinks));

app.get("/api/v1/drinks/:id", (req, res) => {
    if (utilities.IsInvalidId(req.params.id)) {
        return res.status(400).json({ error: "Invalid id." });
    }
    const id = parseInt(req.params.id);
    const drink = data.drinks.find((drk) => drk.id === id);
    if (!drink) {
        return res.status(404).json({error: `Drink with id ${id} not found`});
    }
    return res.json(drink);
});

app.post("/api/v1/drinks", (req, res) => {
    const nextId= data.drinks.length+1;
    const drink ={id:nextId, ...req.body};

    data.drinks.push(drink);
    res.status(201).json(drink);
});

app.use("/api/v1/menu", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () =>
    console.log(`Swagger UI available at http://localhost:4000/api/v1/menu`)
);
