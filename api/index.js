var app = require('express')();
var BodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
app.use(BodyParser.urlencoded({ extended: false }))
app.use(BodyParser.json());
app.use(cors());

var mongoDb = 'mongodb://localhost:27017/Pizza'
mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
var Pizza = mongoose.connection;
Pizza.on('error', console.error.bind(console, 'MongoDB connection error:'));
var Schema = mongoose.Schema;
var order = new Schema(
    {
        UserName: { type: String },
        Phone: { type: String },
        TotalPrice: { type: Number },
        pizza: { type: Array },
        timeStamp: { type: Date },
        status: { type: Number }
    });
var modelPizza = mongoose.model('order', order);
app.get("/orders/getAll", (req, res) => {
    modelPizza.find()
        .exec(function (err, list) {
            return res.json(list);
        })
})

app.post("/orders", (req, res) => {
    if ((!req.body.name) || (!req.body.phone) || (!req.body.pizza)) {
        console.log("Order not valid");
        return res.json("Order not valid");
    }
    var phone_regex = /^0?(([23489]{1}\d{7})|[5]{1}\d{8})$/;
    if (!phone_regex.test(req.body.phone)) {
        console.log("phone number not valid");
        return res.json("phone number not valid");
    }
    var getPizza = new modelPizza({
        UserName: req.body.name,
        Phone: req.body.phone,
        TotalPrice: req.body.totalPrice,
        pizza: req.body.pizza,
        timeStamp: Date.now(),
        status: 0
    });
    getPizza.save(function (err, data, next) {
        console.log("pizza save")
        modelPizza.find()
            .exec(function (err, list) {
                if (err) return next(err);
                console.log(list);
                if (err) return next(err);
                res.json("the order are seccfully");
            });
    });

})
function service() {
    setInterval(() => {
        modelPizza.find().exec(function (err, list) {
            if (err) return next(err);
            list.forEach(element => {
                const millis = Date.now() - element.timeStamp;
                switch (element.status) {
                    case 0:
                        if ((Math.floor(millis / 60000)) >= 2) {
                            modelPizza.findByIdAndUpdate(element._id, { status: 1, timeStamp: Date.now() },
                                function (err, docs) {
                                    if (err) console.log(err)
                                    else console.log("Updated User : ", docs);
                                });
                        }
                        break;
                    case 1:
                        if ((Math.floor(millis / 60000)) >= 15) {
                            modelPizza.findByIdAndUpdate(element._id, { status: 2, timeStamp: Date.now() },
                                function (err, docs) {
                                    if (err) console.log(err)
                                    else console.log("Updated User : ", docs);
                                });
                        }
                        break;
                    case 2:
                        if ((Math.floor(millis / 60000)) >= 25) {
                            modelPizza.findByIdAndUpdate(element._id, { status: 3, timeStamp: Date.now() },
                                function (err, docs) {
                                    if (err) console.log(err)
                                    else console.log("Updated User : ", docs);
                                });
                        }
                        break;
                    default:
                        break;
                }
            });
        })
    }, 60000);
}

var server = app.listen(3080, function () {
    console.log("server run...")
    service()
})

