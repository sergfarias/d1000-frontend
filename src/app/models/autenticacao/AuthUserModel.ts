import { RetornoAutenticacaoModel } from "./RetornoAutenticacaoModel";
import { PermissionManager } from "./PermissionManager";

export class AuthUserModel {

    public constructor(User: RetornoAutenticacaoModel = null) {
        this.User = User;
        
        if(User)
            this.Permissions = new PermissionManager(User.permissoes);
    }

    User: RetornoAutenticacaoModel;
    Permissions: PermissionManager;

}