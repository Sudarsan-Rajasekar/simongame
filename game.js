buttonColors = ["red", "blue", "green", "yellow"]
const randomEmoji = [
  '👏', '🎈', '💖', '🤩', '🥰', 
  '🎉', '✨', '😎', '😍', '🙌', 
  '🔥', '🌟', '💯', '😃', '🎊'
];
gamePattern = []
useClickedPattern = []
level = 1
$('.btn').toggleClass('btn-disabled')


function nextSequence(){
    var randomNumber = Math.ceil(Math.random()*4)-1
    var randomChosenColor = buttonColors[randomNumber]
    return randomChosenColor
    
}

function getRandomEmoji(){
    emojiLength = randomEmoji.length;
    var randomEmojiNumber = Math.ceil(Math.random()*emojiLength)-1
    return randomEmoji[randomEmojiNumber]
}

function playAnimation(color){
    seletectedBtn = $('.'+color)
    // selectedColor = seletectedBtn.css("backgroundColor")
    seletectedBtn.addClass("flash")
    // seletectedBtn.fadeIn(100).fadeOut(100).fadeIn(100);
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
    setTimeout(() => {
        seletectedBtn.removeClass("flash")
    }, 200);
    
}

$(document).keypress(function(event)
{
    useClickedPattern = [] // reset user click 
    gamePattern.push(nextSequence())
    console.log(gamePattern)
    gamePattern.forEach((color, idx) => {
        setTimeout(()=>{playAnimation(color)}, idx*750)
        
    });
    $('h1').text("Level "+level+': Press a Key to Start')
    $('.btn').toggleClass('btn-disabled')
    
})

function sprinkle() {
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }  // start slightly lower
    });
}


function flashWarning(){
    $('body').addClass('game-over');
    setTimeout(()=>{
        $('body').removeClass('game-over');
    },200);
}

$('.btn').click(function()
    {
        selectedColor = $(this).attr('id')
        playAnimation(selectedColor)
        useClickedPattern.push(selectedColor)
        console.log(useClickedPattern)
        console.log(gamePattern)
        
        if (gamePattern.length == useClickedPattern.length)
        {
            if (gamePattern.toString() == useClickedPattern.toString())
            {
                level += 1;
                $('h1').text(getRandomEmoji()+"Level "+level+': Press a Key to Start') // change level 
                sprinkle();
                $('.btn').toggleClass('btn-disabled')
            }
            else{
                flashWarning()
                $('h1').text("Game Over ❌: Press a Key to Start")
                // fresh start
                gamePattern = []
                useClickedPattern = []
                level = 1
                $('.btn').toggleClass('btn-disabled')

            }
    }
    }
)


