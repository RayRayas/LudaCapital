 //initial angular
var myApp = angular.module('myApp', []);


myApp.controller('calculatorCtrl', function($scope)  {
   
  var objmeses=[];
    
   function Calular_rendimiento(montoInicial,rendimiento,dias){
   	var dias = 365
    return (montoInicial*rendimiento/100*dias)/360;
   }
   
   function calcTotal(monto_inicial,monto_mensual, porcentaje, meses){
    var meses = 11
    var porcentaje = 60;
      var total_monto = monto_inicial;
      var rendimiento = (total_monto*porcentaje/100)/12;
      var total_rendimiento = rendimiento;
      
      

      for( var mes = 0; mes <=meses; mes++){
        
        if(mes === 0){
         
        }
        else{
          total_monto = monto_inicial;
          rendimiento=(total_monto*porcentaje/100)/12;
          total_rendimiento +=rendimiento; 

        }
        
        objmeses.push({"mes" : (mes+1), "monto": total_monto, "rendimiento":rendimiento});

        }

      return [total_monto+total_rendimiento,total_rendimiento];
    }
    function JSONToCSVConvertor(JSONData,ShowLabel) { 
         
  var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  var json = JSON.stringify( $scope.appdata, function( key, value ) {
    if( key === "$$hashKey" ) {
        return undefined;
    }

    return value;
}); 
  var CSV = 'Rendimiento anual 60% a 12 meses,' + '\r';    
  
  if (ShowLabel) {
     var row = "";
     for (var index in arrData[0]) {
         row += index + ',';
     }
     row = row.slice(0, -1);
     CSV += row + '\r\n';
  }
  
  for (var i = 0; i < arrData.length; i++) {
     var row = "";
     for (var index in arrData[i]) {
        var arrValue = arrData[i][index] == null ? "" : '="' + arrData[i][index] + '"';
        row += arrValue + ',';
     }
     row.slice(0, row.length - 1);
     CSV += row + '\r\n';
  }
  if (CSV == '') {        
     growl.error("Invalid data");
     return;
  }   
  
  var fileName = "LUDA Capital Corrida financiera";
  if(msieversion()){
  var IEwindow = window.open();
  IEwindow.document.write('sep=,\r\n' + CSV);
  IEwindow.document.close();
  IEwindow.document.execCommand('SaveAs', true, fileName + ".csv");
  IEwindow.close();
  } else {
   var uri = 'data:application/csv;charset=utf-8,' + escape(CSV);
   var link = document.createElement("a");    
   link.href = uri;
   link.style = "visibility:hidden";
   link.download = fileName + ".csv";
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
  }
}
function msieversion() {
  var ua = window.navigator.userAgent; 
  var msie = ua.indexOf("MSIE "); 
  if (msie != -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) // If Internet Explorer, return version number 
  {
    return true;
  } else { // If another browser, 
    return false;
  }
    return false; 
}
  function reset(){
      
      $scope.objmeses=[];
      $scope.result =[];
  }
  function download(){
    var data = objmeses;
    data.push({"monto":$scope.result[0],"rendimiento": $scope.result[1]});

    if(data != '')
      JSONToCSVConvertor(data, true);
    else
      alert("no existe una tabla actual");
  }
   
   $scope.calc = calcTotal;
   $scope.calculador = Calular_rendimiento;
   $scope.objmeses= objmeses; 
   $scope.reset=reset;
   $scope.download=download;
   
   
});  
 

var _DatetoJSON = Date.prototype.toJSON;
Date.prototype.toJSON = function() {
  try {
    return _DatetoJSON.call(this);
  } catch(e) {
    if (e instanceof RangeError) {
      return null;
    }
    throw e;
  }
};