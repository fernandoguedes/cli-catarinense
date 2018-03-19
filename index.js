const kapti = require('kapti');
const Table = require('cli-table2');
const url = 'http://globoesporte.globo.com/sc/futebol/campeonato-catarinense/';

const getRanking = async () => {
  try {
    const $ = await kapti.getStaticPage(url);
    const ranking = mountRankingTable($);

    console.log(ranking);
  } catch (error) {
    console.log(error);
  }
};

const mountRankingTable = ($) => {
  let table = new Table({
    head: ['Pos', 'Time', 'Pontos', 'Jogos', 'Vitórias', 'Derrotas',
      'Empates', 'Gols Pró', 'Gols Contra', 'Saldo de Gols']
  });

  $('.tabela .tabela-times tbody tr').each((i, elem) => {
    let position = $(elem).find('.tabela-times-posicao').text();
    let team = $(elem).find('.tabela-times-time-nome').text();
    table.push([position, team]);
  });

  let columns = $('.tabela .tabela-pontos tbody tr');

  for (let i = 0; i < columns.length; i++) {
    let row = $(columns[i]).html();
    row = row.replace(/<td>/g, '').split('</td>');
    row[0] = row[0].replace(/<\/?[^>]+(>|$)/g, '');


    table[i].push(row[0]);
    table[i].push(row[1]);
    table[i].push(row[2]);
    table[i].push(row[3]);
    table[i].push(row[4]);
    table[i].push(row[5]);
    table[i].push(row[6]);
    table[i].push(row[7]);
  }

  return table.toString();
};

module.exports = { getRanking };
