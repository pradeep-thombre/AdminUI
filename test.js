setTimeout( function(){
    console.log('First function called');
  }, 1000 );

  setTimeout( function(){
    console.log('scecond function called');
  }, 0 );
  console.log("outer")

  setTimeout( function(){
    console.log('third function called');
  }, 1000 );

  setTimeout(function() { 
    console.log('AAA');
}, 0); // Call this in 0 milliseconds 
