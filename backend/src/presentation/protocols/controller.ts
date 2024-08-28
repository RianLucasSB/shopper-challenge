import { HttpResponse } from "./http";

export interface Controller {
  handle: (req: any) => Promise<HttpResponse>
}
