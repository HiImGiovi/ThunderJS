import logger from "./logger/logger.js";
import scanner from "./scanner/Scanner.js";
import { readFileSync } from "fs";

if (process.argv.length > 3) {
  logger.log_error("Wrong number of arguments!");
  logger.log_info("Usage: thunder [file]");
  process.exit(1);
} else if (process.argv.length === 3) {
  run_file(process.argv[2]);
} else {
  run_prompt();
}

function run_file(file) {
  const file_content = readFileSync(file, { encoding: "ascii" });
  logger.log_info(`Running ${file}...`);
  logger.log_info(`File content:\n${file_content}`);
  run(file_content);
}

function run(content) {
  const tokens = scanner.scanTokens(content);
  for (const token of tokens) {
    logger.log_info(`Token: ${token.type} - ${token.lexeme}`)
  }
}

async function run_prompt() {
  const stdin = process.openStdin();
  logger.log_info(`Starting thunder interpreter...`);
  while (true) {
    logger.log_success("thunder > ");
    const content = await new Promise((resolve) => {
      stdin.addListener("data", (d) => {
        resolve(d.toString().trim());
      });
    });
    if (content === "exit") process.exit(0);
    if (content === "") continue;
    run(content);
  }
}
