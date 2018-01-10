require(['../node_modules/file-saver/FileSaver'])


var testError = true;
var MyBlobBuilder = function() {
  this.parts = [];
}

MyBlobBuilder.prototype.append = function(part) {
  this.parts.push(part);
  this.blob = undefined; // Invalidate the blob
};

MyBlobBuilder.prototype.getBlob = function() {
  if (!this.blob) {
      this.blob = new Blob(this.parts, { type: "text/yaml" });
  }
      return this.blob;
};



function WriteToFile() {
  var myBlobBuilder = new MyBlobBuilder();

   function alertError(id1,id2){
     $(id1).addClass("item bad");
     $(id2).show();
   }
   function supError(id1,id2){
     $(id1).removeClass("item bad");
     $(id2).hide();
   }

   var value = $("#sizes").val();
    if(! /^[0-9,]+$/.test(value)){
     alertError("#form1","#alert1");
     return;

    } else{
     myBlobBuilder.append(['traces:\n  - synthetic: ['+ value + ']\n\n']);
     supError("#form1","#alert1");
   }


   value = [$('input[name=code]:checked', '#form2').val(),$("#stripe").val(),$("#parity").val(),$("#src").val()]

   value.forEach(erasurecode);

   function erasurecode(item, index){
     if(index==0 && item==null){
       value[0] = "Null"
     }
     if(index != 0){
       if(! /^[0-9]+$/.test(item)){
       alertError("#form"+(index+2),"#alert"+(index+1));

     } else{
        supError("#form"+(index+2),"#alert"+(index+1));
     }
    }


   }
   console.log("Hello");
      myBlobBuilder.append(['erasure_codes: \n  - code: '+value[0]+'\n    stripe: '+value[1]+'\n    parity: '+value[2]+'\n    src: '+value[3]+'\n\n']);


   //myBlobBuilder.append(['execute_times: 1\n\n']);

   //myBlobBuilder.append(['benches:\n  - name: bench_latency']);


   var blob = myBlobBuilder.getBlob();
//saveAs(blob, "hello world.yml");
}





// var FileSaver = require('file-saver');
// var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
// FileSaver.saveAs(blob, "hello world.txt");
