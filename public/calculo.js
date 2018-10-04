$(document).ready(function(){
  $('#tasa').hide();
  $('#pago').hide();
})

function calcular(){
  var inversion = parseFloat($('#monto').val())
  var grupos = inversion / 20000
  $('#grupos').val(grupos)
  generarTabla()
}

function plazo(){
  if($('#instruccion').val() > 0){
    instruccion()
  }
}

function instruccion(){
  if($('#instruccion').val() == 1){
    var plazo = $('#plazo').val()
    $('#tasa').show();
    if(plazo < 4){
      $('#tasa').val('%0.00');
      $('#tasah').val(0);
    }else if(plazo < 6){
      $('#tasa').val('%2.25');
      $('#tasah').val(0.0225);
    }else if(plazo < 8){
      $('#tasa').val('%2.75');
      $('#tasah').val(0.0275);
    }else if(plazo < 12){
      $('#tasa').val('%3.25');
      $('#tasah').val(0.0325);
    }else if(plazo == 12){
      $('#tasa').val('%3.75');
      $('#tasah').val(0.0375);
    }
    $('#pago').show();
    $('#pago').val('N/A');
  }else{
    $('#tasa').hide();
    $('#tasa').val('');
    var inversion = parseFloat($('#monto').val());
    $('#pago').show();
    $('#pago').val(inversion);
  }
  generarTabla()
}

function generarTabla(){
  $('#saldos > tr').remove()
  var nuevaFila = '';
  var inversion = parseFloat($('#monto').val());
  var meses = parseFloat($('#plazo').val());
  var tasa = parseFloat($('#tasah').val());
  var capital = 0;
  var interes = 0;
  var promedio = 0;
  if($('#instruccion').val() == 1){capital = inversion / meses ;}else{capital = 0;}
  for(var i = 1; i <= 12; i++){
    if(inversion > 0){
      interes = inversion * tasa;
      promedio += interes;
    }
    nuevaFila += '<tr>';
    nuevaFila += '<td>'+i+'</td>';
    if(i > meses){
      nuevaFila += '<td>$0.00</td>';
    }else{
      nuevaFila += '<td>$'+number_format(inversion,2)+'</td>';
    }
    nuevaFila += '<td>$'+number_format(capital,2)+'</td>';
    if(i > meses){
      nuevaFila += '<td>$0.00</td>';
    }else{
      nuevaFila += '<td>$'+number_format(interes,2)+'</td>';
    }
    nuevaFila += '</tr>';
    inversion = inversion - capital
  }
  $('#rendimiento').val(number_format((promedio/meses),2))
  $('#saldos').append(nuevaFila);
}


//Convertir a moneda
function number_format(amount, decimals) {
    amount += ''; // por si pasan un numero en vez de un string
    amount = parseFloat(amount.replace(/[^0-9\.]/g, '')); // elimino cualquier cosa que no sea numero o punto
    decimals = decimals || 0; // por si la variable no fue fue pasada
    // si no es un numero o es igual a cero retorno el mismo cero
    if (isNaN(amount) || amount === 0) 
        return parseFloat(0).toFixed(decimals);
    // si es mayor o menor que cero retorno el valor formateado como numero
    amount = '' + amount.toFixed(decimals);
    var amount_parts = amount.split('.'),
        regexp = /(\d+)(\d{3})/;
    while (regexp.test(amount_parts[0]))
        amount_parts[0] = amount_parts[0].replace(regexp, '$1' + ',' + '$2');
    return amount_parts.join('.');
}