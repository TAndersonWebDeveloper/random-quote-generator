import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { GlobalStyles } from "./globalStyles";
import { BsQuote, BsTwitter } from "react-icons/bs";

const randomColor = () => {
  let color = "#";
  const letters = "0123456789ABCDEF";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
};

let color = randomColor();

const Contaier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${color};
  font-family: "Roboto", sans-serif;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  button {
    font-size: 1.5rem;
    background-color: ${color};
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    align-self: flex-end;

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`;

const Quote = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${color};
  text-align: center;

  span {
    font-size: 3rem;
    font-weight: 700;
    color: ${color};
    margin-right: 10px;
  }
`;

const Author = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  align-self: flex-end;
  color: ${color};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  a {
    font-size: 2rem;
    color: ${color};
    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
`;

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios.get("https://api.quotable.io/random").then((res) => {
      setQuote(res.data.content);
      setAuthor(res.data.author);
    });
  }, []);

  const handleClick = async () => {
    randomColor();
    await axios.get("https://api.quotable.io/random").then((res) => {
      setQuote(res.data.content);
      setAuthor(res.data.author);
    });
  };

  return (
    <Contaier>
      <GlobalStyles />
      <Wrapper id="quote-box">
        <Quote id="text">
          <span>
            <BsQuote />
          </span>
          {quote}
        </Quote>
        <Author id="author">&ndash; {author}</Author>
        <ButtonContainer>
          <a id="tweet-quote" href="https://www.twitter.com/intent/tweet">
            <BsTwitter />
          </a>
          <button id="new-quote" onClick={handleClick}>
            New Quote
          </button>
        </ButtonContainer>
      </Wrapper>
    </Contaier>
  );
}

export default App;
