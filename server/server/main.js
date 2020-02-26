import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";
import '/imports/api/stocks';

Meteor.startup(() => {
  // Code to run on server startup.

});

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});
