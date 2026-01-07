import * as financeApi from "../api/FinaceApi";

const FinanceService = {
  getDetails: (employeeId) =>
    financeApi.getFinanceDetails(employeeId),

  addDetails: (data) =>
    financeApi.addFinanceDetails(data),
};

export default FinanceService;
