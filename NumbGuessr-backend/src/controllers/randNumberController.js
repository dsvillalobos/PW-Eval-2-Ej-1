let randNumber = Math.floor(Math.random() * 100) + 1;

// Verifica el intento del usuario
function verifyGuess(req, res) {
  const guess = Number(req.body.guess);

  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    return res.status(400).json({
      mensaje: "Ingresa un número entero entre 1 y 100"
    });
  }

  if (guess < randNumber) {
    return res.json({ resultado: "mayor" });
  }

  if (guess > randNumber) {
    return res.json({ resultado: "menor" });
  }

  return res.json({ resultado: "correcto" });
}

// metodo para resetear el numero (generar un nuevo numero aleatorio)
function resetNumber(req, res) {
  randNumber = Math.floor(Math.random() * 100) + 1;

  return res.json({
    mensaje: "El juego se reinició"
  });
}

module.exports = {
  verifyGuess,
  resetNumber
};

