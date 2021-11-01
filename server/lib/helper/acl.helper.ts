export class AclClass{
    static _acl : any;  //only connection declare while compiling
    constructor(){}
    set setAcl(acl:any){
        AclClass._acl = acl;
    }
    get getAcl(){
        return AclClass._acl;
    }
}