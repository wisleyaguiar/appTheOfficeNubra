/**
 * Created by wisleyaguiar on 24/11/15.
 */

/*$("#abertura").show();
$("#cadastro").hide();
$('#home').hide();
$('#bucarLojas').hide();
$('#infoLojas').hide();
$('#mapaLocal').hide();
$('#newsPage').hide();
$('#eventosPage').hide();*/

$(window).load(function() { // makes sure the whole site is loaded
    $('#abertura').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $("#cadastro").animate({right: '0'},1000);
});

$('#formCadastreSe').submit(function(e){
    e.preventDefault();
    var nome = $('#nome').val();
    var email = $('#email').val();

    $.ajax({
        url:'http://theofficenubra.com.br/page-api/',
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
            $("#cadastro").animate({right: '-100%'}, 1000);
            $('#home').animate({right: '0'}, 1000);
        } else {
            alert(rep.alerta);
        }
    });
});

$('#lojas').click(function(e){
    e.preventDefault();
    $("#home").animate({right: '-100%'},1000);
    $('#bucarLojas').animate({right: '0'},1000);

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
            alert('Não foi possível atender sua solicitação');
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $.each(rep.empresas, function(i, val){
                $('#loopLojas').append('<div class="row lojaLink"><div class="col-xs-2"><img src="images/mini-icone-lojas2.png" class="img-responsive"></div><div class="col-xs-10"><a onclick="verloja('+ val.id +')">'+ val.nome +' '+val.sala+'</a></div></div>');
            });
        } else {
            alert(rep.alerta);
        }
    });

});

function verloja(valrel) {

    $("#bucarLojas").animate({right: '-100%'},1000);
    $('#infoLojas').animate({right: '0'},1000);

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
            alert('Não foi possível atender sua solicitação');
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $.each(rep.empresas, function(i, val){
                $('.boxInfosLoja').html('<h2>'+ val.nome +' | Sala '+ val.sala +'</h2><p>Horário de Funcionamento: '+ val.horariofun +'</p><p>Especialidades: '+ val.especialidades +'</p> <p>Website: '+ val.website +'</p><p>Contato: '+ val.contato +'</p><p>Telefone: '+ val.telefone +'</p>');
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
            alert('Não foi possível atender sua solicitação');
        }
    }).done(function(rep){
        if(rep.status = 'ok')
        {
            $.each(rep.empresas, function(i, val){
                $('#loopLojas').append('<div class="row lojaLink"><div class="col-xs-2"><img src="images/mini-icone-lojas2.png" class="img-responsive"></div><div class="col-xs-10"><a onclick="verloja('+ val.id +')">'+ val.nome +' '+val.sala+'</a></div></div>');
            });
        } else {
            alert(rep.alerta);
        }
    });

});

$('#mapa').click(function(e){
    e.preventDefault();
    $("#home").animate({right: '-100%'},1000);
    $('#mapaLocal').animate({right: '0'},1000);
});

$('#news').click(function(e){
    e.preventDefault();
    /*$("#home").delay(350).fadeOut('slow');
    $('#newsPage').fadeIn('slow');*/
    alert('Não disponível no momento.');
});

$('#savedate').click(function(e){
    e.preventDefault();
    $("#home").animate({right: '-100%'},1000);
    $('#eventosPage').animate({right: '0'},1000);
});

$('a.linkVoltar').click(function(e){
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
    $(destino).animate({right: '0'},1000);
});