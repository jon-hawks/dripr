import {Jobs} from 'meteor/msavin:sjobs';

Jobs.register({
    updateStock: function(){

        /* Pick a stock. */
        const stock = 'DIA';

        /* Feedback. */
        console.log('Updating stock: ' + stock + '.');

        /* Get website. */
        //var http = HTTP.get('http://example.com');
        this.replicate({in: {seconds: 5}});
        this.success();
    }
});
