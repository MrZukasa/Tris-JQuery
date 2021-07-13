var array = [];

    for(var i=0;i<=9;i++) {
        var numero = Math.floor(Math.random()*101);
        array.push(numero);
        for(var j=0;j<=i;j++) {
            if((array[i]==array[j])&&(i!=j)){
                array.splice(i,0,Math.floor(Math.random()*101));
            }
        }
        $('.lista').append('<span id="randomNumber">'+ array[i] +'</span>');
        if (((i % 2) != 0)) {
            $('.lista').append('<br>');
        }
    }

    $(document).on('click','button', function() {
        for(var i=0;i<=9;i++) {
            for(var j=1;j<=9;j++) {
                if (array[j-1]>array[j]){
                    var temp = array[j];
                    array[j]=array[j-1];
                    array[j-1]=temp;
                }                            
            }            
        }
        $('.result').empty();
        for(var i=0;i<=9;i++) {
            $('.result').append('<span id="sortednumber">'+ array[i] +'</span>');
            if (((i % 2) != 0)) {
                $('.result').append('<br>');
            }            
        }
        $('.esito').fadeIn(1500);
        $('.esito').fadeOut(1500);  
    });
