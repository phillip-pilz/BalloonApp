$ScreenWidth = $( window ).width();
$ScreenHeight = $( window ).height();
$lives = $('#livesContainer span').html();
var $colors = ['red', 'blue', 'black', 'green'];
var $matchingColor = '';
var $finished = 'false';
$points = 0;

$( document ).ready(function() {

    setMatchingColor();

    doPoll();

    $('body').on('click', '.balloon', function () {
        killBalloon($( this ), 'kill');

    });


});



function addPoints($amount){
    $points += parseInt($amount);
    $('#Points span').html($points);

    if($points % 10 == 0){
        setMatchingColor();
    }
}

function animateBalloons(){

    $('.balloon').animate({
        bottom: "+=100%",

    }, 7500, function() {
        // Animation complete.

        killBalloon($(this), 'finished');
    });
}

function getLive(){
    return $('#livesContainer span').html();
}

function setLive($amount){
    $('#livesContainer span').html($amount);
}

function removeLive($amount){
    $lives = getLive();
    $lives -= $amount;
    setLive($lives);
}

function killBalloon($element, $command){

    $element.remove();

    $element.removeClass('balloon');


/*
    console.log($element.attr('matchingColor'));
    console.log($matchingColor);*/

    if($element.attr('killed') != 'true'){
        switch($command) {
            case 'kill':
                if($element.attr('matchingColor') == $matchingColor && $element.attr('matchingColor') == $element.attr('class')){
                    addPoints(1);
                }
                break;
            case 'finished':
                if($element.attr('matchingColor') == $matchingColor && $element.attr('matchingColor') == $element.attr('class')){
                    removeLive(1);
                }
                break;
            default:
                removeLive(1);
        }
    }
    
    if(getLive() <= 0){
        $finished = 'true';
        $('#scoredPoints span').html($points);
        gameLost();
    }

    $element.attr('killed', 'true');

}

function doPoll()
{
    // do the request
    createBalloon();

    if($finished == 'false'){

        setTimeout(function(){
            doPoll();
        }, 500);
    }
}

function createBalloon(){

    $color = $colors[Math.floor(Math.random() * 4)];

    $possibleWidth = $ScreenWidth - 100;
    $left = Math.floor(Math.random() * $possibleWidth);


    $('body').append('<div matchingColor="'+$matchingColor+'" class="balloon '+$color+'" style="left:'+$left+'px;"></div>');

    animateBalloons();


}

function setMatchingColor(){

    $matchingColor = $colors[Math.floor(Math.random() * 4)];

    $('#matchingColor span').html($matchingColor);
    $('#matchingColor').addClass($matchingColor);

}

function gameLost(){
    $('#looseMsg').show();
}