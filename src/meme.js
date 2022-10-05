

const happyMemeArray = [
    {
        name: "Wall Street Bets",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqOBdQojktUASuWZyuFK8klyfaXk5MSjlPCA&usqp=CAU"
    },
    {
        name: "Jonah Hill",
        image: "https://www.happierhuman.com/wp-content/uploads/2022/04/happy-memes-winkgo-oh-my-god.jpg"
    },
    {
        name: "Opray",
        image: "https://imgflip.com/s/meme/Oprah-You-Get-A.jpg"
    },
    {
        name: "Obama",
        image: "https://i.imgflip.com/6vq4y2.jpg"
    }
]

let displayHappyMemes;


//sad
const sadMemeArray = [
    {
        name: "Toy Story",
        image: "https://imgflip.com/i/6vq14h"
    },
    {
        name: "Tom the Cat",
        image: "https://i.imgflip.com/6vq48z.jpg"
    },
    {
        name: "Sad frog",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0cLX0UgP3yyQYBVUT18fMl45udyGx9ICivF3EbCPqxA&s"
    },
    {
        name: "Spongebob",
        image: "https://pbs.twimg.com/media/EDJP9uVU0AArmSL?format=jpg&name=small"
    }
]

let displaySadMemes;

function generateMeme(didIMakeMoney) {
    displayHappyMemes = happyMemeArray[Math.floor(Math.random() * 3)].image;
    displaySadMemes = sadMemeArray[Math.floor(Math.random() * 3)].image;

    if (didIMakeMoney === "profit") {
        memeImage.src = displayHappyMemes;
    } else if (didIMakeMoney === "loss") {
        memeImage.src = displaySadMemes;
    }
}
