const cvs = document.getElementById('c');
const ctx = cvs.getContext('2d');
cvs.width = 1080;
cvs.height = 620;
const CW = cvs.width;
const CH = cvs.height;

const RotZ = (angle) => {
    return [
        [Math.cos(angle), -Math.sin(angle), 0],
        [Math.sin(angle), Math.cos(angle), 0],
        [0, 0, 1]
    ]
}

const RotX = (angle) => {
    return [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
}

function multMat(m, v) {
    const { x, y, z } = v;
    return {
        x: m[0][0] * x + m[0][1] * y + m[0][2] * z,
        y: m[1][0] * x + m[1][1] * y + m[1][2] * z,
        z: m[2][0] * x + m[2][1] * y + m[2][2] * z,
    }
}

class Vertex {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;

    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'black';
        ctx.fill();
    }
}

const drawLine = (p1, p2) => {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = 'white';
    if (p1.z < 0) {
        ctx.strokeStyle = 'white';
    }
    ctx.stroke();
}

const drawTri = (p1, p2, p3) => {
    drawLine(p1, p2);
    drawLine(p2, p3);
    drawLine(p3, p1);
}

class Square {
    constructor(size = 100, cent = [CW / 2, CH / 2, 0]) {
        const P = [];
        P[0] = new Vertex(cent[0] - size, cent[1] - size, cent[2]);
        P[1] = new Vertex(cent[0] + size, cent[1] - size, cent[2]);
        P[2] = new Vertex(cent[0] - size, cent[1] + size, cent[2]);
        P[3] = new Vertex(cent[0] + size, cent[1] + size, cent[2]);
        this.verts = P;
    }
}

class Sphere {
    constructor(r = 250, segments = 25, center = [CW / 1.3, CH / 1.3, 0]) {
        const P = [];
        for (let i = 0; i <= segments; i++) {
            const theta = i * Math.PI / segments;
            for (let j = 0; j <= segments; j++) {
                const phi = j * 2 * Math.PI / segments;
                const x = r * Math.sin(theta) * Math.cos(phi) + center[0];
                const y = r * Math.sin(theta) * Math.sin(phi) + center[1];
                const z = r * Math.cos(theta);

                P.push(new Vertex(x, y, z));
            }
        }
        this.verts = P;
        this.T = [];
        const pointsPerRow = segments + 1;
        for (let i = 0; i < segments; i++) {
            for (let j = 0; j < segments; j++) {
                const a = i * pointsPerRow + j;
                const b = a + 1;
                const c = a + pointsPerRow;
                const d = c + 1;
                this.T.push([a, b, c]);
            }
        }
    }
}

class Cube {
    constructor(size = 100, cent = [CW / 2, CH / 2, 0]) {
        const sq = new Square(size, [cent[0], cent[1], cent[2] - size]);
        const sq2 = new Square(size, [cent[0], cent[1], cent[2] + size]);
        this.verts = sq.verts.concat(sq2.verts);
        this.T = [
            [0, 1, 2],
            [1, 2, 3],
            [1, 0, 5],
            [0, 5, 4],
            [0, 2, 6],
            [0, 4, 6],
            [2, 3, 6],
            [7, 3, 6],
            [1, 5, 7],
            [1, 3, 7],
            [5, 4, 6],
            [5, 7, 6],
        ];
    }
}
let angle = 0;
const center = new Vertex(CW / 2, CH / 2, 0);

const cube = new Cube(30, [CW / 3, CH / 3, -400]);
const shape = new Sphere();
const verts = shape.verts;
const shapes = [cube, shape];
const vertices = [...cube.verts, ...shape.verts];

const engine = () => {
    angle += 0.02;
    ctx.clearRect(0, 0, CW, CH);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CW, CH);
    let points = [];
    let i = 0;

    for (let v of vertices) {
        let translated = new Vertex(v.x - center.x, v.y - center.y, v.z - center.z);
        let rotated = multMat(RotZ(angle), translated);
        rotated = multMat(RotX(angle / 3), rotated);
        let returned = new Vertex(rotated.x + center.x, rotated.y + center.y, rotated.z + center.z);
        returned.draw();

        points[i] = returned;
        i += 1;

    }
    for (let tri of cube.T) {
        drawTri(points[tri[0]], points[tri[1]], points[tri[2]])
    }
    for (let tri of shape.T) {
        drawTri(points[8 + tri[0]], points[8 + tri[1]], points[8 + tri[2]])
    }

    requestAnimationFrame(engine);
}
engine();