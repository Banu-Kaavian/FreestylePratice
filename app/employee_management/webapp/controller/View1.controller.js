sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"], 
    (Controller, MessageToast) =>
 {
    "use strict";

    return Controller.extend("ns.employeemanagement.controller.View1", {
        onInit() {
            
        },

        // Function to Open the Dialog
        onCreate: function() {
            if (!this._oDialog) {
                this._oDialog = this.getView().byId("CreateEmployeeDialog");
            }
            this._oDialog.open();
        },
        onSave: function () {
            var oView = this.getView();
            var oModel = oView.getModel("MainModel");  
        
            if (!oModel) {
                sap.m.MessageToast.show("Error: Model not found!");
                return;
            }
        
            var oEntry = {
                ID: this.getView().byId("inputID").getValue(),
                Name: this.getView().byId("inputName").getValue(),
                Email: this.getView().byId("inputEmail").getValue(),
                Department: this.getView().byId("inputDepartment").getValue()
            };
        
            console.log("Entry:", oEntry);
        
            if (this._oEditContext) { 
                // If editing, update the existing record
                this._oEditContext.setProperty("Name", oEntry.Name);
                this._oEditContext.setProperty("Email", oEntry.Email);
                this._oEditContext.setProperty("Department", oEntry.Department);
        
                sap.m.MessageToast.show("Employee Updated Successfully!");
            } else { 
                // If creating new, add a new entry
                var oListBinding = oView.byId("table0").getBinding("items"); 
                if (!oListBinding) {
                    sap.m.MessageToast.show("Error: List binding not found!");
                    return;
                }
                oListBinding.create(oEntry);
                sap.m.MessageToast.show("Employee Created Successfully!");
            }
        
            // Refresh Model
            oModel.refresh();
        
            // Close Dialog
            this._oDialog.close();
        
            // Clear Edit Context
            this._oEditContext = null;
        },
        
        onCloseDialog: function() {
            this.getView().byId("CreateEmployeeDialog").close();
        },
        onEdit: function () {
            var oTable = this.byId("table0"); 
            var oSelected = oTable.getSelectedItem(); 
        
            if (!oSelected) {
                sap.m.MessageToast.show("Please select a row to edit.");
                return;
            }
        
            var oContext = oSelected.getBindingContext("MainModel");
            if (!oContext) {
                sap.m.MessageToast.show("Error: No binding context found.");
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
        
            // Fix for setText error
            var oSaveButton = this.byId("saveButton");
            if (oSaveButton) {
                oSaveButton.setText("Update");
            } else {
                console.error("Error: saveButton not found!");
            }
        
            this._oDialog.open();
        },
        
        onDelete: function () {
        var oTable = this.byId("table0"); // Get the Table
        var oSelected = oTable.getSelectedItem(); // Get the Selected Item
        console.log(oSelected);
        if (oSelected) {
            var oContext = oSelected.getBindingContext("MainModel"); // Get Binding Context
            var sEmployeeID = oContext.getProperty("ID"); // Get Employee ID
            if (sEmployeeID) {
                oContext.delete("$auto").then(
                    function () {
                        MessageToast.show("Employee with ID " + sEmployeeID + " deleted successfully.");
                        oTable.removeSelections(true); // Clear Selection
                        }.bind(this),
                        function (oError) {
                            MessageToast.show("Deletion Error: " + oError.message);
                        });
                    }
                    else
                    {
                        MessageToast.show("Invalid Employee ID");
                    }
                }
                else
                {
                    MessageToast.show("Please select a row to delete.");
                }
            }

    });
});
