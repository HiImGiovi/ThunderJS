import Token from "./Token.js";
import TokenType from "./TokenType.js";
import logger from "../logger/logger.js";
class Scanner {
  #start = 0;
  #current = 0;
  #line = 1;
  #num_char_line = 0;
  #line_start = 0;
  constructor() {}
  /**
   *
   * @param {string} file_content The content of the source code.
   * @returns {Token[]} An array of Tokens
   */
  scanTokens(file_content) {
    this.#start = 0;
    this.#current = 0;
    this.#line = 1;
    this.#num_char_line = 0;
    this.#line_start = 0;
    const tokens = [];

    const advance = () => {
      this.#num_char_line++;
      return file_content.charAt(this.#current++);
    };

    const addToken = (type, value) => {
      const lexeme = file_content.substring(this.#start, this.#current);
      this.#start = this.#current;
      tokens.push(new Token(type, value ? value : lexeme));
    };

    const match = (char) => {
      if (isAtEnd()) return false;
      if (file_content.charAt(this.#current) !== char) return false;
      // this.#current++;
      advance();
      return true;
    };
    const peek = () => {
      if (this.#current >= file_content.length) return "\0";
      return file_content.charAt(this.#current);
    };

    const string = (initial_string_token) => {
      while (peek() != initial_string_token && !isAtEnd()) {
        if (peek() == "\n") this.#line++;
        advance();
      }
      if (isAtEnd()) {
        logger.log_error(`Unterminated string at line ${this.#line}`);
      }
      // the closing token
      advance();

      const value = file_content.substring(this.#start + 1, this.#current - 1);
      addToken(TokenType.STRING, value);
    };
    const isAtEnd = () => this.#current >= file_content.length;

    while (!isAtEnd()) {
      const c = advance();
      switch (c) {
        case "{":
          addToken(TokenType.LEFT_BRACE);
          break;
        case "}":
          addToken(TokenType.RIGHT_BRACE);
          break;
        case "(":
          addToken(TokenType.LEFT_BRACE);
          break;
        case ")":
          addToken(TokenType.RIGHT_BRACE);
          break;
        case ",":
          addToken(TokenType.COMMA);
          break;
        case ".":
          addToken(TokenType.DOT);
          break;
        case "-":
          addToken(TokenType.MINUS);
          break;
        case "+":
          addToken(TokenType.PLUS);
          break;
        case "*":
          addToken(TokenType.STAR);
          break;
        case "!":
          addToken(match("=") ? TokenType.BANG_EQUAL : TokenType.BANG);
          break;
        case "=":
          addToken(match("=") ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
          break;
        case "<":
          addToken(match("=") ? TokenType.LESS_EQUAL : TokenType.LESS);
          break;
        case ">":
          addToken(match("=") ? TokenType.GREATER_EQUAL : TokenType.GREATER);
          break;
        case "/":
          if (match("/")) {
            while (peek() != "\n" && !isAtEnd()) advance();
            this.#start = this.#current;
          } else {
            addToken(TokenType.SLASH);
          }
          break;
        case ";":
          addToken(TokenType.SEMICOLON);
          break;
        case " ":
        case "\r":
        case "\t":
          break;
        case "\n":
          this.#line_start = this.#current;
          this.#line++;
          this.#num_char_line = 0;
          this.#start = this.#current;
          break;
        case '"':
        case "'":
          string(c);
          break;
        default:
          this.#start = this.#current;
          const error_msg = `Line ${
            this.#line
          } - Unexpected token ${c} at pos ${
            this.#num_char_line
          }\n\n    ${file_content.substring(this.#line_start, this.#current)}`;
          logger.log_error(error_msg);
          logger.log_error(
            " ".repeat(this.#num_char_line + 3) + "\u2517\u2501\u2501here"
          );
          // console.log("\u001b[4meeeoooo\u001b[0m");
          break;
      }
      // this.#current++;
    }
    return tokens;
  }
}

export default new Scanner();
