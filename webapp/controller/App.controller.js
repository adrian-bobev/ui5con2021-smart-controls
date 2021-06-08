sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/Token"
], function (Controller, Token) {
	"use strict";

	return Controller.extend("smart.controls.demo.controller.App", {
		onInit: function () {
			// Get control references
			this._oSmartFilterBar = this.getView().byId("smartFilterBar");
			this._oStatusText = this.getView().byId("statusText");
			this._oComboBox = this.getView().byId("comboBox");
		},

		onAfterRendering: function () {
			// Set Initial data
			this._oSmartFilterBar.getControlByKey("ProductCode").addToken(new Token({ key: "PD-101", text: "PC (PD-101)" }));
		},

		onBeforeExport: function (oEvt) {
			var mExcelSettings = oEvt.getParameter("exportSettings");
			if (mExcelSettings.url) {
				return;
			}
			mExcelSettings.worker = false;
		},

		onAssignedFiltersChanged: function () {
			if (this._oStatusText && this._oSmartFilterBar) {
				var sText = this._oSmartFilterBar.retrieveFiltersWithValuesAsText();

				this._oStatusText.setText(sText);
			}
		}
	});

});
