const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/HJ';
const client = new pg.Client(connectionString);

client.connect();
/*const query = client.query(
    'ALTER TABLE walkin ALTER COLUMN name TYPE varchar(50)')
// 'CREATE TABLE APPOINTMENT (ID SERIAL, name CHAR(50), date timestamp)');*/
/*const insertQuey = client.query(`INSERT INTO emergency(name, phone, status, date)
VALUES('Mark', '5144100001', 'waiting', '2018-08-12 12:00:00')`);

//const deleteQuery = client.query(`DELETE FROM appointment WHERE ID=3`);
/*async function queryName() {
    return client.query(`SELECT row_to_json(r) FROM (SELECT name FROM appointment) r`);
}*/

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.get("/api/getUsers", function (req, res) {
    client.query(`SELECT array_to_json(array_agg(r)) FROM (SELECT * FROM emergency) r`).then(data => {
        const dataArr = data.rows[0].array_to_json;
        res.send(dataArr);
    });
})

app.post("/api/add/", function (req, res) {
    const { body: { name, phone, status, date } } = req;
    client.query(`INSERT INTO emergency(name, phone, status, date) VALUES('${name}', '${phone}','${status}', '${date}') RETURNING name`).then(data => {
        // console.log(res.send(data));
        res.send(data);
    });
})

app.post("/api/update/", function (req, res) {
    const { body: { id, name, phone, status, date } } = req;
    client.query(`UPDATE emergency SET name='${name}', phone='${phone}', status='${status}', date='${date}' WHERE id=${id} RETURNING *`).then(data => {
        res.send(data.rows);
    });
})

app.delete("/api/delete/:id", function (req, res) {
    const { id } = req.params;
    client.query(`DELETE FROM emergency WHERE id=${id}`).then(data => {
        res.send(console.log(data));
    });
})

/*app.post('/api/connectString', (req, res) => {
    client.query(`INSERT INTO appointment(name, time) VALUES('Mark', '12:00:00')`)
});*/
app.listen(8080, () => console.log('Listening on port 8080!'));
