sap.ui.define([
	'jquery.sap.global',
	'io/simplifier/ui5/framework/Util',
	'io/simplifier/ui5/adminui/modules/AppController',
	'sap/ui/model/json/JSONModel',
    'io/simplifier/ui5/framework/Ajax'
], function(jQuery, Util, Controller, JSONModel, Ajax) {
	"use strict";

	var demoController = Controller.extend("io.simplifier.ui5.plugin.NodeDemoPlugin.demo", {

		onInit: function() {
			Controller.prototype.onInit.apply(this, arguments);  // call super.onInit()
		},
		
		onBackToPlugins: function() {
			var parentView = this.getView().getParent();
			while (parentView && !parentView.byId) {
				parentView = parentView.getParent();
			}
			console.log(parentView);
			var navBar = parentView.byId("pluginNavigation");
			var overViewItem = navBar.getItems()[0];
			navBar.setSelectedItem(overViewItem);
			navBar.fireSelect({'itemId': overViewItem.id, 'item': overViewItem});
		}
		
	});

	return demoController;
});
