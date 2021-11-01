"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Acl = require("acl");
const acl_helper_1 = require("../helper/acl.helper");
class acl_config {
    constructor(dbconnect) {
        acl_config.dbconnect = dbconnect;
        const MongodbBackend = Acl.mongodbBackend;
        const aclBackend = new MongodbBackend(acl_config.dbconnect, '_acl');
        const ACL = new Acl(aclBackend);
        ACL.allow([
            {
                roles: 'user',
                allows: []
            },
            {
                roles: 'admin',
                allows: [],
            }
        ]);
        let aclClass = new acl_helper_1.AclClass();
        aclClass.setAcl = ACL;
    }
}
exports.acl_config = acl_config;
//# sourceMappingURL=acl_config.js.map