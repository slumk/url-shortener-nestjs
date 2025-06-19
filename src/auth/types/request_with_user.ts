import { Users } from "@prisma/client";
import { IncomingMessage } from "node:http";

export class RequestWithUser extends IncomingMessage {
  user: Users;
}
