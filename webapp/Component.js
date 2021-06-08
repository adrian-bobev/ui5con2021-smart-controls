sap.ui.define([
	"sap/ui/core/UIComponent", "sap/ui/fl/FakeLrepConnectorLocalStorage", "sap/ui/core/ComponentSupport",
], function (UIComponent, FakeLrepConnectorLocalStorage) {
	"use strict";

	return UIComponent.extend("smart.controls.demo.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			UIComponent.prototype.init.apply(this, arguments);
			FakeLrepConnectorLocalStorage.enableFakeConnector();
		},
		exit: function () {
			FakeLrepConnectorLocalStorage.disableFakeConnector();
		}
	});
});
