type LogLevel = "INFO" | "WARN" | "ERROR" | "DEBUG";

function Format(Level: LogLevel, Message: string, Meta?: unknown) {
  const Timestamp = new Date().toISOString();
  const Base = `[${Timestamp}] [${Level}] ${Message}`;
  return Meta ? `${Base} ${JSON.stringify(Meta)}` : Base;
}

export const Logger = {
  Info: (Message: string, Meta?: unknown) => console.log(Format("INFO", Message, Meta)),
  Warn: (Message: string, Meta?: unknown) => console.warn(Format("WARN", Message, Meta)),
  Error: (Message: string, Meta?: unknown) => console.error(Format("ERROR", Message, Meta)),
  Debug: (Message: string, Meta?: unknown) => console.log(Format("DEBUG", Message, Meta)),
};