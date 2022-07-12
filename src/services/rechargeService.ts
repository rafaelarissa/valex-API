import * as handleError from "../middlewares/handleErrors.js";
import * as cardService from "../services/cardService.js";
import * as companyRepository from "../repositories/companyRepository.js";
import * as employeeRepository from "../repositories/employeeRepository.js";
import * as rechargeRepository from "../repositories/rechargeRepository.js";

export async function recharge(cardId: number, amount: number, apiKey: string) {
  const card = await cardService.searchCardById(cardId);

  await cardService.checkActivation(cardId);

  cardService.checkExpirationDate(card.expirationDate);

  const company = await companyRepository.findByApiKey(apiKey);
  const employee = await employeeRepository.findById(card.employeeId);

  if (employee.companyId !== company.id)
    throw handleError.unauthorizedError("");

  await rechargeRepository.insert({
    cardId,
    amount,
  });
}
