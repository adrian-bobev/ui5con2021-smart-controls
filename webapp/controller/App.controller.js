sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("smart.controls.demo.controller.App", {
		onInit: function () {
			// Get control references
			this._oSmartFilterBar = this.getView().byId("smartFilterBar");
			this._oStatusText = this.getView().byId("statusText");
			this._oComboBox = this.getView().byId("comboBox");
		},

		onSFBinitialized: function () {
			// Add default value for ProductCode field
			this._oSmartFilterBar.setFilterData({
				ProductCode: { 
					items: [
						{ key: "PD-101", text: "PC (PD-101)" }
					]
				}
			});
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
		},

		onCriticalityChange: function (oEvent) {
			var oSource = oEvent.getSource();

			oSource.data("hasValue", oSource.getSelectedKeys().length > 0);
		},


		onBeforeRebindTable: function (oEvent) {
			var mBindingParams = oEvent.getParameter("bindingParams"),
				aSelectedKeys = this._oComboBox.getSelectedKeys();
			
				if (aSelectedKeys.length > 0) {
					var aFilters = aSelectedKeys.map(function (sKey) {
						return new Filter("Criticality", FilterOperator.EQ, sKey);
					}),
					oNewFilter = new Filter({
						filters: aFilters,
						and: false
					});
					mBindingParams.filters.push(oNewFilter);
				}
		},

		onAfterVariantLoad: function() {
			if (this._oSmartFilterBar) {
				var oData = this._oSmartFilterBar.getFilterData(),
				oCustomFieldData = oData["_CUSTOM"];
				
				if (oCustomFieldData && this._oComboBox) {
					this._oComboBox.setSelectedKeys(oCustomFieldData.MyCustomCriticality);
				}
			}
		},

		onBeforeVariantSave: function() {
			this._updateCustomFilter();
		},

		onBeforeVariantFetch: function() {
			this._updateCustomFilter();
		},

		_updateCustomFilter: function() {
			if (this._oSmartFilterBar && this._oComboBox) {
				this._oSmartFilterBar.setFilterData({
					_CUSTOM: {
						MyCustomCriticality: this._oComboBox.getSelectedKeys()
					}
				});
			}
		}
	});

});
