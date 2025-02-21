sap.ui.define([
    "sap/ui/core/UIComponent",
    "ns/employeemanagement/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("ns.employeemanagement.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            //call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // enable routing
            this.getRouter().initialize();
        }
    });
});