// ========== Habilidades fixas de Classe ==========
// Apenas habilidades fixas (não opcionais). Subclasses (caminhos, domínios,
// colégios, juramentos, escolas, arquétipos, conclaves, patronos, origens,
// círculos, tradições) NÃO são incluídas — adicione-as manualmente no
// canvas livre, pois são escolhas do jogador.
// "Incremento no Valor de Habilidade" também é omitido por ser genérico.

// Dado de vida por classe (para auto-preenchimento)
const CLASS_HIT_DIE = {
  barbaro: 12,
  bardo: 8,
  bruxo: 8,
  clerigo: 8,
  druida: 8,
  feiticeiro: 6,
  guerreiro: 10,
  ladino: 8,
  mago: 6,
  monge: 8,
  paladino: 10,
  patrulheiro: 10,
};

const CLASS_LABELS = {
  barbaro: 'Bárbaro',
  bardo: 'Bardo',
  bruxo: 'Bruxo',
  clerigo: 'Clérigo',
  druida: 'Druida',
  feiticeiro: 'Feiticeiro',
  guerreiro: 'Guerreiro',
  ladino: 'Ladino',
  mago: 'Mago',
  monge: 'Monge',
  paladino: 'Paladino',
  patrulheiro: 'Patrulheiro',
};

const CLASS_FEATURES = {
  barbaro: [
    { level: 1, titulo: 'Pontos de Vida (Bárbaro)', descricao: 'Dado de Vida: 1d12 por nível de bárbaro. PV no 1° nível: 12 + mod. Constituição. PV nos níveis seguintes: 1d12 (ou 7) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Bárbaro)', descricao: 'ARMADURAS: leves, médias e escudos. ARMAS: simples, marciais. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Força, Constituição. PERÍCIAS: escolha 2 dentre Adestrar Animais, Atletismo, Intimidação, Natureza, Percepção e Sobrevivência.' },
    { level: 1, titulo: 'Fúria', descricao: 'AÇÃO BÔNUS no seu turno para entrar em fúria. Enquanto estiver em fúria (sem armadura pesada): vantagem em testes e resistências de Força; bônus de dano em ataques corpo-a-corpo com Força (ver coluna Dano de Fúria na tabela); resistência contra dano de concussão, cortante e perfurante. NÃO PODE conjurar magias nem se concentrar nelas. Dura 1 min; termina cedo se cair inconsciente, ou se o seu turno acabar sem ter atacado ou sofrido dano. Pode terminar voluntariamente com ação bônus. Usos por dia conforme a tabela O Bárbaro (recarrega em descanso longo).' },
    { level: 1, titulo: 'Defesa sem Armadura', descricao: 'Sem armadura, sua CA = 10 + mod. Destreza + mod. Constituição. Escudo é permitido e mantém o benefício.' },
    { level: 2, titulo: 'Ataque Descuidado', descricao: 'No primeiro ataque do seu turno você pode atacar descuidadamente: vantagem nas jogadas de ataque corpo-a-corpo com Força durante o turno, mas ataques contra você têm vantagem até o início do seu próximo turno.' },
    { level: 2, titulo: 'Sentido de Perigo', descricao: 'Vantagem em testes de resistência de Destreza contra efeitos que você possa ver (armadilhas, magias). Não funciona se estiver cego, surdo ou incapacitado.' },
    { level: 3, titulo: 'Caminho Primitivo', descricao: 'No 3° nível, escolha um caminho: Caminho do Furioso ou Caminho do Guerreiro Totêmico. Confere características no 3°, 6°, 10° e 14° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 5, titulo: 'Ataque Extra', descricao: 'Pode atacar duas vezes (em vez de uma) sempre que realizar a ação de Ataque.' },
    { level: 5, titulo: 'Movimento Rápido', descricao: 'Seu deslocamento aumenta em 3m enquanto não estiver com armadura pesada.' },
    { level: 7, titulo: 'Instinto Selvagem', descricao: 'Vantagem em iniciativa. Se estiver surpreso e não incapacitado, você pode agir normalmente no primeiro turno DESDE QUE entre em fúria antes de qualquer outra coisa.' },
    { level: 9, titulo: 'Crítico Brutal', descricao: 'Em acerto crítico com arma corpo-a-corpo, rola +1 dado de dano (escala: +2 dados no 13°, +3 dados no 17°).' },
    { level: 11, titulo: 'Fúria Implacável', descricao: 'Se cair a 0 PV em fúria sem morrer, faça teste de Constituição CD 10. Sucesso: volta a 1 PV. A CD sobe +5 a cada uso adicional; reseta para 10 após qualquer descanso curto ou longo.' },
    { level: 15, titulo: 'Fúria Persistente', descricao: 'Sua fúria só termina prematuramente se cair inconsciente ou se você decidir terminá-la.' },
    { level: 18, titulo: 'Força Indomável', descricao: 'Se o total de um teste de Força for menor que o seu valor de Força, use o valor de Força no lugar do resultado.' },
    { level: 20, titulo: 'Campeão Primitivo', descricao: 'Força e Constituição aumentam em +4. O máximo desses atributos passa para 24.' },
  ],

  bardo: [
    { level: 1, titulo: 'Pontos de Vida (Bardo)', descricao: 'Dado de Vida: 1d8 por nível de bardo. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Bardo)', descricao: 'ARMADURAS: leves. ARMAS: simples, bestas de mão, espadas longas, rapieiras, espadas curtas. FERRAMENTAS: três instrumentos musicais à sua escolha. TESTES DE RESISTÊNCIA: Destreza, Carisma. PERÍCIAS: escolha três quaisquer.' },
    { level: 1, titulo: 'Conjuração (Bardo)', descricao: 'Conjurador completo. Atributo de conjuração: CARISMA. Foco de conjuração: instrumento musical. Pode conjurar como ritual qualquer magia que conheça com o descritor ritual. CD = 8 + prof + Car; ataque mágico = prof + Car.' },
    { level: 1, titulo: 'Inspiração de Bardo (d6)', descricao: 'AÇÃO BÔNUS: escolha 1 criatura (não você) a até 18m que possa ouvi-lo. Ela ganha 1 dado de Inspiração (d6 inicial). Pode adicioná-lo a um teste de habilidade, ataque ou resistência nos próximos 10 min (decide após rolar o d20, antes do resultado). Usos = mod. Carisma (mín. 1) por descanso longo. Dado evolui: d8 (5°), d10 (10°), d12 (15°).' },
    { level: 2, titulo: 'Versatilidade', descricao: 'Adiciona metade do bônus de proficiência (arredondado para baixo) em testes de habilidade que ainda NÃO usem seu bônus de proficiência.' },
    { level: 2, titulo: 'Canção do Descanso (d6)', descricao: 'Durante um descanso CURTO, você e aliados que ouvirem sua atuação e gastarem Dados de Vida recuperam +1d6 PV adicionais ao final do descanso. Aumenta: d8 (9°), d10 (13°), d12 (17°).' },
    { level: 3, titulo: 'Colégio de Bardo', descricao: 'No 3° nível, escolha um colégio: Colégio do Conhecimento ou Colégio da Bravura. Confere características no 3°, 6° e 14° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 3, titulo: 'Aptidão', descricao: 'Escolha 2 perícias em que é proficiente. Bônus de proficiência DOBRADO nelas. Mais 2 perícias adicionais no 10° nível.' },
    { level: 5, titulo: 'Fonte de Inspiração', descricao: 'Você recupera TODOS os usos de Inspiração de Bardo ao terminar um descanso curto OU longo (não apenas longo).' },
    { level: 6, titulo: 'Canção de Proteção', descricao: 'AÇÃO: começa uma atuação que dura até o fim do seu próximo turno. Você e aliados a até 9m têm vantagem em testes de resistência contra ser amedrontado ou enfeitiçado. A criatura deve ouvir você. Termina se você for incapacitado, silenciado, ou voluntariamente.' },
    { level: 10, titulo: 'Segredos Mágicos', descricao: 'Escolha 2 magias de QUALQUER classe (ou truques) de nível que possa conjurar. Contam como magias de bardo e já estão incluídas em Magias Conhecidas. Mais 2 no 14° e mais 2 no 18°.' },
    { level: 20, titulo: 'Inspiração Superior', descricao: 'Quando rolar iniciativa sem usos restantes de Inspiração de Bardo, recupera 1 uso.' },
  ],

  bruxo: [
    { level: 1, titulo: 'Pontos de Vida (Bruxo)', descricao: 'Dado de Vida: 1d8 por nível de bruxo. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Bruxo)', descricao: 'ARMADURAS: leves. ARMAS: simples. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Sabedoria, Carisma. PERÍCIAS: escolha 2 dentre Arcanismo, Enganação, História, Intimidação, Investigação, Natureza e Religião.' },
    { level: 1, titulo: 'Patrono Transcendental', descricao: 'No 1° nível, escolha um ser transcendental como patrono: a Arquifada, o Corruptor ou o Grande Antigo. A escolha confere traços no 1°, 6°, 10° e 14° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Magia de Pacto', descricao: 'Conjurador especial (espaços iguais, recarregam em descanso CURTO ou longo). Atributo: CARISMA. Foco: foco arcano. Todos os espaços são do mesmo nível (ver tabela). CD = 8 + prof + Car; ataque mágico = prof + Car.' },
    { level: 2, titulo: 'Invocações Místicas', descricao: 'Ganha 2 invocações iniciais (e mais conforme tabela). Ao subir de nível na classe, pode substituir uma invocação conhecida. Algumas têm pré-requisitos (nível mínimo, Pacto específico ou truque rajada mística).' },
    { level: 3, titulo: 'Dádiva do Pacto', descricao: 'Escolha 1: Pacto da Corrente (familiar especial — diabrete, pseudodragão, quasit ou sprite), Pacto da Lâmina (arma de pacto invocável) ou Pacto do Tomo (Livro das Sombras com 3 truques extras). Define várias invocações exclusivas.' },
    { level: 11, titulo: 'Arcana Mística (6° nível)', descricao: 'Escolha 1 magia de 6° nível da lista de bruxo como arcana. Pode conjurá-la 1 VEZ por descanso LONGO sem gastar espaço de magia.' },
    { level: 13, titulo: 'Arcana Mística (7° nível)', descricao: 'Como acima, mas para uma magia de 7° nível. 1 uso por descanso longo.' },
    { level: 15, titulo: 'Arcana Mística (8° nível)', descricao: 'Como acima, mas para uma magia de 8° nível. 1 uso por descanso longo.' },
    { level: 17, titulo: 'Arcana Mística (9° nível)', descricao: 'Como acima, mas para uma magia de 9° nível. 1 uso por descanso longo.' },
    { level: 20, titulo: 'Mestre Místico', descricao: 'Gaste 1 minuto suplicando ao patrono para recuperar TODOS os espaços de magia gastos da Magia de Pacto. 1 uso por descanso longo.' },
  ],

  clerigo: [
    { level: 1, titulo: 'Pontos de Vida (Clérigo)', descricao: 'Dado de Vida: 1d8 por nível de clérigo. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Clérigo)', descricao: 'ARMADURAS: leves, médias, escudos. ARMAS: todas as armas simples. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Sabedoria, Carisma. PERÍCIAS: escolha 2 dentre História, Intuição, Medicina, Persuasão e Religião.' },
    { level: 1, titulo: 'Domínio Divino', descricao: 'No 1° nível, escolha um domínio relacionado à sua divindade: Conhecimento, Enganação, Guerra, Luz, Natureza, Tempestade ou Vida. Concede magias de domínio (sempre preparadas, não contam no limite) e características próprias no 1°, 2°, 6°, 8° e 17° nível, além de novos efeitos de Canalizar Divindade. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Conjuração (Clérigo)', descricao: 'Conjurador completo. Atributo: SABEDORIA. Foco: símbolo sagrado. Magias preparadas diariamente: mod. Sab + nível de clérigo (mín. 1). Pode conjurar como ritual qualquer magia preparada com descritor ritual. CD = 8 + prof + Sab; ataque mágico = prof + Sab.' },
    { level: 2, titulo: 'Canalizar Divindade (1/descanso)', descricao: 'Recurso que abastece efeitos divinos. No 1° uso você já tem 2 opções: "Expulsar Mortos-Vivos" e uma do seu Domínio Divino. Recarrega em descanso CURTO ou longo. Usos: 1× no 2°, 2× no 6°, 3× no 18°. CD = sua CD de magia.' },
    { level: 2, titulo: 'Canalizar Divindade: Expulsar Mortos-Vivos', descricao: '(Gasta 1 uso de Canalizar Divindade.) AÇÃO: erga o símbolo sagrado. Cada morto-vivo a até 9m que veja/ouça você faz teste de Sabedoria (CD igual à sua CD de magia). Em falha: expulso por 1 minuto OU até sofrer dano. Expulso deve fugir, não pode se aproximar a <9m por vontade própria, não pode reagir, e suas ações ficam limitadas a Disparada ou Esquivar.' },
    { level: 5, titulo: 'Destruir Mortos-Vivos', descricao: 'Quando um morto-vivo falha no teste de Expulsar Mortos-Vivos (que gasta 1 uso de Canalizar Divindade), é DESTRUÍDO instantaneamente se seu ND ≤ ao limite por nível: 5°: ND 1/2; 8°: ND 1; 11°: ND 2; 14°: ND 3; 17°: ND 4.' },
    { level: 10, titulo: 'Intervenção Divina', descricao: 'AÇÃO: implore o auxílio do seu deus, descrevendo o que busca. Role d100; se ≤ seu nível de clérigo, a divindade intervém (Mestre decide o efeito — qualquer magia de clérigo ou de domínio é apropriada). Em SUCESSO: 7 dias até poder usar de novo. Em falha: recarrega após descanso longo. No 20° nível, funciona automaticamente sem rolagem.' },
  ],

  druida: [
    { level: 1, titulo: 'Pontos de Vida (Druida)', descricao: 'Dado de Vida: 1d8 por nível de druida. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Druida)', descricao: 'ARMADURAS: leves, médias, escudos (NÃO usa de metal). ARMAS: clavas, adagas, dardos, azagaias, maças, bordões, cimitarras, foices, fundas, lanças. FERRAMENTAS: kit de herbalismo. TESTES DE RESISTÊNCIA: Inteligência, Sabedoria. PERÍCIAS: escolha 2 dentre Arcanismo, Adestrar Animais, Intuição, Medicina, Natureza, Percepção, Religião e Sobrevivência.' },
    { level: 2, titulo: 'Círculo Druídico', descricao: 'No 2° nível, escolha um círculo: Círculo da Terra ou Círculo da Lua. Concede características no 2°, 6°, 10° e 14° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Druídico', descricao: 'Você conhece Druídico (idioma secreto). Pode falá-lo e deixar mensagens ocultas. Outros percebem a mensagem em Sab (Percepção) CD 15, mas não decifram sem magia.' },
    { level: 1, titulo: 'Conjuração (Druida)', descricao: 'Conjurador completo. Atributo: SABEDORIA. Foco: foco druídico. Magias preparadas diariamente: mod. Sab + nível de druida (mín. 1). Pode conjurar como ritual qualquer magia preparada com descritor ritual. NÃO usa armaduras/escudos de metal. CD = 8 + prof + Sab.' },
    { level: 2, titulo: 'Forma Selvagem', descricao: 'AÇÃO: assuma a forma de uma besta que já tenha visto. 2 usos, recarregam em descanso curto ou longo. ND máximo cresce com o nível — 2°: ND 1/4 (sem voo/natação); 4°: ND 1/2 (sem voo); 8°: ND 1. Dura metade do nível em horas; pode reverter como ação bônus (ou automático em inconsciência/0 PV). Mantém Int, Sab, Car e proficiências; perde a capacidade de conjurar (exceto a partir do 18° nível) e fica limitado pelas capacidades físicas da forma. PV/estatísticas físicas viram as da besta.' },
    { level: 18, titulo: 'Corpo Atemporal', descricao: 'Para cada 10 anos que se passam, seu corpo envelhece só 1 ano.' },
    { level: 18, titulo: 'Magias da Besta', descricao: 'Pode conjurar muitas magias em qualquer forma de Forma Selvagem (componentes V/S possíveis na forma de besta; ainda não fornece componentes materiais).' },
    { level: 20, titulo: 'Arquidruida', descricao: 'Usos ilimitados de Forma Selvagem. Ignora componentes V/S das suas magias de druida e componentes M sem custo e não consumidos — tanto na forma normal quanto na de besta.' },
  ],

  feiticeiro: [
    { level: 1, titulo: 'Pontos de Vida (Feiticeiro)', descricao: 'Dado de Vida: 1d6 por nível de feiticeiro. PV no 1° nível: 6 + mod. Constituição. PV nos níveis seguintes: 1d6 (ou 4) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Feiticeiro)', descricao: 'ARMADURAS: nenhuma. ARMAS: adagas, dardos, fundas, bordões e bestas leves. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Constituição, Carisma. PERÍCIAS: escolha 2 dentre Arcanismo, Enganação, Intuição, Intimidação, Persuasão e Religião.' },
    { level: 1, titulo: 'Origem de Feitiçaria', descricao: 'No 1° nível, escolha uma origem: Linhagem Dracônica ou Magia Selvagem. Concede características no 1°, 6°, 14° e 18° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Conjuração (Feiticeiro)', descricao: 'Conjurador completo. Atributo: CARISMA. Foco: foco arcano. Magias conhecidas (não preparadas). CD = 8 + prof + Car; ataque mágico = prof + Car.' },
    { level: 2, titulo: 'Fonte de Magia', descricao: 'Você ganha pontos de feitiçaria (ver tabela). Recarrega em descanso longo. Máximo conforme nível na tabela.' },
    { level: 2, titulo: 'Conjuração Flexível', descricao: 'AÇÃO BÔNUS: gaste pontos de feitiçaria para CRIAR espaços de magia (1°: 2 pts; 2°: 3 pts; 3°: 5 pts; 4°: 6 pts; 5°: 7 pts — máximo nível 5). OU gaste 1 espaço de magia para ganhar pontos de feitiçaria iguais ao nível do espaço. Espaços criados desaparecem ao final de um descanso longo.' },
    { level: 3, titulo: 'Metamágica', descricao: 'Escolha 2 opções de Metamágica (Acelerada, Aumentada, Cuidadosa, Distante, Duplicada, Estendida, Potencializada ou Sutil). Mais 1 no 10° e mais 1 no 17°. Apenas 1 opção por magia conjurada (exceto Potencializada, que combina com outras).' },
    { level: 20, titulo: 'Restauração Mística', descricao: 'Recupera 4 pontos de feitiçaria gastos sempre que terminar um descanso CURTO.' },
  ],

  guerreiro: [
    { level: 1, titulo: 'Pontos de Vida (Guerreiro)', descricao: 'Dado de Vida: 1d10 por nível de guerreiro. PV no 1° nível: 10 + mod. Constituição. PV nos níveis seguintes: 1d10 (ou 6) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Guerreiro)', descricao: 'ARMADURAS: todas, escudos. ARMAS: simples, marciais. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Força, Constituição. PERÍCIAS: escolha 2 dentre Acrobacia, Adestrar Animais, Atletismo, História, Intuição, Intimidação, Percepção e Sobrevivência.' },
    { level: 3, titulo: 'Arquétipo Marcial', descricao: 'No 3° nível, escolha um arquétipo: Campeão, Cavaleiro Arcano ou Mestre de Batalha. Confere características no 3°, 7°, 10°, 15° e 18° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Estilo de Luta', descricao: 'Adote 1 estilo: Arquearia, Combate com Armas Grandes, Combate com Duas Armas, Defesa, Duelismo ou Proteção. Não pode escolher o mesmo Estilo mais de uma vez (mesmo se ganhar outra escolha).' },
    { level: 1, titulo: 'Retomar o Fôlego', descricao: 'AÇÃO BÔNUS: recupere PV iguais a 1d10 + nível de guerreiro. Recarrega em descanso curto ou longo.' },
    { level: 2, titulo: 'Surto de Ação (1 uso)', descricao: 'Realize 1 AÇÃO ADICIONAL além da sua ação e da possível ação bônus, em qualquer turno seu. Recarrega em descanso curto ou longo. 2 usos a partir do 17° (mas só 1 por turno).' },
    { level: 5, titulo: 'Ataque Extra', descricao: 'Pode atacar 2 vezes (em vez de 1) quando usar a ação de Ataque. Sobe para 3 ataques no 11° nível e 4 ataques no 20° nível.' },
    { level: 9, titulo: 'Indomável (1 uso)', descricao: 'Pode rolar de NOVO um teste de resistência que falhou (deve usar o novo valor). 1 uso por descanso longo. Sobe para 2 usos no 13° e 3 usos no 17°.' },
  ],

  ladino: [
    { level: 1, titulo: 'Pontos de Vida (Ladino)', descricao: 'Dado de Vida: 1d8 por nível de ladino. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Ladino)', descricao: 'ARMADURAS: leves. ARMAS: simples, bestas de mão, espadas longas, rapieiras, espadas curtas. FERRAMENTAS: ferramentas de ladrão. TESTES DE RESISTÊNCIA: Destreza, Inteligência. PERÍCIAS: escolha 4 dentre Acrobacia, Atletismo, Atuação, Enganação, Furtividade, Intimidação, Intuição, Investigação, Percepção, Persuasão e Prestidigitação.' },
    { level: 3, titulo: 'Arquétipo de Ladino', descricao: 'No 3° nível, escolha um arquétipo: Assassino, Ladrão ou Trapaceiro Arcano. Confere características no 3°, 9°, 13° e 17° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Especialização', descricao: 'Escolha 2 perícias em que é proficiente (ou 1 perícia + ferramentas de ladrão). Bônus de proficiência DOBRADO nelas. Mais 2 escolhas no 6° nível.' },
    { level: 1, titulo: 'Ataque Furtivo', descricao: '1×/turno, adiciona dado(s) de Ataque Furtivo (ver coluna: 1d6 no 1°, escalando a cada 2 níveis) ao dano de UM ataque contra uma criatura, se: (1) você tem vantagem na jogada, OU (2) outro inimigo do alvo está adjacente (≤1,5m) ao alvo, sem incapacidade e você não tem desvantagem. O ataque deve ser com arma de acuidade ou à distância.' },
    { level: 1, titulo: 'Gíria de Ladrão', descricao: 'Você conhece a gíria de ladrão (dialeto, jargão e códigos para passar mensagens secretas em conversas comuns — leva 4× mais tempo para transmitir). Também entende sinais/símbolos secretos.' },
    { level: 2, titulo: 'Ação Ardilosa', descricao: 'Cada turno em combate, você pode usar uma AÇÃO BÔNUS para fazer APENAS: Disparada, Desengajar ou Esconder.' },
    { level: 5, titulo: 'Esquiva Sobrenatural', descricao: 'REAÇÃO: quando um inimigo que você possa ver acerta você com um ataque, reduz o dano pela METADE.' },
    { level: 7, titulo: 'Evasão', descricao: 'Em efeitos que pedem teste de resistência de Destreza para metade do dano: SUCESSO = 0 dano; FALHA = metade do dano.' },
    { level: 11, titulo: 'Talento Confiável', descricao: 'Em qualquer teste de habilidade que adicione seu bônus de proficiência, trata um d20 ≤ 9 como 10.' },
    { level: 14, titulo: 'Sentido Cego', descricao: 'Se pode ouvir, está ciente da localização de criaturas escondidas ou invisíveis a até 3m.' },
    { level: 15, titulo: 'Mente Escorregadia', descricao: 'Ganha proficiência em testes de resistência de SABEDORIA.' },
    { level: 18, titulo: 'Elusivo', descricao: 'Nenhuma jogada de ataque tem vantagem contra você, desde que NÃO esteja incapacitado.' },
    { level: 20, titulo: 'Golpe de Sorte', descricao: 'Se um ataque seu erra (mas estava no alcance), pode transformá-lo em ACERTO. OU, se falha em um teste qualquer, pode tratar o d20 como 20 natural. 1 uso por descanso curto ou longo.' },
  ],

  mago: [
    { level: 1, titulo: 'Pontos de Vida (Mago)', descricao: 'Dado de Vida: 1d6 por nível de mago. PV no 1° nível: 6 + mod. Constituição. PV nos níveis seguintes: 1d6 (ou 4) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Mago)', descricao: 'ARMADURAS: nenhuma. ARMAS: adagas, dardos, fundas, bordões, bestas leves. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Inteligência, Sabedoria. PERÍCIAS: escolha 2 dentre Arcanismo, História, Intuição, Investigação, Medicina e Religião.' },
    { level: 2, titulo: 'Tradição Arcana', descricao: 'No 2° nível, escolha uma das 8 escolas: Abjuração, Adivinhação, Conjuração, Encantamento, Evocação, Ilusão, Necromancia ou Transmutação. Confere características no 2°, 6°, 10° e 14° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Conjuração (Mago)', descricao: 'Conjurador completo. Atributo: INTELIGÊNCIA. Foco: foco arcano. Magias preparadas diariamente a partir do GRIMÓRIO: mod. Int + nível de mago (mín. 1). Pode conjurar como ritual qualquer magia DO GRIMÓRIO com descritor ritual (não precisa estar preparada). CD = 8 + prof + Int.' },
    { level: 1, titulo: 'Grimório', descricao: 'Você possui um grimório com 6 magias de mago de 1° nível à escolha. A cada nível ganha, +2 magias de mago no grimório. Copiar magia encontrada: 2h e 50 po por nível da magia.' },
    { level: 1, titulo: 'Recuperação Arcana', descricao: '1×/dia, ao terminar um descanso CURTO, escolha espaços de magia gastos a recuperar — soma dos níveis ≤ metade do nível de mago (arredondado para cima); nenhum espaço pode ser de 6° nível ou superior.' },
    { level: 18, titulo: 'Dominar Magia', descricao: 'Escolha 1 magia de mago de 1° nível e 1 de 2° nível do grimório. Conjure-as no nível mínimo SEM gastar espaços (quando preparadas). Pode também usá-las com espaços maiores normalmente.' },
    { level: 20, titulo: 'Assinatura Mágica', descricao: 'Escolha 2 magias de mago de 3° nível do grimório como assinatura. Sempre preparadas e não contam no limite. Cada uma pode ser conjurada 1×/dia como 3° nível SEM gastar espaço, recarregando em descanso curto ou longo. Espaços maiores funcionam normalmente.' },
  ],

  monge: [
    { level: 1, titulo: 'Pontos de Vida (Monge)', descricao: 'Dado de Vida: 1d8 por nível de monge. PV no 1° nível: 8 + mod. Constituição. PV nos níveis seguintes: 1d8 (ou 5) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Monge)', descricao: 'ARMADURAS: nenhuma. ARMAS: simples, espadas curtas. FERRAMENTAS: escolha um tipo de ferramenta de artesão OU um instrumento musical. TESTES DE RESISTÊNCIA: Força, Destreza. PERÍCIAS: escolha 2 dentre Acrobacia, Atletismo, Furtividade, História, Intuição e Religião.' },
    { level: 3, titulo: 'Tradição Monástica', descricao: 'No 3° nível, escolha uma tradição: Caminho da Mão Aberta, Caminho da Sombra ou Caminho dos Quatro Elementos. Confere características no 3°, 6°, 11° e 17° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Defesa sem Armadura', descricao: 'Sem armadura nem escudo, sua CA = 10 + mod. Destreza + mod. Sabedoria.' },
    { level: 1, titulo: 'Artes Marciais', descricao: 'Maestria de golpes desarmados e ARMAS DE MONGE (espadas curtas + armas simples corpo-a-corpo sem propriedade duas mãos ou pesada). Sem armadura/escudo: (1) use Destreza no lugar de Força nessas armas e golpes; (2) dado de dano usa o valor da coluna Artes Marciais (1d4 inicial, escalando); (3) ao usar ação de Ataque com arma de monge/golpe desarmado, pode fazer 1 GOLPE DESARMADO adicional como AÇÃO BÔNUS.' },
    { level: 2, titulo: 'Chi', descricao: 'Recurso que abastece características de chi (ver tabela). Recarrega em descanso curto ou longo (gaste pelo menos 30 min de meditação). CD = 8 + prof + Sabedoria.' },
    { level: 2, titulo: 'Rajada de Golpes', descricao: 'IMEDIATAMENTE após realizar a ação de Ataque, gaste 1 ponto de chi para fazer 2 golpes desarmados como AÇÃO BÔNUS.' },
    { level: 2, titulo: 'Defesa Paciente', descricao: 'Gaste 1 ponto de chi para fazer a ação de Esquivar como AÇÃO BÔNUS.' },
    { level: 2, titulo: 'Passo do Vento', descricao: 'Gaste 1 ponto de chi para fazer Desengajar OU Disparada como AÇÃO BÔNUS. Distância de salto é dobrada nesse turno.' },
    { level: 2, titulo: 'Movimento sem Armadura', descricao: 'Sem armadura/escudo, deslocamento +3m (escala: +4,5m no 6°, +6m no 10°, +7,5m no 14°, +9m no 18°). No 9° nível: pode se mover por superfícies verticais e líquidos sem cair durante o movimento.' },
    { level: 3, titulo: 'Defletir Projéteis', descricao: 'REAÇÃO ao ser atingido por ataque à distância: reduz dano em 1d10 + Des + nível de monge. Se reduzir a 0 e a munição couber em uma mão, você a pega — pode gastar 1 ponto de chi para devolvê-la como ataque à distância (proficiente, conta como arma de monge, alcance 6/18m), como parte da mesma reação.' },
    { level: 4, titulo: 'Queda Lenta', descricao: 'REAÇÃO ao cair: reduz dano de queda em 5 × nível de monge.' },
    { level: 5, titulo: 'Ataque Extra', descricao: 'Pode atacar 2 vezes (em vez de 1) quando realizar a ação de Ataque.' },
    { level: 5, titulo: 'Ataque Atordoante', descricao: 'Ao acertar com ataque corpo-a-corpo COM ARMA, gaste 1 ponto de chi: alvo faz teste de Constituição ou fica ATORDOADO até o fim do seu próximo turno.' },
    { level: 6, titulo: 'Golpes de Chi', descricao: 'Seus golpes desarmados contam como mágicos para superar resistência/imunidade a ataques e danos não-mágicos.' },
    { level: 7, titulo: 'Evasão', descricao: 'Em testes de resistência de Destreza por metade do dano: SUCESSO = 0; FALHA = metade.' },
    { level: 7, titulo: 'Mente Tranquila', descricao: 'AÇÃO: termina 1 efeito em si mesmo que esteja enfeitiçando ou amedrontando.' },
    { level: 10, titulo: 'Pureza Corporal', descricao: 'Imune a doenças e venenos.' },
    { level: 13, titulo: 'Idiomas do Sol e da Lua', descricao: 'Compreende TODOS os idiomas falados; qualquer criatura que entenda algum idioma compreende suas palavras.' },
    { level: 14, titulo: 'Alma de Diamante', descricao: 'Proficiência em TODOS os testes de resistência. Ao FALHAR um teste, gaste 1 ponto de chi para repetir e usar o segundo resultado.' },
    { level: 15, titulo: 'Corpo Atemporal', descricao: 'Não sofre efeitos da velhice e não pode envelhecer magicamente. Ainda pode morrer de velhice. Não precisa de comida ou água.' },
    { level: 18, titulo: 'Corpo Vazio', descricao: 'AÇÃO: gaste 4 pontos de chi: invisível por 1 min E resistência a TODOS os danos exceto energia. OU gaste 8 pontos de chi para conjurar projeção astral SEM componentes materiais (só você).' },
    { level: 20, titulo: 'Auto Aperfeiçoamento', descricao: 'Ao rolar iniciativa sem pontos de chi restantes, recupera 4 pontos.' },
  ],

  paladino: [
    { level: 1, titulo: 'Pontos de Vida (Paladino)', descricao: 'Dado de Vida: 1d10 por nível de paladino. PV no 1° nível: 10 + mod. Constituição. PV nos níveis seguintes: 1d10 (ou 6) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Paladino)', descricao: 'ARMADURAS: todas, escudos. ARMAS: simples, marciais. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Sabedoria, Carisma. PERÍCIAS: escolha 2 dentre Atletismo, Intuição, Intimidação, Medicina, Persuasão e Religião.' },
    { level: 3, titulo: 'Juramento Sagrado', descricao: 'No 3° nível, faça um juramento: Juramento de Devoção, Juramento dos Anciões ou Juramento de Vingança. Confere magias de juramento, opções de Canalizar Divindade, e características no 3°, 7°, 15° e 20° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 3, titulo: 'Canalizar Divindade (Paladino)', descricao: 'No 3° nível, junto com o Juramento Sagrado, ganha Canalizar Divindade. Cada juramento traz 2 opções próprias. CD = sua CD de magia de paladino. 1 uso por descanso curto ou longo.' },
    { level: 1, titulo: 'Sentido Divino', descricao: 'AÇÃO: até o fim do próximo turno, sabe a localização e tipo de qualquer celestial, corruptor ou morto-vivo a até 18m sem cobertura total. Também detecta lugares/objetos consagrados ou conspurcados na área. Usos = 1 + mod. Carisma. Recarrega em descanso longo.' },
    { level: 1, titulo: 'Cura pelas Mãos', descricao: 'Poço de cura = nível × 5 PV (recarrega em descanso longo). AÇÃO: toque uma criatura para restaurar PV à custa do poço. Alternativa: gaste 5 pontos do poço para curar 1 doença ou neutralizar 1 veneno. NÃO afeta mortos-vivos nem constructos.' },
    { level: 2, titulo: 'Estilo de Luta', descricao: 'Adote 1 estilo: Combate com Armas Grandes, Defesa, Duelismo ou Proteção.' },
    { level: 2, titulo: 'Conjuração (Paladino)', descricao: 'Meio-conjurador (espaços de magia a partir do 2° nível). Atributo: CARISMA. Foco: símbolo sagrado. Magias preparadas diariamente: mod. Car + metade do nível de paladino (mín. 1). CD = 8 + prof + Car.' },
    { level: 2, titulo: 'Destruição Divina', descricao: 'Ao acertar com ataque corpo-a-corpo COM ARMA, GASTE 1 ESPAÇO DE MAGIA (de qualquer classe) para causar dano radiante adicional: 2d8 (1° nível) +1d8 por nível extra, até 5d8. +1d8 contra corruptor/morto-vivo.' },
    { level: 3, titulo: 'Saúde Divina', descricao: 'Imune a doenças.' },
    { level: 5, titulo: 'Ataque Extra', descricao: 'Pode atacar 2 vezes (em vez de 1) quando realizar a ação de Ataque.' },
    { level: 6, titulo: 'Aura de Proteção', descricao: 'Você e aliados a até 3m (9m no 18°) recebem bônus em TODOS os testes de resistência igual ao mod. de Carisma (mín. +1). Você deve estar consciente.' },
    { level: 10, titulo: 'Aura de Coragem', descricao: 'Você e aliados a até 3m (9m no 18°) não podem ser AMEDRONTADOS enquanto você estiver consciente.' },
    { level: 11, titulo: 'Destruição Divina Aprimorada', descricao: 'Sempre que acertar com ataque corpo-a-corpo, dano radiante extra de 1d8. Se usar Destruição Divina junto, esse dano se SOMA ao da característica.' },
    { level: 14, titulo: 'Toque Purificador', descricao: 'AÇÃO: termina 1 magia em si mesmo ou em criatura voluntária que você toque. Usos = mod. Carisma (mín. 1). Recarrega em descanso longo.' },
    { level: 18, titulo: 'Aprimoramentos de Aura', descricao: 'O alcance das suas auras (Proteção e Coragem) aumenta para 9 metros.' },
  ],

  patrulheiro: [
    { level: 1, titulo: 'Pontos de Vida (Patrulheiro)', descricao: 'Dado de Vida: 1d10 por nível de patrulheiro. PV no 1° nível: 10 + mod. Constituição. PV nos níveis seguintes: 1d10 (ou 6) + mod. Constituição por nível.' },
    { level: 1, titulo: 'Proficiências (Patrulheiro)', descricao: 'ARMADURAS: leves, médias, escudos. ARMAS: simples, marciais. FERRAMENTAS: nenhuma. TESTES DE RESISTÊNCIA: Força, Destreza. PERÍCIAS: escolha 3 dentre Adestrar Animais, Atletismo, Furtividade, Intuição, Investigação, Natureza, Percepção e Sobrevivência.' },
    { level: 3, titulo: 'Conclave de Patrulheiro', descricao: 'No 3° nível, escolha um conclave: Conclave da Besta, Conclave do Caçador ou Conclave do Rastreador Subterrâneo. Confere características no 3°, 5°, 7°, 11° e 15° nível. (Características da subclasse são anotadas no canvas livre.)' },
    { level: 1, titulo: 'Inimigo Favorito', descricao: 'Escolha 1 tipo: bestas, fadas, humanoide (especifique 2 raças), monstruosidades ou mortos-vivos. +2 de dano em ataques com arma contra ele. Vantagem em Sobrevivência para rastreá-lo e em Inteligência para lembrar dele. Aprenda 1 idioma falado por ele (se houver).' },
    { level: 1, titulo: 'Explorador Natural', descricao: 'Ignora terreno difícil; vantagem em iniciativa; no primeiro turno do combate, vantagem em ataques contra criaturas que ainda não agiram. Viagens >1h: terreno difícil não atrasa o grupo; não se perde (exceto por magia); permanece alerta; sozinho move-se furtivamente em ritmo normal; encontra dobro de comida ao forragear; ao rastrear sabe número, tamanhos e há quanto tempo passaram.' },
    { level: 2, titulo: 'Estilo de Luta', descricao: 'Adote 1: Arquearia, Combate com Duas Armas, Defesa ou Duelismo.' },
    { level: 2, titulo: 'Conjuração (Patrulheiro)', descricao: 'Meio-conjurador (espaços a partir do 2° nível). Atributo: SABEDORIA. Magias conhecidas (não preparadas). CD = 8 + prof + Sab.' },
    { level: 3, titulo: 'Consciência Primitiva', descricao: 'AÇÃO: comunicação simples com bestas via sons e gestos — entende emoção, necessidades e ações para persuadir a não atacar (não em criatura atacada nos últimos 10 min). Após 1 min concentrando, sente se algum inimigo favorito está a até 8 km — quantidade, direção e distância aproximadas.' },
    { level: 6, titulo: 'Inimigo Favorito Maior', descricao: 'Escolha 1 tipo: aberrações, celestiais, constructos, corruptores, dragões, elementais ou gigantes. Ganha benefícios completos contra ele (sem idioma extra). Bônus de dano contra TODOS os inimigos favoritos sobe para +4. Vantagem em testes de resistência contra magias e habilidades usadas por inimigos favoritos maiores.' },
    { level: 8, titulo: 'Pés Rápidos', descricao: 'Pode usar Disparada como AÇÃO BÔNUS no seu turno.' },
    { level: 10, titulo: 'Mimetismo', descricao: 'Ao tentar se esconder, pode optar por NÃO se mover. Criaturas que tentem detectá-lo sofrem –10 em Sab (Percepção) até o início do seu próximo turno. Perde o benefício se mover/cair. Pode continuar imóvel para manter o benefício até ser detectado.' },
    { level: 14, titulo: 'Desaparecer', descricao: 'Pode usar a ação de Esconder como AÇÃO BÔNUS. Não pode ser rastreado por meios não-mágicos, a não ser que decida deixar rastro.' },
    { level: 18, titulo: 'Sentidos Selvagens', descricao: 'Atacar criatura invisível não impõe desvantagem. Ciente da localização de invisíveis a até 9m (se ela não se escondendo de você e você não estiver cego/surdo).' },
    { level: 20, titulo: 'Matador de Inimigos', descricao: '1×/turno, adiciona mod. de Sabedoria a uma jogada de ataque OU de dano (antes ou depois da rolagem, mas antes que efeitos sejam aplicados).' },
  ],
};

// Aliases (tolera variações de nome/normalização)
const CLASS_FEATURES_ALIASES = {
  barbaro: 'barbaro',
  bárbaro: 'barbaro',
  bardo: 'bardo',
  bruxo: 'bruxo',
  warlock: 'bruxo',
  clerigo: 'clerigo',
  clérigo: 'clerigo',
  cleric: 'clerigo',
  druida: 'druida',
  druid: 'druida',
  feiticeiro: 'feiticeiro',
  sorcerer: 'feiticeiro',
  guerreiro: 'guerreiro',
  fighter: 'guerreiro',
  ladino: 'ladino',
  rogue: 'ladino',
  mago: 'mago',
  wizard: 'mago',
  monge: 'monge',
  monk: 'monge',
  paladino: 'paladino',
  paladin: 'paladino',
  patrulheiro: 'patrulheiro',
  ranger: 'patrulheiro',
};

function getClassFeaturesKey(rawClass) {
  if (!rawClass) return null;
  const key = String(rawClass).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  return CLASS_FEATURES_ALIASES[key] || (CLASS_FEATURES[key] ? key : null);
}

function getClassFeaturesUpToLevel(rawClass, level) {
  const key = getClassFeaturesKey(rawClass);
  if (!key) return [];
  const all = CLASS_FEATURES[key] || [];
  const lvl = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
  return all.filter(f => f.level <= lvl);
}

const CLASS_FEATURE_KIND = {
  active: { label: 'Ação', mark: 'active' },
  bonus: { label: 'Bônus', mark: 'bonus' },
  reaction: { label: 'Reação', mark: 'reaction' },
  resource: { label: 'Recurso', mark: 'resource' },
  choice: { label: 'Escolha', mark: 'choice' },
  passive: { label: 'Passiva', mark: '' },
};

function normalizeClassFeatureText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function getClassFeatureId(classKey, feature) {
  const title = normalizeClassFeatureText(feature.titulo)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${classKey}:${feature.level}:${title}`;
}

function barbarianRageUses(level) {
  if (level >= 20) return '∞';
  if (level >= 17) return '6';
  if (level >= 12) return '5';
  if (level >= 6) return '4';
  if (level >= 3) return '3';
  return '2';
}

function classFeatureSuggestedTotal(classKey, feature, currentLevel) {
  const title = normalizeClassFeatureText(feature.titulo);
  if (classKey === 'barbaro' && title === 'furia') return barbarianRageUses(currentLevel);
  if (classKey === 'bardo' && title.includes('inspiracao de bardo')) return 'Car';
  if (classKey === 'clerigo' && title.includes('canalizar divindade')) return currentLevel >= 18 ? '3' : currentLevel >= 6 ? '2' : '1';
  if (classKey === 'druida' && title.includes('forma selvagem')) return currentLevel >= 20 ? '∞' : '2';
  if (classKey === 'feiticeiro' && title.includes('fonte de magia')) return String(currentLevel);
  if (classKey === 'guerreiro' && title.includes('retomar o folego')) return '1';
  if (classKey === 'guerreiro' && title.includes('surto de acao')) return currentLevel >= 17 ? '2' : '1';
  if (classKey === 'guerreiro' && title.includes('indomavel')) return currentLevel >= 17 ? '3' : currentLevel >= 13 ? '2' : '1';
  if (classKey === 'ladino' && title.includes('golpe de sorte')) return '1';
  if (classKey === 'mago' && title.includes('recuperacao arcana')) return '1';
  if (classKey === 'mago' && title.includes('assinatura magica')) return '2';
  if (classKey === 'monge' && title === 'chi') return String(currentLevel);
  if (classKey === 'paladino' && title.includes('canalizar divindade')) return '1';
  if (classKey === 'paladino' && title.includes('sentido divino')) return 'Car + 1';
  if (classKey === 'paladino' && title.includes('cura pelas maos')) return String(currentLevel * 5);
  if (classKey === 'paladino' && title.includes('toque purificador')) return 'Car';
  if (classKey === 'bruxo' && (title.includes('arcana mistica') || title.includes('mestre mistico'))) return '1';
  return '';
}

function getClassFeatureMeta(classKey, feature, currentLevel) {
  const text = normalizeClassFeatureText(`${feature.titulo} ${feature.descricao}`);
  const suggestedTotal = classFeatureSuggestedTotal(classKey, feature, currentLevel);
  let kind = 'passive';
  if (suggestedTotal) kind = 'resource';
  else if (text.includes('reacao')) kind = 'reaction';
  else if (text.includes('acao bonus')) kind = 'bonus';
  else if (text.includes('acao') || text.includes('ao acertar') || text.includes('pode usar') || text.includes('pode atacar')) kind = 'active';
  else if (text.includes('escolha') || text.includes('adote') || text.includes('proficiencias')) kind = 'choice';
  const meta = CLASS_FEATURE_KIND[kind] || CLASS_FEATURE_KIND.passive;
  return { kind, label: meta.label, mark: meta.mark, suggestedTotal };
}

function renderClassFeatureTracker(featureId, suggestedTotal) {
  const usage = (classFeatureUsage && classFeatureUsage[featureId]) || {};
  return `
    <span class="cf-tracker">
      <span>Total</span>
      <input type="text" data-cf-total="${escapeHtml(featureId)}" value="${escapeHtml(usage.total || '')}" placeholder="${escapeHtml(suggestedTotal)}" aria-label="Total disponível">
      <span>Gasto</span>
      <input type="text" data-cf-used="${escapeHtml(featureId)}" value="${escapeHtml(usage.used || '')}" placeholder="0" aria-label="Quantidade gasta">
    </span>
  `;
}

function wireClassFeatureTrackers(container) {
  container.querySelectorAll('.cf-tracker, .cf-tracker input').forEach(el => {
    el.addEventListener('click', e => e.stopPropagation());
  });
  container.querySelectorAll('.cf-tracker input').forEach(input => {
    input.addEventListener('input', e => {
      const id = e.target.dataset.cfTotal || e.target.dataset.cfUsed;
      if (!id) return;
      if (!classFeatureUsage || typeof classFeatureUsage !== 'object' || Array.isArray(classFeatureUsage)) classFeatureUsage = {};
      if (!classFeatureUsage[id]) classFeatureUsage[id] = { total: '', used: '' };
      if (e.target.dataset.cfTotal) classFeatureUsage[id].total = e.target.value;
      if (e.target.dataset.cfUsed) classFeatureUsage[id].used = e.target.value;
      save();
    });
  });
}

// Renderiza a seção dedicada de Habilidades de Classe (read-only, fora do canvas livre)
function renderClassFeatures() {
  const container = document.getElementById('class-features-list');
  if (!container) return;
  const select = document.getElementById('character-class');
  const lvlInp = document.getElementById('character-class-level');
  const rawClass = select ? select.value : '';
  const level = lvlInp ? lvlInp.value : 1;
  const key = getClassFeaturesKey(rawClass);
  const titleEl = document.getElementById('class-features-title');

  if (!key) {
    container.innerHTML = '<div class="cf-empty">Selecione uma classe oficial para ver suas habilidades fixas automaticamente. As escolhas de subclasse (caminhos, domínios, colégios, juramentos, etc.) você anota no canvas livre abaixo.</div>';
    if (titleEl) titleEl.textContent = 'Habilidades de Classe';
    return;
  }
  const features = getClassFeaturesUpToLevel(rawClass, level);
  const currentLevel = Math.max(1, Math.min(20, parseInt(level, 10) || 1));
  if (titleEl) titleEl.textContent = `Habilidades de ${CLASS_LABELS[key] || key} (Nível ${currentLevel})`;
  if (!features.length) {
    container.innerHTML = '<div class="cf-empty">Nenhuma habilidade fixa neste nível.</div>';
    return;
  }
  // Agrupar por nível
  const byLevel = {};
  features.forEach(f => { (byLevel[f.level] = byLevel[f.level] || []).push(f); });
  const levels = Object.keys(byLevel).map(n => parseInt(n)).sort((a, b) => a - b);
  const html = levels.map(lv => {
    const items = byLevel[lv].map(f => {
      const meta = getClassFeatureMeta(key, f, currentLevel);
      const featureId = getClassFeatureId(key, f);
      return `
      <details class="cf-item cf-${meta.kind}">
        <summary>
          <span class="cf-mark ${meta.mark}" aria-hidden="true"></span>
          <span class="cf-name">${escapeHtml(f.titulo)}</span>
          <span class="cf-type-label">${escapeHtml(meta.label)}</span>
          ${meta.suggestedTotal ? renderClassFeatureTracker(featureId, meta.suggestedTotal) : ''}
        </summary>
        <div class="cf-desc">${escapeHtml(f.descricao)}</div>
      </details>
    `;
    }).join('');
    return `
      <div class="cf-level-group">
        <div class="cf-level-badge">Nv ${lv}</div>
        <div class="cf-level-items">${items}</div>
      </div>
    `;
  }).join('');
  container.innerHTML = `
    <div class="cf-legend">
      <span class="cf-legend-item"><span class="cf-mark active" aria-hidden="true"></span>Ação</span>
      <span class="cf-legend-item"><span class="cf-mark bonus" aria-hidden="true"></span>Bônus</span>
      <span class="cf-legend-item"><span class="cf-mark reaction" aria-hidden="true"></span>Reação</span>
      <span class="cf-legend-item"><span class="cf-mark resource" aria-hidden="true"></span>Recurso</span>
      <span class="cf-legend-item"><span class="cf-mark choice" aria-hidden="true"></span>Escolha</span>
    </div>
    ${html}
  `;
  wireClassFeatureTrackers(container);
}

function wireClassFeaturesSync() {
  const select = document.getElementById('character-class');
  const lvlInp = document.getElementById('character-class-level');
  const customName = document.getElementById('character-custom-class');
  if (select) select.addEventListener('change', renderClassFeatures);
  if (lvlInp) lvlInp.addEventListener('input', renderClassFeatures);
  if (customName) customName.addEventListener('input', renderClassFeatures);
  renderClassFeatures();
}

// ========== Auto-preenchimento de campos derivados ==========
// Bônus de proficiência por nível total (assume nível da classe principal)
function profBonusForLevel(lvl) {
  const n = Math.max(1, Math.min(20, parseInt(lvl, 10) || 1));
  if (n >= 17) return 6;
  if (n >= 13) return 5;
  if (n >= 9) return 4;
  if (n >= 5) return 3;
  return 2;
}

// Marca um campo como "auto-preenchido" — visualmente discreto e permite
// sobrescrita: assim que o usuário digitar, removemos a marca e paramos de
// sobrescrever esse campo até que ele apague o valor manualmente.
const AUTO_FLAG_ATTR = 'data-auto';

function setAutoValue(name, value) {
  const el = document.querySelector(`[name="${name}"]`);
  if (!el) return;
  const cur = el.value;
  const isAutoOrEmpty = cur === '' || el.getAttribute(AUTO_FLAG_ATTR) === '1';
  if (!isAutoOrEmpty) return; // usuário sobrescreveu — não toca
  el.value = String(value);
  el.setAttribute(AUTO_FLAG_ATTR, '1');
  el.classList.add('auto-filled');
}

function clearAutoIfManual(el) {
  // Quando o usuário digita, remove a marca de auto (passa a ser manual).
  // Se ele apagar tudo, volta a ser elegível para auto.
  if (el.value === '') {
    el.removeAttribute(AUTO_FLAG_ATTR);
    el.classList.remove('auto-filled');
  } else if (el.getAttribute(AUTO_FLAG_ATTR) === '1') {
    el.removeAttribute(AUTO_FLAG_ATTR);
    el.classList.remove('auto-filled');
  }
}

function autoFillDerivedFields() {
  // 1) Bônus de proficiência ← nível da classe
  const lvlInp = document.getElementById('character-class-level');
  if (lvlInp) {
    setAutoValue('prof_bonus', profBonusForLevel(lvlInp.value));
  }

  // 2) Iniciativa ← modificador de Destreza
  const desInp = document.querySelector('[name="attr_destreza"]');
  if (desInp && desInp.value !== '') {
    const desMod = Math.floor((parseInt(desInp.value, 10) - 10) / 2);
    setAutoValue('iniciativa', desMod);
  }

  // 3) Dado de Vida ← classe + nível
  const select = document.getElementById('character-class');
  const key = getClassFeaturesKey(select ? select.value : '');
  const lvl = Math.max(1, Math.min(20, parseInt(lvlInp ? lvlInp.value : 1, 10) || 1));
  if (key && CLASS_HIT_DIE[key]) {
    setAutoValue('dado_vida', `${lvl}d${CLASS_HIT_DIE[key]}`);
  }

  // 4) PV Máximos — sugestão: HD máx no 1° nível + média a cada nível + (mod Con × nível)
  const conInp = document.querySelector('[name="attr_constituicao"]');
  if (key && CLASS_HIT_DIE[key] && conInp && conInp.value !== '') {
    const die = CLASS_HIT_DIE[key];
    const conMod = Math.floor((parseInt(conInp.value, 10) - 10) / 2);
    const avgPerLevel = Math.floor(die / 2) + 1; // média padrão usada no livro
    const hp = die + conMod + (lvl - 1) * (avgPerLevel + conMod);
    setAutoValue('pv_max', Math.max(1, hp));
  }

  // Recalcula salvaguardas e perícias após mudança de bônus de proficiência
  if (typeof recalcDerived === 'function') recalcDerived();
}

function wireAutoFill() {
  const lvlInp = document.getElementById('character-class-level');
  const desInp = document.querySelector('[name="attr_destreza"]');
  const conInp = document.querySelector('[name="attr_constituicao"]');
  const select = document.getElementById('character-class');
  [lvlInp, desInp, conInp, select].forEach(el => {
    if (el) el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', autoFillDerivedFields);
  });
  // Quando o usuário edita os próprios campos auto, remove a marca
  ['prof_bonus', 'iniciativa', 'dado_vida', 'pv_max'].forEach(name => {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) el.addEventListener('input', () => clearAutoIfManual(el));
  });
  autoFillDerivedFields();
}
