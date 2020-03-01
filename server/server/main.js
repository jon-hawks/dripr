import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";
import '/imports/api/stocks';
import '/imports/jobs/stocks';

    // Code to run on server startup.
Meteor.startup(() => {

    /* Keep stock data updated. */
    Jobs.run('updateStock', {singular: true});

});

//onPageLoad(sink => {
//    // Code to run on every request.
//    sink.renderIntoElementById(
//        "server-render-target",
//        `Server time: ${new Date}`
//    );
//});
