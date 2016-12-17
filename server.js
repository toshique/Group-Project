"use strict";
const fs = require('fs');
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

const filePath = './public';
const foodsList = [    
        
      {id: Math.random() + '', product: "Pineapple",  calory: 86, prot: 0, fat: 0, carbs: 11.87},
      {id: Math.random() + '', product: "Banana",  calory: 74, prot: 1.5, fat: 0, carbs: 22.4},
      {id: Math.random() + '', product: "Pear",  calory: 87.5, prot: 0.4, fat: 0, carbs: 10.7},
      {id: Math.random() + '', product: "Cherry",  calory: 85.5, prot: 0.8, fat: 0, carbs: 11.3},
      {id: Math.random() + '', product: "Grapes",  calory: 80.2, prot: 0.4, fat: 0, carbs: 17.5},
      {id: Math.random() + '', product: "Apple",  calory: 46, prot: 0.4, fat: 0, carbs: 11.3},
      {id: Math.random() + '', product: "Peach",  calory: 44, prot: 0.9, fat: 0, carbs: 10.4},
      {id: Math.random() + '', product: "Yogurt",  calory: 51, prot: 5, fat: 1.5, carbs: 3.5},
      {id: Math.random() + '', product: "Pear",  calory: 87.5, prot: 0.4, fat: 0, carbs: 10.7},
      {id: Math.random() + '', product: "Milk",  calory: 58, prot: 2.8, carbs: 4.7, fat: 3.2},
      {id: Math.random() + '', product: "Cheese",  calory: 371, prot: 23.4, fat: 30, carbs: 0},
      {id: Math.random() + '', product: "Shortening",  calory: 156, prot: 16.7, fat: 9, carbs: 1.3},
      {id: Math.random() + '', product: "Bread",  calory: 214, prot: 4.7, fat: 0.7, carbs: 49.8},
      {id: Math.random() + '', product: "Buckwheat",  calory: 329, prot: 12.6, fat: 2.6, carbs: 68},
      {id: Math.random() + '', product: "Rice",  calory: 323, prot: 7, fat: 0.6, carbs: 73.7},
      {id: Math.random() + '', product: "Eggplant",  calory: 24, prot: 0.6, fat: 0.1, carbs: 5.5},
      {id: Math.random() + '', product: "Cabbage",  calory: 28, prot: 1.8, fat: 0, carbs: 5.4},
      {id: Math.random() + '', product: "Potatoes",  calory: 83, prot: 2, fat: 0.1, carbs: 19.7},
      {id: Math.random() + '', product: "Carrots",  calory: 83, prot: 1.3, carbs: 7, fat: 0.1 },
      {id: Math.random() + '', product: "Cucumber",  calory: 15, prot: 0.8, fat: 0, carbs: 3},
      {id: Math.random() + '', product: "Pepper",  calory: 23, prot: 0.3, fat: 0, carbs: 4.7},
      {id: Math.random() + '', product: "Tomatoes",  calory: 19, prot: 0.6, fat: 0, carbs: 4.2},
      {id: Math.random() + '', product: "Mushrooms",  calory: 25, prot: 3.2, fat: 0.7, carbs: 1.6},
      {id: Math.random() + '', product: "Beef",  calory: 187, prot: 18.9, fat: 12.4, carbs: 0},
      {id: Math.random() + '', product: "Pork",  calory: 316, prot: 18.9, fat: 27.8, carbs: 0},
      {id: Math.random() + '', product: "Chicken",  calory: 165, prot: 20.8, fat: 8.8, carbs: 0.6},
      {id: Math.random() + '', product: "Eggs",  calory: 157, prot: 12.7, fat: 11.5, carbs: 0.7},
      {id: Math.random() + '', product: "Pear",  calory: 87.5, prot: 0.4, fat: 0, carbs: 10.7},
      {id: Math.random() + '', product: "Honey",  calory: 308, prot: 0.8, fat: 0, carbs: 80.3},
      {id: Math.random() + '', product: "Pear",  calory: 87.5, prot: 0.4, fat: 0, carbs: 10.7},
      {id: Math.random() + '', product: "Dark chocolate",  calory: 540, prot: 5.4, carbs: 52.6, fat: 35.3},
      {id: Math.random() + '', product: "Milk chocolate",  calory: 547, prot: 6.9, fat: 35.5, carbs: 52.4},
      {id: Math.random() + '', product: "Waffles",  calory: 342, prot: 3.2, fat:2.8, carbs: 80.1},
      {id: Math.random() + '', product: "Torte",  calory: 386, prot: 4.7, fat: 20, carbs: 49.8},
];

const activitiesList = [
      {id: Math.random() + '', act: "Jogging", calory: 485},
      {id: Math.random() + '', act: "Walking", calory: 252},
      {id: Math.random() + '', act: "Tennis", calory: 348},
      {id: Math.random() + '', act: "Aerobics", calory: 215},
      {id: Math.random() + '', act: "Badminton", calory: 255},
      {id: Math.random() + '', act: "Basketball", calory: 380},
      {id: Math.random() + '', act: "Bicicle ride", calory: 320},
      {id: Math.random() + '', act: "Balet", calory: 750},
      {id: Math.random() + '', act: "Dancing", calory: 275},
      {id: Math.random() + '', act: "Soccer", calory: 450},
      {id: Math.random() + '', act: "Hockey", calory: 490},
      {id: Math.random() + '', act: "Gymnastics", calory: 240},
      {id: Math.random() + '', act: "Ice skating", calory: 250},
      {id: Math.random() + '', act: "Skipping", calory: 540},
      {id: Math.random() + '', act: "Aplinism", calory: 453},
      {id: Math.random() + '', act: "Skiing", calory: 270},
      {id: Math.random() + '', act: "Swimming", calory: 460},
      {id: Math.random() + '', act: "Volleyball", calory: 255},
      {id: Math.random() + '', act: "GYM", calory: 520},
      {id: Math.random() + '', act: "Cricket", calory: 168},
      {id: Math.random() + '', act: "Golf", calory: 224},
      {id: Math.random() + '', act: "Yoga", calory: 192},
];

const server = http.createServer(function(req, res){
    const location = path.join(filePath, req.url);
    const parsedUrl = url.parse(req.url);
    const parsedQuery = querystring.parse(parsedUrl.query);
    const method = req.method;    

    fs.readFile(location, function(err, data) {

       
       if(method === 'GET') {
            if(req.url.indexOf('/foods')>= 0) {
                let localCons = foodsList;

                if(parsedQuery.searchtext) {
                    localCons = localCons.filter(function(obj) {
                        return obj.product.toLowerCase().indexOf(parsedQuery.searchtext.toLowerCase()) >= 0;
                    });
                }
                return res.end(JSON.stringify({items : localCons}));
            }
        }
         if(method === 'GET') {
            if(req.url.indexOf('/activities')>= 0) {
                let localBurnt = activitiesList;

                if(parsedQuery.searchtext) {
                    localBurnt = localBurnt.filter(function(obj) {
                        return obj.act.toLowerCase().indexOf(parsedQuery.searchtext.toLowerCase()) >= 0;
                    });
                }
                return res.end(JSON.stringify({items : localBurnt}));
            }
        }

 
    
        if (err) {
            res.writeHead(404, 'Not Found');
            res.write('404: File Not Found!');
            return res.end();
        }
        res.statusCode = 200;
        return res.end(data);
    
});
});
server.listen(12);