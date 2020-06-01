const redis = require('redis');

//set redis port
const REDIS_PORT = process.env.REDIS_PORT || 6379;

//create redis client
const client = redis.createClient(REDIS_PORT);
async function connectRedis(){
    await client.on('connect', ()=>{
        console.log("connected")
    })

    for (let numberStore = 1; numberStore < 140; numberStore++) {
            var storeId = `store_${numberStore}`;

            for (let numberProduct = 0; numberProduct < 3400; numberProduct++) {
                var productId = `product_${numberProduct}`;
                var quantity = getRandomInt(1,100);
                
                client.hset(storeId,productId,quantity)
                console.log(`inserido loja ${storeId} produto ${productId} quantidade ${quantity}`)
                
            }
        }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

connectRedis();