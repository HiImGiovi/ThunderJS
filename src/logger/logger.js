import ansi_colors from "./ansi_colors.js";

const logger = {
  log_warning: (message) => {
    console.log(`\x1b[${ansi_colors.ANSI_YELLOW}m${message}\x1b[0m`);
  },
  log_error: (message) => {
    console.log(`\x1b[${ansi_colors.ANSI_RED}m${message}\x1b[0m`);
  },
  log_info: (message) => {
    console.log(`\x1b[${ansi_colors.ANSI_GRAY}m${message}\x1b[0m`);
  },
  log_success: (message) => {
    process.stdout.write(`\x1b[${ansi_colors.ANSI_GREEN}m${message}\x1b[0m`);
  },
};

export default logger;
