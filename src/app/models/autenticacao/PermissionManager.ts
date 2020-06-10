import { V_DML_BA_USU_PERMISSAO } from "./V_DML_BA_USU_PERMISSAO";

/**
 * Representa um facilitador para gerenciar permissões de um usuário.
 */
export class PermissionManager {

    public constructor(permissoes: V_DML_BA_USU_PERMISSAO[]) {
        this.Permissoes = permissoes;
    }

    /**
     * Lista de permissões retornadas pelo provedor de autenticação.
     */
    public Permissoes: V_DML_BA_USU_PERMISSAO[];
 
    /**
     * Indica se um ou mais grupos do usuário têm permissões administrativas totais.
     */
    public get IsAdministrador() : boolean {
        let adm = this.Permissoes.filter(p => p.adm);

        return adm.length > 0;
    }

    /**
     * Verifica se o usuário possui a permissão global especificada.
     * @param CodigoPermissao Código da permissão global.
     */
    public TemPermissaoGlobal(CodigoPermissao: number): boolean {
        return this.IsAdministrador || this.Permissoes.filter(p => p.iD_PERMISSAO == CodigoPermissao).length > 0;
    }

    /**
     * Verifica se o usuário possui uma permissão local na tela especificada.
     * @param CodigoTela Código da tela.
     * @param CodigoPermissao Código da permissão.
     */
    public TemPermissaoLocal(CodigoTela: number, CodigoPermissao: number): boolean {
        return this.IsAdministrador || this.Permissoes.filter(p => p.iD_TELA == CodigoTela && p.iD_PERMISSAO == CodigoPermissao).length > 0;
    }

    /**
     * Verifica se o usuário tem permissão na tela especificada.
     * @param CodigoTela Código da tela.
     */
    public AcessaTela(CodigoTela: number): boolean {
        return this.IsAdministrador || this.Permissoes.filter(p => p.iD_TELA == CodigoTela).length > 0;
    }
    
    /**
     * Verifica se o usuário tem permissão no módulo especificado.
     * @param CodigoModulo Código do módulo.
     */
    public AcessaModulo(CodigoModulo: number): boolean {
        return this.IsAdministrador || this.Permissoes.filter(p => p.iD_MODULO == CodigoModulo).length > 0;
    }

}