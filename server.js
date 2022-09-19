
const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/eco-snap-frontend'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/eco-snap-frontend/index.html'));});
app.listen(process.env.PORT || 4300);