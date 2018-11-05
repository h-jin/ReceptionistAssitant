const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/HJ';
const client = new pg.Client(connectionString);

client.connect();

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get("/api/getUsers", function (req, res) {
    client.query(`SELECT array_to_json(array_agg(r)) FROM (SELECT * FROM patients WHERE status='waiting' ORDER BY date) r`).then(data => {
        const dataArr = data.rows[0].array_to_json;
        res.send(dataArr);
    });
})

app.post("/api/add/", function (req, res) {
    const { body: { name, phone, status, date, section } } = req;
    client.query(`INSERT INTO patients(name, phone, status, date, section) VALUES('${name}', '${phone}','${status}', '${date}', '${section}') RETURNING name`).then(data => {
        res.send(data);
    });
})

app.post("/api/update/", function (req, res) {
    const { body: { id, name, phone, status, date, section } } = req;
    client.query(`UPDATE patients SET name='${name}', phone='${phone}', status='${status}', date='${date}', section='${section}' WHERE id=${id} RETURNING *`).then(data => {
        res.send(data.rows);
    });
})

app.delete("/api/delete/:id", function (req, res) {
    const { id } = req.params;
    client.query(`DELETE FROM patients WHERE id=${id}`).then(data => {
        res.send(console.log(data));
    });
})

app.listen(8080, () => console.log('Listening on port 8080!'));
