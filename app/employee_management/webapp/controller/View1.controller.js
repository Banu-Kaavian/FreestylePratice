sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
    
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("ns.employeemanagement.controller.View1", {
        onInit: function () {
            // Initialize if needed
        },

        // Function to Open the Dialog
        onCreate: function () {
            if (!this._oDialog) {
                this._oDialog = this.getView().byId("CreateEmployeeDialog");
            }
            this._oDialog.open();
        },

        onSave: function () {
            var oView = this.getView();
            var oModel = oView.getModel("MainModel");

            if (!oModel) {
                MessageToast.show("Error: Model not found!");
                return;
            }

            var oEntry = {
                ID: oView.byId("inputID").getValue(),
                Name: oView.byId("inputName").getValue(),
                Email: oView.byId("inputEmail").getValue(),
                Department: oView.byId("inputDepartment").getValue()
            };

            console.log("Entry:", oEntry);

            if (this._oEditContext) {
                // If editing, update the existing record
                this._oEditContext.setProperty("Name", oEntry.Name);
                this._oEditContext.setProperty("Email", oEntry.Email);
                this._oEditContext.setProperty("Department", oEntry.Department);

                MessageToast.show("Employee Updated Successfully!");
            } else {
                // If creating new, add a new entry
                var oListBinding = oView.byId("table0").getBinding("items");
                if (!oListBinding) {
                    MessageToast.show("Error: List binding not found!");
                    return;
                }
                oListBinding.create(oEntry);
                MessageToast.show("Employee Created Successfully!");
            }

            // Close Dialog
            this._oDialog.close();

            // Clear Edit Context
            this._oEditContext = null;
        },

        onCloseDialog: function () {
            this._oDialog.close();
        },

        onEdit: function () {
            var oTable = this.byId("table0");
            var oSelected = oTable.getSelectedItem();

            if (!oSelected) {
                MessageToast.show("Please select a row to edit.");
                return;
            }

            var oContext = oSelected.getBindingContext("MainModel");
            if (!oContext) {
                MessageToast.show("Error: No binding context found.");
                return;
            }

            var oSelectedData = oContext.getObject();
            this._oEditContext = oContext;

            // Open Dialog and Pre-Fill Fields
            if (!this._oDialog) {
                this._oDialog = this.getView().byId("CreateEmployeeDialog");
            }

            this.byId("inputID").setValue(oSelectedData.ID);
            this.byId("inputName").setValue(oSelectedData.Name);
            this.byId("inputEmail").setValue(oSelectedData.Email);
            this.byId("inputDepartment").setValue(oSelectedData.Department);

            // Update Save Button Text
            var oSaveButton = this.byId("saveButton");
            if (oSaveButton) {
                oSaveButton.setText("Update");
            } else {
                console.error("Error: saveButton not found!");
            }

            this._oDialog.open();
        },

        onDelete: function () {
            var oTable = this.byId("table0");
            var oSelected = oTable.getSelectedItem();

            if (oSelected) {
                var oContext = oSelected.getBindingContext("MainModel");
                var sEmployeeID = oContext.getProperty("ID");

                oContext.delete("$auto").then(
                    function () {
                        MessageToast.show("Employee with ID " + sEmployeeID + " deleted successfully.");
                        oTable.removeSelections(true);
                    }.bind(this),
                    function (oError) {
                        MessageToast.show("Deletion Error: " + oError.message);
                    }
                );
            } else {
                MessageToast.show("Please select a row to delete.");
            }
        },

        onCopy: async function () {
            var oTable = this.byId("table0");
            var oSelected = oTable.getSelectedItem();
            if (!oSelected) {
                MessageToast.show("Please select a row to copy.");
                return;
            }
        
            var oContext = oSelected.getBindingContext("MainModel"); //Use the already bindedcontext
            var model = this.getView().getModel("MainModel"); //getView() retrives the specific controller in that view getmode() retriving the existing model with name
            console.log("The model is : ",model);
            var sEmployeeID = oContext.getProperty("ID"); //getting the id from the model
            var oFunctionContext = model.bindContext("/migrateEmployee(...)"); //creating a bind with model and that action migrateEmployee
            oFunctionContext.setParameter("ID", sEmployeeID); //ID refers to current ID....also passing the input parameter
            try {
                await oFunctionContext.execute();
                MessageToast.show("Employee copied successfully.");
            } catch (oError) {
                MessageToast.show("Error copying employee: " + oError.message);
            }
        },
        onViewpage: function () {
            // Get the router instance
            var oRouter = this.getOwnerComponent().getRouter();
            console.log("button clicked");
            //console.log(oRouter);

            // Navigate to the "migratePage" target
            if(oRouter)
            {
              oRouter.navTo("migratePage");
              console.log("i am in oRouter");
            }
            else{
                console.log("Route not found");``
            }
            
        }
        
    });
});