import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import "./App.css";

function App() {
  const [attemps, setAttemps] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [won, setWon] = useState(false);

  useEffect(function () {
    getRandomNumber();
  }, []);

  async function getRandomNumber() {
    try {
      const response = await axios.post("http://localhost:3000/api/reset");
      console.log("Número aleatorio generado:", response.data.nuevoNumero);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleNumberGuess(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/guess", {
        guess: userNumber,
      });

      // Agregar el numero al historial
      setHistory((prevHistory) => [...prevHistory, userNumber]);

      setMessage(response.data.resultado);

      if (response.data.status === "Ganaste") {
        setWon(true);
      }
    } catch (err) {
      console.error(err);
    }

    setUserNumber("");
    setAttemps(attemps + 1);
  }

  async function restartGame() {
    getRandomNumber();
    setAttemps(0);
    setHistory([]);
    setMessage("");
    setWon(false);
    setUserNumber("");
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs="12" md="10" lg="8">
          <h1 className="text-center mb-3">Numb Guessr</h1>

          <p className="text-center text-muted">
            Adivina el número secreto entre 1 y 100.
          </p>

          <form onSubmit={handleNumberGuess}>
            <div className="mb-3">
              <label htmlFor="numero" className="form-label">
                Ingresa tu número
              </label>

              <input
                id="numero"
                type="number"
                className="form-control"
                min="1"
                max="100"
                placeholder="Escribe un número..."
                onChange={(e) => setUserNumber(e.target.value)}
                value={userNumber}
                disabled={won}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Adivinar
            </button>
          </form>

          <div className="alert alert-info mt-3">
            {message || "Ingresa un numero"}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mt-4">Historial de intentos</h4>
            </div>
            <div>
              <h5 className="mt-4"># Intentos: {attemps}</h5>
            </div>
          </div>

          <ul className="list-group">
            {history.map((item, index) => (
              <li key={index} className="list-group-item">
                {item}
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn-outline-secondary w-100 mt-3"
            onClick={restartGame}
          >
            Reiniciar juego
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
