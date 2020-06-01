const redis = require('redis');
const moment = require('moment')
//set redis port
const REDIS_PORT = process.env.REDIS_PORT || 6379;

//create redis client
const client = redis.createClient(REDIS_PORT);

//connect redis
async function connectRedis() {
    await client.on('connect', () => {
        console.log("connected")
    })
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

connectRedis();

storeQuantity = 700;
productQuantity = 17000;
//hset redis
console.log(moment().format('h:mm:ss:SSS a') + " - Iniciou o hset")
for (let numberProduct = 0; numberProduct <= productQuantity; numberProduct++) {
    var productId = `product_${numberProduct}`;

    for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
        var storeId = `store_${numberStore}`;

        var quantity = getRandomInt(1, 100);

        client.hset(productId, storeId, quantity)
    }    
}
console.log(moment().format('h:mm:ss:SSS a') + " - Finalizou o hset")

//hget redis
console.log(moment().format('h:mm:ss:SSS a') + " - Iniciou o hget")

for (let numberProduct = 0; numberProduct <= productQuantity; numberProduct++) {
    var productId = `product_${numberProduct}`;

    for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
        var storeId = `store_${numberStore}`;
        
        client.hget(productId, storeId)
        //console.log(`inserido loja ${storeId} produto ${productId} quantidade ${quantity}`)
    }    
}
console.log(moment().format('h:mm:ss:SSS a') + " - Finalizou o hget")

console.log(moment().format('h:mm:ss:SSS a') + " - Iniciou o hdelete")
for (let numberProduct = 0; numberProduct <= productQuantity; numberProduct++) {
    var productId = `product_${numberProduct}`;

    for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
        var storeId = `store_${numberStore}`;

        client.hdel(storeId,productId)
    }    
}
console.log(moment().format('h:mm:ss:SSS a') + " - Finalizou o hdelete")
