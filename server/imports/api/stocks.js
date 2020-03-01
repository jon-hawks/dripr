import { Mongo }  from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Stocks = new Mongo.Collection('stocks');

Meteor.methods({
    'Stocks.addOne': ({ name }) => {
        return Stocks.insert({ name });
    },
});

Meteor.publish('stocks', () => {
    return Stocks.find();
});

export default Stocks;
