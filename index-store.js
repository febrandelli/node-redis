const redis = require('redis');
const moment = require('moment')
//set redis port
const REDIS_PORT = process.env.REDIS_PORT || 6379;

//create redis client
const client = redis.createClient(REDIS_PORT);

//connect redis
client.on('connect', err => {
    if (err != null) {
        console.error('Erro ao conectar com redis', err)
    } else {
        console.log('Connected')
        run();
    }
});

function run() {
    storeQuantity = 1400;
    productQuantity = 34000;
    //hset redis
    const hsetStartTime = (moment().format('h:mm:ss:SSS a') + " - Iniciou o hset")
    for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
        if(numberStore%100 == 0){
            global.gc();
            
        } 
        var storeId = `store_${numberStore}`;

        for (let numberProduct = 0; numberProduct <= productQuantity; numberProduct++) {
            var productId = `product_${numberProduct}`;
            var quantity = 10;

            client.hset(storeId, productId, quantity)
            console.log(storeId + ", " + productId)
            
            
        }
    }
    const hsetEndTime = (moment().format('h:mm:ss:SSS a') + " - Finalizou o hset")
    console.log("começou - " + hsetStartTime)
    console.log("terminou - " + hsetEndTime)
    //hget redis
    // console.log(moment().format('h:mm:ss:SSS a') + " - Iniciou o hget")

    // for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
    //     var storeId = `store_${numberStore}`;

    //     for (let numberProduct = 0; numberProduct < productQuantity; numberProduct++) {
    //         var productId = `product_${numberProduct}`;

    //         client.hget(storeId, productId)
    //         //console.log(`inserido loja ${storeId} produto ${productId} quantidade ${quantity}`)
    //     }
    // }
    // console.log(moment().format('h:mm:ss:SSS a') + " - Finalizou o hget")

    // console.log(moment().format('h:mm:ss:SSS a') + " - Iniciou o hdelete")
    // for (let numberStore = 1; numberStore <= storeQuantity; numberStore++) {
    //     var storeId = `store_${numberStore}`;

    //     for (let numberProduct = 0; numberProduct <= productQuantity; numberProduct++) {
    //         var productId = `product_${numberProduct}`;

    //         client.hdel(storeId, productId)
    //     }
    // }
    // console.log(moment().format('h:mm:ss:SSS a') + " - Finalizou o hdelete")
}