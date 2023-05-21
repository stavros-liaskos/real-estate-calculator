let printTable: Record<string, string> = {};

export type FinanceArgs = {houseCost: number, expectedYield: number,renovationConst?: number};
export function calculate({houseCost, expectedYield,renovationConst = 10_000}: Partial<FinanceArgs> ) {
    if (!houseCost || !expectedYield) {
        return
    }
    const loanTotal = houseCost * 0.8;
    printTable["Loan Total"] = formatCompactNumber(loanTotal);
    printTable["Renovation"] = formatCompactNumber(renovationConst);

    printTable["Upfront"] = formatCompactNumber(
        renovationConst + houseCost * 0.2 + 7_000
    );

    const mortageMonthly = (houseCost * 663) / 140_000;
    printTable["Monthly Mortage"] = formatCompactNumber(mortageMonthly, "/month");

    const expenses = mortageMonthly + houseCost * 0.0004;
    printTable["Monthly Expenses total"] = formatCompactNumber(expenses, "/month");

    const returnRatio = expectedYield / expenses;
    printTable["Return Ratio (yield/expenses)"] = returnRatio.toFixed(3);

    return printTable;
}

function formatCompactNumber(number: number, append?: string) {
    let fmtNumber;

    if (number < 1000) {
        fmtNumber = number.toFixed();
    } else if (number >= 1000 && number < 1_000_000) {
        fmtNumber = (number / 1000).toFixed(1) + "K";
    } else if (number >= 1_000_000 && number < 1_000_000_000) {
        fmtNumber = (number / 1_000_000).toFixed(1) + "M";
    } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
        fmtNumber = (number / 1_000_000_000).toFixed(1) + "B";
    } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
        fmtNumber = (number / 1_000_000_000_000).toFixed(1) + "T";
    }
    return `${fmtNumber} EUR${append ? `${append}` : ""}`;
}