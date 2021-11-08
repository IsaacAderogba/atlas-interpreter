import { Atlas } from "../Atlas";

declare global {
  var atlas: Atlas;
}

global.atlas = new Atlas();
