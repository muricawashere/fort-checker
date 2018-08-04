var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var Fortnite = require('fortnite-api')

var fortniteAPI = new Fortnite(
    [
        "addytireland2004@gmail.com",
        "murica433",
        "MzRhMDJjZjhmNDQxNGUyOWIxNTkyMTg3NmRhMzZmOWE6ZGFhZmJjY2M3Mzc3NDUwMzlkZmZlNTNkOTRmYzc2Y2Y=",
        "ZWM2ODRiOGM2ODdmNDc5ZmFkZWEzY2IyYWQ4M2Y1YzY6ZTFmMzFjMjExZjI4NDEzMTg2MjYyZDM3YTEzZmM4NGQ="
    ],
    {
        debug: true
    }
)

var titleset = 'Amen Brother'

var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'ejs')

app.get('/', function(req, res) {
    res.render('../views/index.ejs', {title:titleset})
})

app.post('/checkstat', urlencodedParser, function(req, res) {
    console.log(req.body)
    var newtitle = req.body.username + '\'s ' + req.body.type +' stats'
    fortniteAPI.login().then(() => {
        fortniteAPI
            .getStatsBR(req.body.username, req.body.plat)
            .then(stats => {
                console.log(stats)
                var fortString = JSON.stringify(stats)
                console.log(fortString)
                res.render('../views/showstat.ejs',{title: newtitle, data: fortString, type: req.body.type})
            })
            .catch(err => {
                console.log(err)
                res.render('../views/badentry.ejs', {error: err})
            })
    })
    
})

app.listen('80')