function foo(numeros) {
  var max = numeros[0];
  var min = numeros[0];

  for (var i = 0; i < numeros.length; i++) {
    if (numeros[i] > max) {
      max = numeros[i];
    }
    if (numeros[i] < min) {
      min = numeros[i];
    }
  }
  return max - min;
}

console.log(foo([15, 10]));
