var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(ctx);
var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
//color principal de cada unas de las periculas
gradient.addColorStop(0, 'red');
gradient.addColorStop(0.5, 'green');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';
//clase particula
var Particle = /** @class */ (function () {
    function Particle(effect) {
        this.effect = effect;
        this.radius = Math.floor(Math.random() * 10 + 1);
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
        this.vx = Math.random() * 1 - 0.5;
        this.vy = Math.random() * 1 - 0.5;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95;
    }
    //dibujo particula
    Particle.prototype.draw = function (context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        //context.stroke();
    };
    //actualizo la pos
    Particle.prototype.update = function () {
        // Eliminamos la condición de mouse.pressed
        var dx = this.x - this.effect.mouse.x;
        var dy = this.y - this.effect.mouse.y;
        var distance = Math.hypot(dx, dy);
        var force = this.effect.mouse.radius / distance;
        if (distance < this.effect.mouse.radius) {
            var angle = Math.atan2(dy, dx);
            this.pushX += Math.cos(angle) * force;
            this.pushY += Math.sin(angle) * force;
        }
        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy;
        if (this.x < this.radius) {
            this.x = this.radius;
            this.vx *= -1;
        }
        else if (this.x > this.effect.width - this.radius) {
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if (this.y < this.radius) {
            this.y = this.radius;
            this.vy *= -1;
        }
        else if (this.y > this.effect.height - this.radius) {
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
    };
    Particle.prototype.reset = function () {
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    };
    return Particle;
}());
//creo un ejecto
var Effect = /** @class */ (function () {
    function Effect(canvas, context) {
        var _this = this;
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 200,
        };
        window.addEventListener('resize', function (e) {
            _this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
        });
        window.addEventListener('mousemove', function (e) {
            // Actualizamos las coordenadas del mouse sin verificar pressed
            _this.mouse.x = e.x;
            _this.mouse.y = e.y;
        });
        // Estos eventos ya no son necesarios para la funcionalidad básica
        window.addEventListener('mousedown', function (e) {
            _this.mouse.pressed = true;
            _this.mouse.x = e.x;
            _this.mouse.y = e.y;
        });
        window.addEventListener('mouseup', function (e) {
            _this.mouse.pressed = false;
        });
    }
    Effect.prototype.createParticles = function () {
        for (var i = 0; i < this.numberOfParticles; i++) {
            this.particles.push(new Particle(this));
        }
    };
    Effect.prototype.handleParticles = function (context) {
        this.connectParticles(context);
        this.particles.forEach(function (particle) {
            particle.draw(context);
            particle.update();
        });
    };
    Effect.prototype.connectParticles = function (context) {
        var maxDistance = 80;
        for (var a = 0; a < this.particles.length; a++) {
            for (var b = a; b < this.particles.length; b++) {
                var dx = this.particles[a].x - this.particles[b].x;
                var dy = this.particles[a].y - this.particles[b].y;
                var distance = Math.hypot(dx, dy);
                if (distance < maxDistance) {
                    context.save();
                    var opacity = 1 - distance / maxDistance;
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            }
        }
    };
    Effect.prototype.resize = function (width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        var gradient = this.context.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(0.5, 'purple');
        gradient.addColorStop(1, 'green');
        this.context.fillStyle = gradient;
        this.context.strokeStyle = 'white';
        this.particles.forEach(function (particle) {
            particle.reset();
        });
    };
    return Effect;
}());
var effect = new Effect(canvas, ctx);
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();
