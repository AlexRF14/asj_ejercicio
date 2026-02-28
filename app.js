const express = require("express");
const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020({strict: false });

const app = express();
app.locals.title = "Verificador eficaz de json's válidos"

app.use(express.json());

const SCHEMA_PAINT = require("./schemas/schema1.json");
const SCHEMA_SH_SQUADS = require("./schemas/schema2.json");

ajv.addSchema(SCHEMA_PAINT, "schema_paint");
ajv.addSchema(SCHEMA_SH_SQUADS, "schema_sh_squads");

function validateSchema(schema , json){
    let validate = ajv.getSchema(schema);
    let valid = validate(json);

    return valid; // V o F
}

app.post("/validate-paint", (req, res) =>{
    let valid = validateSchema("schema_paint", req.body);

    if(valid){
        return res.status(200).send("JSON paint válido");
    }else{
        return res.status(422).send("JSON paint no válido");
    }
});

app.post("/validate-sh-squads", (req, res) =>{
    let valid = validateSchema("schema_sh_squads", req.body);

    if(valid){
        return res.status(200).send("JSON Squad de superheroes válido");
    }else{
        return res.status(422).send("JSON Squad de superheroes no válido");
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;