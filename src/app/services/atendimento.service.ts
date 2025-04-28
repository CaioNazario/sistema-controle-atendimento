import { Injectable } from '@angular/core';
import { SenhasService } from './senhas.service';

@Injectable({
  providedIn: 'root',
})
export class AtendimentoService {
  public painelChamadas: string[] = [];
  private senhaAnterior: string | null = null;

  constructor(private senhasService: SenhasService) {}

  chamarProximaSenha(): string | null {
    const proximaSenha = this.selecionarProximaSenha();

    if (proximaSenha) {
      this.adicionarAoPainel(proximaSenha);
      this.senhaAnterior = proximaSenha;
      console.log(`Nova senha chamada: ${proximaSenha}`);
      return proximaSenha;
    }

    console.log('Nenhuma senha disponível para chamar.');
    return null;
  }

  private selecionarProximaSenha(): string | null {
    const { SP = [], SE = [], SG = [] } = this.senhasService.senhasArray || {};

    // Prioridade: alterna se última senha for SP, senão tenta SP primeiro
    if (!this.senhaAnterior || !this.senhaAnterior.includes('SP')) {
      if (SP.length > 0) return SP.shift() || null;
    }

    if (SE.length > 0) return SE.shift() || null;
    if (SG.length > 0) return SG.shift() || null;

    return null;
  }

  private adicionarAoPainel(senha: string): void {
    this.painelChamadas.unshift(senha);
    if (this.painelChamadas.length > 6) {
      this.painelChamadas.pop();
    }
    console.log(`Painel atualizado: `, this.painelChamadas);
  }

  finalizarAtendimento(): void {
    if (this.senhaAnterior) {
      console.log(`Atendimento finalizado para: ${this.senhaAnterior}`);
      this.senhaAnterior = null;
    } else {
      console.log('Nenhum atendimento em andamento para finalizar.');
    }
  }
}
