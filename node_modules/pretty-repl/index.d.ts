import type repl from 'repl';
interface PrettyREPLServer extends repl.REPLServer {}
export declare function start(...args: Parameters<typeof repl.start>): PrettyREPLServer;
