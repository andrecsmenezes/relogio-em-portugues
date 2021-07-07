/*
|--------------------------------------------------------------------------
| Relógio em português
|--------------------------------------------------------------------------
|
| Classe geradora de horario por extenso em português.
|
| @versao  1.0
| @desde   1.0
| @autor   André C. S. Menezes
| @contato andrecsmenezes@gmail.com
| @licença MIT
|
*/
const relogio = {
    
    /*
    |--------------------------------------------------------------------------
    | Objeto contendo os valores por extenso
    |--------------------------------------------------------------------------
    |
    | Levando em consideração que o relógio tem um número limitado de valores
    | instanciamos somente os valores possíveis para o relógio.
    |
    | Números acima de 20 são separados em dezenas e unidades antes de gerar
    | o valor por extenso e por isso não precisam ser instanciados no objeto.
    |
    */
    numero: {
         0: 'zero',     1: 'um',         2: 'dois',
         3: 'três',     4: 'quatro',     5: 'cinco',
         6: 'seis',     7: 'sete',       8: 'oito',
         9: 'nove',    10: 'dez',       11: 'onze',
        12: 'doze',    13: 'treze',     14: 'quatorze',
        15: 'quinze',  16: 'desesseis', 17: 'desessete',
        18: 'dezoito', 19: 'dezenove',  20: 'vinte',
        30: 'trinta',  40: 'quarenta',  50: 'cinquenta'
    },

    /*
    |--------------------------------------------------------------------------
    | Array contendo as minutagens com contagem invertida
    |--------------------------------------------------------------------------
    |
    | Minutos como "cinco para as duas"
    |
    */
    paraAs: [ 40, 45, 50, 55 ],

    /*
    |--------------------------------------------------------------------------
    | Objeto contendo os valores do horário atual
    |--------------------------------------------------------------------------
    |
    | Separamos em um objeto os dados do horário para futuras consultas
    |
    | @retornar <object> contendo os valores do horário atual
    |
    */
    valores: () => {
        const _data = new Date

        return {
            hora    : _data.getHours(),
            minuto  : _data.getMinutes(),
            segundo : _data.getSeconds()
        }
    },

    /*
    |--------------------------------------------------------------------------
    | Expressão de hora
    |--------------------------------------------------------------------------
    |
    | É comum em português usarmos as horas 0 e 12 como divisão do dia ou noite
    | ou seja: meio dia e meia noite. Também na língua portuguesa as horas 1 e 2
    | são femininas.
    |
    | Para uma correta amostragem, validamos essas informações para gerar por
    | extenso a hora.
    |
    | @parametro hora <int> hora a ser gerada por extenso
    | @retornar  <string>   contendo os valores do horário atual
    |
    */
    gerarHora: hora => {
        let expressao = ''

        if( hora === 0 )
            expressao = 'meia noite'
        else if( hora === 12 )
            expressao = 'meio dia'
        else if( hora === 1 )
            expressao = 'uma'
        else if( hora === 2 )
            expressao = 'duas'
        else
            expressao = relogio.numero[ hora ]

        return expressao
    },

    /*
    |--------------------------------------------------------------------------
    | Expressão de minuto
    |--------------------------------------------------------------------------
    |
    | Para uma correta amostragem de minutos precisamos validar se pertencem a
    | um grupo que tenha somente uma palavra ou mais.
    |
    | @parametro minuto <int> minuto a ser gerada por extenso
    | @retornar  <string>     contendo os valores da minutagem atual
    |
    */
    gerarMinuto: minuto => {
        let expressao = ''

        if( minuto < 21 || minuto % 10 === 0 )
        {
            expressao += relogio.numero[ minuto ]
        }
        else
        {
            expressao += relogio.numero[ Math.floor( minuto / 10 ) * 10 ]
            expressao += ' e '
            expressao += relogio.numero[ minuto % 10 ]
        }

        return expressao
    },

    /*
    |--------------------------------------------------------------------------
    | Gerador da expressão da hora
    |--------------------------------------------------------------------------
    |
    | Na língua portuguesa temos, em alguns casos, algumas expressões que
    | precisam ser verificadas antes de gerar o horário por extenso.
    | 
    | 1) Meio dia e meia noite
    | 2) 20, 15, 10, 5 para as...
    | 3) Horário normal
    |
    | Após a validação de qual caso pertence geramos a expressão
    |
    | @retornar <string> contendo a expressão do horário
    |
    */
    gerar: () => {
        const valores = relogio.valores() 
        
        let expressao

        if( valores.minuto === 30 )
            expressao = relogio.gerarHora( valores.hora ) + ' e meia'
        else if( relogio.paraAs.includes( valores.minuto ) )
            expressao = relogio.gerarMinuto( 60 - valores.minuto ) + ' para as ' + relogio.gerarHora( valores.hora + 1 === 24 ? 0 : valores.hora + 1 )
        else
            expressao = relogio.gerarHora( valores.hora ) + ' e ' + relogio.gerarMinuto( valores.minuto )
        
        return expressao
    },

    /*
    |--------------------------------------------------------------------------
    | Disparador do horário por extenso
    |--------------------------------------------------------------------------
    |
    | Aqui é possível configurar como parecer melhor a saída do horário.
    | Como amostra foi colocado um contador que revalida a cada segundo e mostra
    | no console o horário atual
    |
    */
    iniciar: () => {
        setInterval( () => {
            console.clear()
            console.log( relogio.gerar() )
        }, 1000)
    }
}
