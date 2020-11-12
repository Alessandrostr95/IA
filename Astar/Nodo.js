class Nodo{

    constructor(x=0, y=0, stato=undefined, r=15, color='white') {
        this.pos = createVector(x, y);
        this.stato = stato;
        this.r = r;
        this.color = color;
        this.g = 0;
        this.h = 0;
    }

    heuristic( goal ) {
        return p5.Vector.dist(this.pos, goal.pos);
    }

    equals( nodo ) {
        return this.pos.equals( nodo.pos )
    }

    espandi( distanza ) {
        let vicini = [];

        //destra
        vicini.push( new Nodo(this.pos.x + distanza, this.pos.y) );
        //sinistra
        vicini.push( new Nodo(this.pos.x - distanza, this.pos.y) );
        //sopra
        vicini.push( new Nodo(this.pos.x, this.pos.y - distanza) );
        //sotto
        vicini.push( new Nodo(this.pos.x, this.pos.y + distanza) );

        return vicini;
    }

    full_expand( distanza ) {
        let vicini = [];

        //destra
        vicini.push( new Nodo(this.pos.x + distanza, this.pos.y) );
        //sinistra
        vicini.push( new Nodo(this.pos.x - distanza, this.pos.y) );
        //sopra
        vicini.push( new Nodo(this.pos.x, this.pos.y - distanza) );
        //sotto
        vicini.push( new Nodo(this.pos.x, this.pos.y + distanza) );

        //NE
        vicini.push( new Nodo(this.pos.x + distanza, this.pos.y - distanza) );
        //SE
        vicini.push( new Nodo(this.pos.x + distanza, this.pos.y + distanza) );
        //SO
        vicini.push( new Nodo(this.pos.x - distanza, this.pos.y + distanza) );
        //NO
        vicini.push( new Nodo(this.pos.x - distanza, this.pos.y - distanza) );


        return vicini;
    }

    show() {
        fill( this.color );
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    show( color ) {
        fill( color );
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}