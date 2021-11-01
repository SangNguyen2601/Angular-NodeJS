import * as Acl from 'acl';
import { AclClass } from '../helper/acl.helper';

export class acl_config{
    static dbconnect : any;  //only connection declare while compiling

    constructor(dbconnect){
        acl_config.dbconnect = dbconnect;
        const MongodbBackend = Acl.mongodbBackend;
        const aclBackend = new MongodbBackend(acl_config.dbconnect,'_acl');
        const ACL = new Acl(aclBackend);

        ACL.allow([
            {
                roles:'user',
                allows:[
                ]
            },
            {
                roles: 'admin',
                allows: [
                ],
            }
        ]);

        let aclClass = new AclClass();
        aclClass.setAcl=ACL;
    }
}