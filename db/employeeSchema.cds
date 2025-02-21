using { cuid, managed } from '@sap/cds/common';

namespace ns.emp;

entity Employee : cuid, managed {
    key ID  : String(15);
        Name : String(115);
        Email : String(20);
        Department : String(50);

}
entity MigrateEmployee : cuid, managed {
    key ID  : String(15);
        Name : String(115);
        Email : String(20);
        Department : String(50);
        MigratedAt : Timestamp;

}

