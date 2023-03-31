var jet = document.getElementById("jet");


window.addEventListener("keydown", (e) => {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if(e.key == "ArrowLeft" && left > 0){
        jet.style.left = left - 10 + "px";
    }
    // 460 = Board Width - Jett Width
    else if(e.key == "ArrowRight" && left <= 460){
        jet.style.left = left + 10 + "px";
    }

    if ((e.key == "ArrowUp"  || e.keyCode == 32)) {
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);

        var movebullet = setInterval(() => {

            var rocks = document.getElementsByClassName("rocks");

            for(var i = 0; i < rocks.length; i++){
                var rock = rocks[i];

                var rockbound = rock.getBoundingClientRect();
                var bulletbound = bullet.getBoundingClientRect();

                // Conditions destroying rocks
                if(
                    bulletbound.left >= rockbound.left &&
                    bulletbound.right <= rockbound.right &&
                    bulletbound.top <= rockbound.top &&
                    bulletbound.bottom <= rockbound.bottom
                ){
                    rock.parentElement.removeChild(rock) // mengecek apakah alien dan peluru terkena bersamaan
                    // Score
                    document.getElementById("points").innerHTML = parseInt(document.getElementById("points").innerHTML) +1;
                }
            }

            var bulletbottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
            
            // Stop overflowing bullet
            if(bulletbottom >= 500){
                clearInterval(movebullet);
            }
            

            bullet.style.left = left + "px";
            bullet.style.bottom = bulletbottom + 3 + "px";
        });
    }
});

var generaterocks = setInterval(()=>{
    var rock = document.createElement("div");
    rock.classList.add("rocks");
    // Placing rocks in random places
    var rockleft = parseInt(
        window.getComputedStyle(rock).getPropertyValue("left")
    );
    // Generate random pixel from 0 to 450
    rock.style.left = Math.floor(Math.random() * 450) + "px";

    board.appendChild(rock);
}, 1500);

var moverocks = setInterval(() => {
    var rocks = document.getElementsByClassName("rocks");

    if(rocks != undefined){
        for(var i = 0; i < rocks.length; i++){
            var rock = rocks[i]; // Mengambil Setiap Rocks
            var rocktop = parseInt(
                window.getComputedStyle(rock).getPropertyValue("top")
            );
            
            // 475 = boardHeight + rock innerHeight + 25
            if(rocktop >= 475){
                alert("Game Over");
                clearInterval(moverocks);
                window.location.reload();
            }


            rock.style.top = rocktop + 20 + "px";
        }
    }
}, 450);