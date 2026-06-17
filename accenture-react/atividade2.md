Atividade Prática 2: Monitor de Posts do Blog Corporativo (Accenture Blog)

A equipe de marketing da Accenture precisa de uma tela interna para revisar os títulos dos artigos que serão publicados no blog da empresa. Você deve criar uma SPA que liste esses artigos e permita simular a inserção de um novo título no topo do feed. 

Roteiro de Codificação (O Seu Desafio):

Passo A - Conectando os Motores Reativos (useState):
No topo do seu componente, crie 4 estados:

1. Controle SPA (aba): Inicialize um estado para gerenciar o chaveamento de componentes dinâmicos sem recarregar a página, conforme o Slide 17.
2. Dados da Nuvem (artigos): Inicialize um estado com um array vazio pronto para armazenar a exibição com sucesso consolidado dos dados correspondentes (Data), conforme o Slide 29.
3. Cortina Visual (carregando): Inicialize um estado booleano como true para controlar a fase de Loading e aguardar a resposta do servidor, conforme o Slide 29.
4. Formulário Controlado (novoTitulo): Inicialize uma string vazia para capturar toda tecla digitada e forçar o valor visual do elemento a ler estritamente o valor do nó reativo, conforme o Slide 14.

Passo B - Sincronização Assíncrona com API (useEffect):
Escreva o comportamento do gancho useEffect com uma array de dependências vazia para garantir a execução uma única vez no carregamento, conforme o Slide 27.

* Dentro do bloco try, ligue o estado de carregamento (true) para levantar a cortina visual.
* Dispare uma requisição de rede assíncrona usando fetch e await para a URL pública: [https://jsonplaceholder.typicode.com/posts](https://www.google.com/url?sa=E&source=gmail&q=https://jsonplaceholder.typicode.com/posts), tratando as chamadas por blocos estruturados Try/Catch, conforme o Slide 28.
* Converta a resposta para JSON usando await e envie o array resultante direto para o seu estado de artigos.
* No bloco finally, certifique-se de desligar a cortina de carregamento definindo-a como false em qualquer cenário, conforme o Slide 29.

Passo C - A Regra de Ouro da Imutabilidade (salvarArtigo):
Desenvolva a lógica que captura o envio do formulário.

* Use o método correspondente no evento para impedir o ciclo clássico de reloading completo de rede que destrói a memória, conforme a lógica do Slide 22.
* Crie o objeto novoArtigoObj associando a chave title ao seu estado controlado.
* Atualize o estado de artigos inserindo o novo item. Jamais faça manipulações destrutivas como .push(), pois mantêm a mesma referência física em memória; utilize o operador de espalhamento (...) para criar uma referência inédita e disparar o render, conforme a Regra de Ouro do Slide 12.
* Limpe o estado do input ao final para limpar a interface, conforme o Slide 14.

Passo D - Chaveamento SPA e Renderização de Listas Dinâmicas:
No retorno (JSX) do componente:

1. Monte as duas estruturas condicionais usando operadores lógicos para projetar a View de forma determinística baseada no estado da aba, conforme o Slide 2 e o Slide 17.
2. Crie a tag do formulário. No input, faça o acoplamento vinculando a propriedade value e o gatilho onChange ao seu estado de texto, conforme o Slide 14.
3. No bloco de exibição dos dados, utilize o método .map() para percorrer o array de artigos. Use .slice(0, 5) para renderizar apenas os 5 primeiros itens.
4. É obrigatório injetar a propriedade key com um identificador único em cada item da lista para permitir que o algoritmo heurístico de Diffing mapeie as alterações e evite bugs de estado fantasma, conforme o Slide 5.

---