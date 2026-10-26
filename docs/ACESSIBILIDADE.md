# Acessibilidade e usabilidade

As telas dos três perfis compartilham as melhorias abaixo, no desktop e no mobile:

- Idioma `pt-BR`, conteúdo principal identificado por `main` e link “Pular para o conteúdo principal”.
- Foco visível, indicação da rota atual e títulos de página que acompanham a navegação.
- Menu mobile operável por teclado, com foco inicial, contenção de Tab, fechamento por Escape e retorno ao botão de abertura. O conteúdo de fundo fica inativo enquanto o menu está aberto.
- Formulários com rótulos, indicação programática de obrigatoriedade, erros associados aos campos e foco no primeiro controle inválido após o envio.
- Grupos identificados para crianças e turmas, com foco preservado ao adicionar ou remover campos.
- Modais com título e descrição associados, foco inicial em Cancelar nas exclusões, contenção de Tab e restauração do foco ao fechar.
- Mensagens de carregamento, erros e resultados de busca disponíveis em regiões de anúncio. Ícones decorativos ficam ocultos para leitores de tela.
- Confirmações de exclusão identificam a ação como “Excluir”. Falhas são anunciadas dentro do modal; mensagens de sucesso permanecem até serem fechadas pelo usuário.
- Contrastes ajustados, alvos de interação de pelo menos 44px de altura e respeito à preferência por movimento reduzido.
- Imagens de anotações com descrição contextual e link acessível para abrir o arquivo completo.

## Manutenção

Em novos formulários standalone, importar `AccessibleControl` e `AccessibleForm`, além de `ReactiveFormsModule`. As diretivas reconhecem os controles com `formControlName` e os formulários com `formGroup`.

Cada campo deve ter `id` e rótulo associado. O erro correspondente deve usar o identificador `<id-do-campo>-error` e aparecer quando o controle estiver inválido e tocado. A diretiva associa `aria-describedby` ao erro e deriva `aria-required` dos validadores.

Em novos modais, importar `AccessibleModal`, adicionar `appAccessibleModal` ao contêiner e definir `aria-labelledby` e `aria-describedby` apontando para elementos existentes. O Bootstrap continua responsável pela abertura e pelo fechamento.

## Verificação realizada

- `npm run build`: aprovado; permanece o aviso de tamanho do bundle inicial.
- `npm run test:a11y`: 35 testes aprovados, incluindo os 27 testes de carregamento existentes.
- Auditoria axe-core em 84 cenários com API simulada, em larguras de 320px e 1440px: nenhuma violação automática detectada nas regras executadas. O resumo está em `accessibility-audit.json`.
- Testes no navegador de Tab, Shift+Tab, Enter, Espaço e Escape, foco em navegação e campos dinâmicos, restauração de foco em modais e abertura de anexos por teclado.
- Ampliação do texto para 200% nas cinco telas da diretoria em 320px, sem rolagem horizontal do conteúdo, e verificação da preferência por movimento reduzido.

O comando de testes direcionados usa uma configuração própria porque outros testes antigos do projeto ainda importam `async` de `@angular/core/testing`, incompatível com a versão instalada.

A auditoria automática e os testes de teclado não certificam conformidade integral. A leitura e a sequência dos anúncios ainda precisam de avaliação manual com tecnologias assistivas, como NVDA e VoiceOver, e com usuários.
