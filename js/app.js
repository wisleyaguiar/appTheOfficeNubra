/**
 * Created by wisleyaguiar on 24/11/15.
 */

$(window).load(function() { // makes sure the whole site is loaded
    $('#abertura').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    if(localStorage.gravado){
        $("#home").css({'right':'0'});
    } else {
        $("#cadastro").css({'right':'0'});
    }
    $('header').show();
});

$('#formCadastreSe').submit(function(e){
    e.preventDefault();
    var nome = $('#nome').val();
    var email = $('#email').val();

    $.ajax({
        url:"http://theofficenubra.com.br/page-api/",
        type:'GET',
        dataType: 'json',
        data:{action:'cadastrar',cadnome:nome,cademail:email},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
        },
        error:function(jqXHR,textStatus,errorThrown){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação ' + jqXHR.status + ' ' + errorThrown );
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $("#cadastro").css({'right':'-100%'});
            $('#home').css({'right':'0'});
            localStorage.gravado = 1;
        } else {
            alert(rep.alerta);
        }
    });
});

$('#lojas').click(function(e){
    e.preventDefault();
    $("#home").css({'right':'-100%'});;
    $('#bucarLojas').css({'right':'0'});;

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
        type:'GET',
        dataType: 'json',
        data:{action:'lojas'},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
        },
        error:function(){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação' + jqXHR.status + ' ' + errorThrown);
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $.each(rep.empresas, function(i, val){
                $('#loopLojas').append('<div class="row lojaLink"><div class="col-xs-2"><img src="images/mini-icone-lojas.png" class="img-responsive"></div><div class="col-xs-10"><a onclick="verloja('+ val.id +')">'+ val.nome +' '+val.sala+' <span class="icon_status '+val.status_loja+'"></span></a></div></div>');
            });
        } else {
            alert(rep.alerta);
        }
    });

});

function verloja(valrel) {

    $("#bucarLojas").css({'right':'-100%'});
    $('#infoLojas').css({'right':'0'});

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
        type:'GET',
        dataType: 'json',
        data:{action:'umaloja', idpost:valrel},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
        },
        error:function(){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação ' + jqXHR.status + ' ' + errorThrown);
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $.each(rep.empresas, function(i, val){
                $('.boxInfosLoja').html('<h2>'+ val.nome +' | Sala '+ val.sala +' <span class="icon_status '+val.status_loja+'"></span></h2><p>Horário de Funcionamento: '+ val.horariofun +'</p><p>Especialidades: '+ val.especialidades +'</p> <p>Website: '+ val.website +'</p><p>Contato: '+ val.contato +'</p><p>Telefone: '+ val.telefone +'</p>');
            });
        } else {
            alert(rep.alerta);
        }
    });

}

$('#formBuscaLoja').submit(function(e){
    e.preventDefault();

    var pchave = $('#nomeLoja').val();

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
        type:'GET',
        dataType: 'json',
        data:{action:'buscalojas',pchave:pchave},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
            $('#loopLojas').html("");
        },
        error:function(){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação ' + jqXHR.status + ' ' + errorThrown);
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $('.status_lojas').hide();
            $.each(rep.empresas, function(i, val){
                $('#loopLojas').append('<div class="row lojaLink"><div class="col-xs-2"><img src="images/mini-icone-lojas.png" class="img-responsive"></div><div class="col-xs-10"><a onclick="verloja('+ val.id +')">'+ val.nome +' '+val.sala+' <span class="icon_status '+val.status_loja+'"></span></a></div></div>');
            });
        } else {
            alert(rep.alerta);
        }
    });

});

$('#mapa').click(function(e){
    e.preventDefault();
    $("#home").css({'right':'-100%'});
    $('#mapaLocal').css({'right':'0'});

    initialize();
});

$('#news').click(function(e){
    e.preventDefault();
    $("#home").css({'right':'-100%'});
    $('#newsPage').css({'right':'0'});
    /*alert('Não disponível no momento.');*/

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
        type:'GET',
        dataType: 'json',
        data:{action:'jornais'},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
        },
        error:function(){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação' + jqXHR.status + ' ' + errorThrown);
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $('.linhaNews').html("");
            $.each(rep.jornais, function(i, val){
                $('.linhaNews').append('<div class="col-xs-3"><a href=# onclick=openURL("' + val.arquivo + '") id=news1 class=btNews>'+ val.numero_edicao +'</a></div>');
            });
        } else {
            alert(rep.alerta);
        }
    });

});

$('#savedate').click(function(e){
    e.preventDefault();
    $("#home").css({'right':'-100%'});
    $('#eventosPage').css({'right':'0'});

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
        type:'GET',
        dataType: 'json',
        data:{action:'calendarios'},
        beforeSend: function(){
            $('body').append('<div id="progress">Carregando...</div>');
        },
        success: function(){
            $('#progress').remove();
        },
        error:function(){
            $('#progress').remove();
            alert('Não foi possível atender sua solicitação' + jqXHR.status + ' ' + errorThrown);
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $('.carousel-inner').html("");
            $.each(rep.calendarios, function(i, val){
                if(i===0) {
                    $('.carousel-inner').append('<div class="item active"><img src="' + val.url_imagem + '" alt=""/></div>');
                } else {
                    $('.carousel-inner').append('<div class="item"><img src="' + val.url_imagem + '" alt=""/></div>');
                }
            });
            $( document ).ready(function() {
                $('.carousel').carousel();
            });
        } else {
            alert(rep.alerta);
        }
    });
    
});

$('a.linkVoltar, a.linkVoltarTop').click(function(e){
    e.preventDefault();

    var destino = $(this).attr('href');
    $("#abertura").css({'right':'-100%'});
    $("#cadastro").css({'right':'-100%'});
    $('#home').css({'right':'-100%'});
    $('#bucarLojas').css({'right':'-100%'});
    $('#infoLojas').css({'right':'-100%'});
    $('#mapaLocal').css({'right':'-100%'});
    $('#newsPage').css({'right':'-100%'});
    $('#eventosPage').css({'right':'-100%'});
    $(destino).css({'right':'0'});
});

function openURL(urlString){
    myURL = encodeURI(urlString);
    window.open(myURL, '_system','location=no');
}