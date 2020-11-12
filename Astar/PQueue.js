class PQueue {

    constructor() {
        this.queue = [];
    }

    insert(k,v) {

        this.queue.push( [k,v] );

        this.queue.sort(function(a, b){
            return a[0] - b[0];
        });
    }

    isEmpty() {
        return ( this.queue.length == 0 );
    }

    deleteMin() {
        return this.queue.shift()[1];
    }

    findMin() {
        return this.queue[0][1];
    }
    
    index( val ) {
        var i = 0;
        for( let el of this.queue ) {
            if ( el[1] == val ) {
                return i
            } else {
                i ++;
            }
        }
        return -1;
    }
    
    index( val, comparatorFunction ) {
        var i = 0;
        for( let el of this.queue ) {
            if ( comparatorFunction(el[1], val) ) {
                return i
            } else {
                i ++;
            }
        }
        return -1;
    }

    changeKey( newKey, val ){
        this.queue[this.index(val)][0] = newKey;
        
        this.queue.sort(function(a, b){
            return a[0] - b[0];
        });
    }

    changeKey( newKey, val, comparatorFunction ){
        this.queue[this.index(val, comparatorFunction)][0] = newKey;
        
        this.queue.sort(function(a, b){
            return a[0] - b[0];
        });
    }

    remove( val ) {
        this.queue.splice( this.index(val), 1 );
    }

    includes( val ) {
        for( let el of this.queue ) {
            if ( el[1] == val ) {
                return true;
            }
        }
        return false;
    }

    includes( val, comparatorFunction ) {
        for( let el of this.queue ) {
            if ( comparatorFunction(el[1], val) ) {
                return true;
            }
        }
        return false;
    }

    get_element( val, comparatorFunction ){
        for(let el of this.queue){
          if( comparatorFunction(el[1], val) ){
            return el[1];
          }
        }
    }

    show() {
        for( let e of this.queue) {
            console.log( e );
        }
    }


}