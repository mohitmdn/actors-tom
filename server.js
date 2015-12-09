var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    crypto = require('crypto'),
    server = require('http').createServer(app);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "actors-tom"
});

con.connect(function(err){
    if(err){
        console.log('Error connecting to Mysql Db');
        return;
    }
    console.log('Mysql connection established');
});

app.use(express.static('./'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/get', function(req, res){
    if (req.query.table) {
        var query = 'select * from `'+ req.query.table +'`';
        if (Object.keys(req.query).length > 1) {
            query += ' where ';
            for (var k in req.query) {
                if (k != 'table') {
                    if (k == 'password') {
                        var md5password = crypto.createHash('md5').update(req.query[k]).digest("hex");
                        query += '`password` = "'+ md5password +'" and ';
                    } else {
                        query += '`'+ k +'` = \''+ req.query[k] +'\' and ';
                    }
                }
            }
            query = query.substring(0, query.length-4);
        }
        con.query(query, function(err, rows){
            if (err) throw err;
            res.send(rows);
        });
    } else {
        res.send(null);
    }
});

//app.post('/api/updateProject', function(req, res){
//    var query, query_vars;
//    query = ((req.body.id) ? 'update ' : 'insert ') +
//        ' `projects` SET `project` = ?, `status` = ?, `manager` = ?, `progress` = ?'+
//        ((req.body.id) ? ' where `id` = ?;' : ';');
//    query_vars = [req.body.project, req.body.status, req.body.manager, req.body.progress];
//    if (req.body.id) {
//        query_vars.push(req.body.id);
//    }
//    con.query(query, query_vars, function (err, q_res) {
//        if (err) throw err;
//        res.send(q_res);
//    });
//});
//
//app.post('/api/deleteProject', function(req, res) {
//    con.query("delete from `projects` where `id` = ?;", [req.body.id], function(err, q_res){
//        if (err) throw err;
//        res.send(q_res);
//    });
//});

var port = 9090;
server.listen(port);
console.log('http://localhost:'+ port +' app started !');
