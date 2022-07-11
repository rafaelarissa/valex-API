import { Request, Response } from "express";
import * as cardService from "../../src/services/cardService.js";

export async function create(req: Request, res: Response) {
  const { employeeId, type } = req.body;
  const apiKey = req.headers["x-api-key"] as string;

  await cardService.create(apiKey, employeeId, type);
  res.sendStatus(201);
}

export async function activate(req: Request, res: Response) {
  const { id } = req.params;
  const { cvv, password } = req.body;

  await cardService.activate(Number(id), cvv, password);
  res.sendStatus(200);
}
