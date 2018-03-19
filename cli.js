#!/usr/bin/env node

const program = require('commander');
const catarinense = require('./index');

program
  .version('1.0.0')
  .description('Classificação do Campeonato Catarinense');

program
  .description('Visualização classificação do Campeonato Catarinense')
  .command('classificacao')
  .alias('c')
  .action(() => {
    catarinense.getRanking();
  });

program.parse(process.argv);
