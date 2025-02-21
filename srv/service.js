const cds = require('@sap/cds');

module.exports = async (srv) => { //srv is a object passed as a parameter
    const { Employee, MigrateEmployee } = srv.entities;

    srv.on('migrateEmployee', async (req) => { //calling the action in service.js by handler(srv.on)
        const { ID } = req.data;

        // Validate ID
        if (!ID) {
            req.error(400, "Employee ID is required.");
            return;
        }

        // Check if employee exists
        const employee = await SELECT.one.from(Employee).where({ ID });  //raw sql quer can't be used

        // Insert into MigrateEmployee table
        await INSERT.into(MigrateEmployee).entries({
            ID: employee.ID,
            Name: employee.Name,
            Email: employee.Email,
            Department: employee.Department,
            MigratedOn: new Date()
        });
    });
};