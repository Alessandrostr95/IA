/**
 * Questo programma implementa l'algoritmo A*.
 * Per dare un esempio viene definito un ambiente, uno stato iniziale e uno finale
 * e viene stampato a schermo il percorso trovato dall'algortimo A*
 * @author Alessandro Straziota
 */

let goal;                   //obiettivo
let start;                  //partenza
let resolution = 20         //risoluzione della griglia 
let walls = [];             //insieme di nodi che rappresentano i bordi dell'ambiente



function setup() {
  createCanvas(1000, 600);

  goal = new Nodo(45*resolution + resolution/2, 3*resolution + resolution/2);
  start =  new Nodo(12*resolution + resolution/2, 25*resolution + resolution/2);

  /*Contorni della mappa*/
  for(let x = 0; x < width/resolution; x += 1){
    walls.push( new Nodo((x+1/2)*resolution, resolution/2) );
  }
  
  for(let x = 0; x < width/resolution; x += 1){
    walls.push( new Nodo((x+1/2)*resolution, height - resolution/2) );
  }
  
  for(let y = 0; y < height/resolution; y += 1){
    walls.push( new Nodo(resolution/2, (y+1/2)*resolution) );
  }
  
  for(let y = 0; y < height/resolution; y += 1){
    walls.push( new Nodo(width - resolution/2, (y+1/2)*resolution) );
  }
  
  /*Muri del labirinto*/
  for(let i = 0; i < floor((height/resolution)*(2/3)); i += 1 ) {
    w = new Nodo( floor((width/resolution)/2)*resolution + resolution/2, i*resolution + resolution/2 );
    walls.push( w );
  }
  
  for(let i = 10; i < 25; i++ ) {
    w = new Nodo( i*resolution + resolution/2, 4*resolution + resolution/2 );
    walls.push( w );
  }
  
  for(let i = 26; i < 39; i++ ) {
    w = new Nodo( i*resolution + resolution/2, 12*resolution + resolution/2 );
    walls.push( w );
  }
  
  
  for(let y = 13; y < height/resolution; y += 1){
    walls.push( new Nodo( 16*resolution + resolution/2 , (y+1/2)*resolution) );
  }
  
  for(let i = 6; i < 16; i++ ) {
    w = new Nodo( i*resolution + resolution/2, 13*resolution + resolution/2 );
    walls.push( w );
  }
  
  for(let i = 35; i < 50; i++ ) {
    w = new Nodo( i*resolution + resolution/2, 6*resolution + resolution/2 );
    walls.push( w );
  }

}

function draw() {
  background(200);

  //disegno la griglia
  for(let x = 0; x < width/resolution; x += 1 ) {
    for(let y = 0; y < height/resolution; y += 1 ) {
      stroke(0);
      noFill();
      strokeWeight(1);
      rect(x*resolution, y*resolution, resolution);

    }
  }

  //disegno i muri
  for(let w of walls) {
    w.show('black');
  }

  //richiamo A*
  n = Astar(start, goal);

  //stampo la soluzione a schermo
  let v = n;
  while( v.predecessore != undefined ) {
    stroke(0);
    line(v.pos.x, v.pos.y, v.predecessore.pos.x, v.predecessore.pos.y )
    v.show( 'blue' );
    v = v.predecessore;
  }

  goal.show( 'green' );
  start.show( 'red' );

  //fermo il programma
  noLoop();

}

function Astar(partenza, arrivo){

  /*Inizializzo la frontiera come una coda con priorità*/
  let frontiera = new PQueue();

  /*Inizializzo l''insieme dei nodi già visitati */
  let visitati = []

  /*Definisco l'euristica del punto di partenza*/
  partenza.h = partenza.heuristic(arrivo);

  /*Definisco la funzione g del punto di partenza*/
  partenza.g = 0;

  /*Aggiungo come primo elemento della frontiera il nodo partenza */
  frontiera.insert(partenza.g + partenza.h, partenza);

  while( ! frontiera.isEmpty() ) {
    
    /*Rimuovo dalla frontiera il nodo con f(n) migliore*/
    n = frontiera.deleteMin();

    //Inserisco il nodo nell'inseme dei visitati
    visitati.push(n);

    /*Se quel nodo rappresenta lo stato d'arrivo allora la ricerca è terminata*/
    if( n.equals( arrivo ) ) {
      return n;
    }
    
    else {

      //Espando il nodo n
      let vicini = n.full_expand( resolution );

      //per ognuno dei suoi vicini generati
      for(let vicino of vicini) {
        
        //distanza tra n e il vicino
        distanza = p5.Vector.dist(vicino.pos, n.pos);
  
        //se il nodo vicino non sbatte a un muro e non è stato ancoro visitato
        if( !collideWall(vicino) && !visitato( visitati, vicino ) ) {
  
          let in_Forntiera = frontiera.includes( vicino, function(a,b){ return a.equals(b) } );       //verifico se è nella frontiera
  
          //Se il non è nella frontiera allora non è mai stato incontrato prima d'ora
          //perciò lo inserisco
          if( !in_Forntiera  ) {
            vicino.predecessore = n;
            vicino.h = vicino.heuristic( goal );
            vicino.g = n.g + distanza;
            frontiera.insert(vicino.g + vicino.h, vicino);
          }
  
          
          //se è gia nella frontiera, verifico se c'è bisogno di aggiornare la sua stima
          //nel caso la aggiorno
          else {

            //prendo (NON TOLGO) dalla frontiera il nodo interessato
            let x = frontiera.get_element(vicino, function(a,b){ return a.equals(b) });
            
            //verifico se c'è da aggiornare la sua stima e nel caso l'aggiorno
            if( x.g > n.g + distanza ){
              x.predecessore = n;
              x.g = n.g + distanza;
              frontiera.changeKey(vicino.g + vicino.h, x, function(a,b){ return a.equals(b) });
            }
  
          }
  
        }

        //se il nodo sbatte a un muro
        else if( collideWall(vicino) ) {
          vicino.predecessore = n;
          visitati.push( vicino );
        }
  
      }
    }

  }
}

//funzione che verifica se un nodo è già stato visitato
function visitato( visitati, nodo ) {
  for(let v of visitati) {
    if(v.equals(nodo)){
      return true;
    }
  }
  return false;
}

//funzione che verifica se un nodo sbatte su di un muro
function collideWall( nodo ) {
  for(let w of walls) {
    if( nodo.equals(w) ){
      return true;
    }
  }
  return false;
}