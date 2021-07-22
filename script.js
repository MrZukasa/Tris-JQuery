$(document).ready(function () {

    var cella = $('.cella');            //uso una variablime come cella cliccata, per avere traccia del this nella funzione
    var vittoria = false;
    var cerchio = ["Cerchio!"];          //mi salvo il nome del giocatore in posizione 0 dell'array
    var croce = ["Croce!"];              //come sopra
    var indice = 0;
    var turniPC = 1;

//______________________________funzione per controllare chi vince_____________________________

    function areuwinning(nome,j,geografia) {
        var areuwinning = false;
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

//_________________________________controllo le coppie in diagonale_________________________________
    function checkdiag(){
        var checkdiag = 0;
        var adiacente = 0;
        if ((cerchio[1]==true)&&(cerchio[5]==true)){
            if (croce[9]!=true){
                checkdiag=9;
            }
            else {
                do {
                    adiacente = Math.floor(Math.random()*10);
                } while ((adiacente != 8)&&(adiacente != 6));
                checkdiag = adiacente;
            }
        }
        if ((cerchio[3]==true)&&(cerchio[5]==true)){
            if (croce[7]!=true){
                checkdiag=7;
            }
            else {
                do {
                    adiacente = Math.floor(Math.random()*10);
                } while ((adiacente != 4)&&(adiacente != 8));
                checkdiag = adiacente;
            }
        }
        if ((cerchio[9]==true)&&(cerchio[5]==true)){
            if (croce[1]!=true){
                checkdiag=1;
            }
            else {
                do {
                    adiacente = Math.floor(Math.random()*10);
                } while ((adiacente != 2)&&(adiacente != 4));
                checkdiag = adiacente;
            }
        }
        if ((cerchio[7]==true)&&(cerchio[5]==true)){
            if (croce[3]!=true){
                checkdiag=3;
            }
            else {
                do {
                    adiacente = Math.floor(Math.random()*10);
                } while ((adiacente != 2)&&(adiacente != 6));
                checkdiag = adiacente;
            }
        }
        return checkdiag;                         
    };
    
//_____________________________funzione che gestisce la prima contromossa____________________________
    function counteratack() {
        var counteratack = 0;
        var corner = 0;
        for (let k = 1; k <= 7; k=k+3) {                              /*scorro le righe per guardare*/
            if ((cerchio[k]==true)&&(cerchio[k+1]==true)) {           /*nelle prime due celle di ogni riga*/
                if ((cerchio[k+2]==null)&&(croce[k+2]==null)) {       /*controllo che la cella di risposta sia libera*/
                    croce[k+2]=true;
                    counteratack=k+2;
                    return counteratack;
                }
                else {                                                /*altrimenti randomizzo in uno dei due angoli*/
                    do {
                        corner = Math.floor(Math.random()*10);
                    } while ((corner != 3)&&(corner != 9));
                }
                    croce[corner]=true;
                    counteratack=corner;
                    return counteratack;
            };

            if ((cerchio[k+1]==true)&&(cerchio[k+2]==true)) {           /*guardo nelle ultime due celle di ogni riga*/
                if ((cerchio[k]==null)&&(croce[k]==null)) {             /*controllo che la cella di risposta sia libera*/
                    croce[k]=true;
                    counteratack=k;
                    return counteratack;
                }
                else {                                                   /*altrimenti randomizzo in uno dei due angoli*/
                    do {
                        corner = Math.floor(Math.random()*10);
                    } while ((corner != 1)&&(corner != 7));
                    croce[corner]=true;
                    counteratack=corner;
                    return counteratack;
                }
            };
        };
//____________________________colonne________________________

        for (let i = 1; i <= 3; i++) {                                   /*scorro le colonne per guardare*/
            if ((cerchio[i]==true)&&(cerchio[i+3]==true)) {              /*nelle prime due celle di ogni colonna*/   
                if ((cerchio[i+6]==null)&&(croce[i+6]==null)) {          /*controllo che la cella di risposta sia libera*/
                    croce[i+6]=true;
                    counteratack=i+6;
                    return counteratack;
                }
                else {                                                    /*altrimenti randomizzo in uno dei due angoli*/  
                    do {
                        corner = Math.floor(Math.random()*10);
                    } while ((corner != 7)&&(corner != 9));
                    croce[corner]=true;
                    counteratack=corner;
                    return counteratack;
                }
            };
            if ((cerchio[i+6]==true)&&(cerchio[i+3]==true)) {             /*controllo nelle due ultime celle di ogni colonna*/
                if ((cerchio[i]==null)&&(croce[i]==null)) {               /*controllo che la cella di risposta sia libera*/
                    croce[i]=true;                                        
                    counteratack=i;
                    return counteratack;
                }
                else {                                                    /*altrimenti randomizzo in uno dei due angoli*/
                    do {
                        corner = Math.floor(Math.random()*10);
                    } while ((corner != 1)&&(corner != 3));
                    croce[corner]=true;
                    counteratack=corner;
                    return counteratack;
                }
            };
        };
//_________________________________diagonale______________________________
        corner = checkdiag();                                                    /*controllo tutte le diagonali*/
        if (corner !=0 ) {
            croce[corner]=true
            counteratack=corner;
        }
        return counteratack;
    };

//_______________________________verifico se una cella è occupata_____________________________
    function busy(index) {
        var busy = false
        if ((croce[index]==true)||(cerchio[index]==true)){
            busy = true;
        };
        return busy;
    };

//__________________________________cerco di completare il tris____________________________________
    function almost() {
        var almost;
        for (var i = 1; i <= 9; i++) {
            if (i!=5){
                if ((croce[5]==true)&&(croce[i]==true)){
                    switch (i) {
                        case 3:
                            almost=7;
                            break;
                        case 7:
                            almost=3;
                            break;
                        case 1:
                            almost=9;
                            break;
                        case 9:
                            almost=1;
                            break;
                    }
                    return almost;
                };
            }
        };
    };

//___________________________________controllo chi vince_____________________________________
    function checkwin() {
        $('.cella').each(function(index) {
            indice = index + 1;
            if ($(this).children().hasClass("fa-circle")) {               //controllo se dove sono i cerchi                                        
                cerchio[indice]=true;                                     //mi salvo le posizioni di dove sono i cerchi
                if (areuwinning(cerchio,indice,"riga")){
                    vittoria=true;
                    printwin(cerchio);
                }

                if (areuwinning(cerchio,indice,"colonna")){
                    vittoria=true;
                    printwin(cerchio);
                }

                if (areuwinning(cerchio,indice,"diagonale")){
                    vittoria=true;
                    printwin(cerchio);
                }
            }
            else if ($(this).children().hasClass("fa-times")) {         //controllo dove ci sono le croci
                croce[indice]=true;                                     //mi salvo le posizioni dove sono le croci
                if (areuwinning(croce,indice,"riga")) {
                    vittoria=true;
                    printwin(croce);
                }

                if (areuwinning(croce,indice,"colonna")) {
                    vittoria=true;
                    printwin(croce);
                }                        

                if (areuwinning(croce,indice,"diagonale")) {
                    vittoria=true;
                    printwin(croce);
                }                        
            };                
        });
    };

//________________________________controllo che non ci sia una strategia__________________________________
    function salto(array) {
        var salto = 0;
        if ((array[1])&&(array[3])){
            salto=2;
            return salto;
        }
        else if ((array[1])&&(array[7])) {
            salto=4;
            return salto;
        }
    }

    
//_______________________________________inizio il main_______________________________________

    cella.click(function() {
            if (!($(this).children().hasClass("fa-circle")) && !($(this).children().hasClass("fa-times"))) {   //controllo che la cella sia vuota                    
                $(this).append("<i class='far fa-9x'></i>");               //aggiungo la classe per la dimensione
                $(this).children("i").addClass("fa-circle");               //aggiungo il cerchio in una posizione specifica            
                                                                               
            checkwin();            

//______________________________controllo che mossa viene fatta____________________________
   
    if (vittoria==false) {
            switch (turniPC) {
                case 1:
                    if (cerchio[5]==true) {                                    /*randomizzo il primo tiro*/
                        do {                                                   /*se la posizione centrale è già occupata*/ 
                            var numero = Math.floor(Math.random()*10);
                        } while ((numero == 0)||(numero == 5));
                        croce[numero] = true;
                        scrivox(numero);
                    }
                    else {
                        croce[5]=true;                               /*altrimenti occupo la posizione centrale*/
                        scrivox(5);
                    }
                    turniPC ++;
                    checkwin();
                    break;
                case 2:
                    var mossa = counteratack();                      /*utilizzo un primo set di mosse per controbattere*/                
                    if (mossa == 0) {
                        mossa = salto(cerchio);                        /*guardo che non stia già vincendo*/
                        if (mossa==0){
                            do {
                                mossa=Math.floor(Math.random()*10);                            
                            } while (((mossa != 1)&&(mossa != 3)&&(mossa != 7)&&(mossa != 9))||(mossa == 0)||(busy(mossa)));                        
                        }
                        scrivox(mossa);
                        turniPC ++;
                    }
                    else {
                        scrivox(mossa);
                        turniPC ++;
                    }
                    checkwin();
                    break;
                case 3:                    
                    mossa = almost();                    
                    if ((mossa == 0)||(busy(mossa))) {
                        do {
                            //mossa=Math.floor(Math.random()*10);
                            mossa = counteratack();
                        } while ((busy(mossa)==false));
                        scrivox(mossa);
                        turniPC ++;
                    }
                    else {
                        scrivox(mossa);
                        turniPC ++;
                    }
                    checkwin();
                    break;
                /*case 4:
                    mossa = counteratack();
                    scrivox(mossa);
                    turniPC++;
                    break;
                case 5:
                    mossa = counteratack();
                    scrivox(mossa);
                    turniPC++;
                    break;*/

            };
    }}});
    });