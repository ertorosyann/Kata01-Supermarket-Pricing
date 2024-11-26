

class LCogolDrink {
    constructor(name, stock, price) {
        this.name = name;
        this.stock = stock;
        this.price = price;
        this.action = [];
    }
    
    buy_two_get_one_free(cond, count) {
        let checks = LCogolDrink.checkCountAndStock(this, 'Buy two get one Free', count, this.price);
        if (checks) { return; }
        let sum = 0;  
        for (let i = 1; i <= count; i++ ){
            if (!this.stock) { return 'Stock is empty'; }
            if ( i % cond !== 0 ) { sum += this.price;  };
            --(this.stock); 
        }
        console.log(`You wanted ${this.name} product ${count} pieces on promotion ${this.price}: Amount = ${sum}$`);
    }

    three_for_15000(price, cond, count) {
        let checks = LCogolDrink.checkCountAndStock(this, 'Buy two get one Free', count , price);
        if (checks) { 
            console.log(checks);
            return; 
        }

        let sum = (Math.floor(count / cond)) * price;
        sum +=  (count % cond) * this.price;
        this.stock -= count;
        console.log(`You wanted ${this.name} product ${count} pieces on promotion 3 thinks ${price}: Amount = ${sum}$`);

    }

    price_per_gram(milliliter) {
        
        let milliliter_1_price = this.price / 1000;
        let sum = milliliter_1_price * milliliter;
        console.log(`You wanted ${this.name} product ${milliliter} mililitr pieces : Amount = ${sum}$`);
    }

    static checkCountAndStock(instance, stock_name, count, price) {        
        if (!count || count <= 0) { return `We have stock '${stock_name}!' at price ${price} !!!` }
        if (!instance.stock || instance.stock < count) { return 'There are not enough goods in the warehouse!!!' }
    }
}

let vodka = new LCogolDrink('Ohanyan', 10, 10000);

// add aukcion 
vodka.action.push(
    {
        type: "Buy two get one Free! ( vodka.action[0].logic(count - X) )",  
        condition: 3,                 
        logic: function(count) {  vodka.buy_two_get_one_free(this.condition, count)}
    },
    {
        type: "Buy three things for 15000$ ! ( vodka.action[1].logic(count - X) )",   
        pricePerItem: 15000,
        condition: 3,                 
        logic: function(count) { vodka.three_for_15000(this.pricePerItem, this.condition, count); }
    },
    {
        type: "Price per gram/milliliter  ( vodka.action[1].logic(count - X) )",
        logic: function(milliliter) { vodka.price_per_gram(milliliter); }
    }
)

vodka.action.forEach((v) => console.log(v.type));

console.log('\n/////////////////////////////////////////////////////////////////\n');

vodka.action[1].logic(4);
vodka.action[1].logic(5);
vodka.action[2].logic(100);