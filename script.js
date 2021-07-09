$(document).ready(function () {

    var cella = $('.cella');            //uso una variablime come cella cliccata, per avere traccia del this nella funzione
    var turnoplayer = true;
    var cerchio = ["Cerchio!"];          //mi salvo il nome del giocatore in posizione 0 dell'array
    var croce = ["Croce!"];              //come sopra
    var indice = 0;
    var turniPC = 1;

//______________________________funzione per controllare chi vince_____________________________

    function areuwinning(nome,j,geografia) {
        var areuwinning = false
        switch (geografia) {
            case "riga":
                for (j = 2; j <= 8; j=j+3) {
                     if ((nome[j-1]==true)&&(nome[j]==true)&&(nome[j+1]==true))
                         areuwinning = true;
                }
                break;

            case "colonna":
                 for (j = 4; j <= 6; j++) {
                     if ((nome[j-3]==true)&&(nome[j]==true)&&(nome[j+3]==true))
                         areuwinning = true;
                 }
                 break;

            case "diagonale":
                     if ((nome[1]==true)&&(nome[5]==true)&&(nome[9]==true))
                         areuwinning = true;
                     if ((nome[3]==true)&&(nome[5]==true)&&(nome[7]==true))                                
                         areuwinning = true;
                 break;                   
        };
        return areuwinning;
    };

//______________________________funzione per stampare chi vince______________________________

    function printwin(nome){
         $('.cella').addClass('locked');
         $('#result').children('span').html(nome[0]);
         $('#result').fadeIn(250);
         $('#restart').click(function(){
             location.reload();
         });
    };

//________________________________funzione per scrivere la X________________________________

    function scrivox(numero){
    $('.cella').each(function(index){
        if (index == (numero-1)){
            $(this).append("<i class='fas fa-9x'></i>");
            $(this).children("i").addClass("fa-times");
        };
    });
    };
     
//_______________________________________inizio il main_______________________________________

    cella.click(function() {        
            if (!($(this).children().hasClass("fa-circle")) && !($(this).children().hasClass("fa-times"))) {   //controllo che la cella sia vuota                    
                $(this).append("<i class='far fa-9x'></i>");               //aggiungo la classe per la dimensione
                $(this).children("i").addClass("fa-circle");               //aggiungo il cerchio in una posizione specifica                
            }
                                                                               
            $(this).each(function(index) {
                indice = index + 1;
                if ($(this).children().hasClass("fa-circle")) {               //controllo se dove sono i cerchi                                        
                    cerchio[indice]=true;                                     //mi salvo le posizioni di dove sono i cerchi
                    if (areuwinning(cerchio,indice,"riga"))
                        printwin(cerchio);

                    if (areuwinning(cerchio,indice,"colonna"))
                        printwin(cerchio);

                    if (areuwinning(cerchio,indice,"diagonale"))
                        printwin(cerchio);
                    
                }
                else if ($(this).children().hasClass("fa-times")) {         //controllo dove ci sono le croci
                    croce[indice]=true;                                     //mi salvo le posizioni dove sono le croci
                    if (areuwinning(croce,indice,"riga"))
                        printwin(croce);

                    if (areuwinning(croce,indice,"colonna"))
                        printwin(croce);

                    if (areuwinning(croce,indice,"diagonale"))
                        printwin(croce);                    
                };                
            });
            
//______________________________se non vince nessuno vado avanti___________________________            

            switch (turniPC) {
                case 1:
                    if (cerchio[5]=true) {
                        do {
                            var numero = Math.floor(Math.random()*10);
                        } while ((numero == 0)||(numero == 5));
                        croce[numero] = true;
                        scrivox(numero);
                    }
                    turniPC ++;
                    break;
            };
        });
    });