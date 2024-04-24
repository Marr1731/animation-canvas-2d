const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
    constructor(x, y, radius, color, text, speed) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.speed = speed;
        this.dx = 3 * this.speed;
        this.dy = 3 * this.speed;
    }

    draw(context) {
        context.strokeStyle = this.color;
        context.textAlign = "center";
        context.textBaseLine = "middle";
        context.font = "15px Arial";

        context.fillText(this.text, this.posX, this.posY);
        context.beginPath();
        context.lineWidth = 2;
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
    }

    update(context) {
        this.draw(context);

        if (this.posX + this.radius >= window_width || this.posX - this.radius <= 0) {
            // Invertimos la dirección en X si el borde del círculo toca el borde de la ventana
            this.dx = -this.dx;
            // Ajustamos la posición para que el círculo no se atore en los bordes
            if (this.posX + this.radius >= window_width) {
                this.posX = window_width - this.radius;
            } else {
                this.posX = this.radius;
            }
        }

        if (this.posY - this.radius <= 0 || this.posY + this.radius >= window_height) {
            // Invertimos la dirección en Y si el borde del círculo toca el borde de la ventana
            this.dy = -this.dy;
            // Ajustamos la posición para que el círculo no se atore en los bordes
            if (this.posY - this.radius <= 0) {
                this.posY = this.radius;
            } else {
                this.posY = window_height - this.radius;
            }
        }

        // Actualizamos la posición del círculo según la velocidad
        this.posX += this.dx;
        this.posY += this.dy;
    }
}

let arrayCircle = [];

for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * window_width;
    let randomY = Math.random() * window_height;
    let randomRadius = Math.floor(Math.random() * 100 + 30);

    let micirculo = new Circle(randomX, randomY, randomRadius, "blue", i + 1, 3);
    arrayCircle.push(micirculo);
    micirculo.draw(ctx);
}

let updateCircle = function() {
    requestAnimationFrame(updateCircle);
    ctx.clearRect(0, 0, window_width, window_height);
    
    arrayCircle.forEach(circle => {
        circle.update(ctx);
    });
}

updateCircle();
