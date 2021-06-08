sap.ui.define(["sap/ui/core/util/MockServer", "sap/base/util/UriParameters"], function (MockServer, UriParameters) {
  "use strict";

  return {
    /**
     * Initializes the mock server.
     * You can configure the delay with the URL parameter "serverDelay".
     * The local mock data in this folder is returned instead of the real data for testing.
     * @public
     */
    init: function () {
      // create
      var oUriParamaters = UriParameters.fromQuery(window.location.search);
      var oMockServer = new MockServer({
        rootUri: "/"
      });

      MockServer.config({
        autoRespondAfter: oUriParamaters.get("serverDelay") || 1000
      });

      // simulate against the metadata and mock data
      oMockServer.simulate("localService/mockdata/metadata.xml", {
        sMockdataBaseUrl: "localService/mockdata"
      });

      // start
      oMockServer.start();
    }
  };
});
