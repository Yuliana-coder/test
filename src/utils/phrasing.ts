export function getYearsPhrase(age: any) {
    let result = "лет";
    if((age.toString())[(age.toString()).length - 1] == "1") {
        result = "года";
    }

    return result;
}

export function getMonthsPhrase(months: any) {
    let result = "мясяцев";
    if((months.toString())[(months.toString()).length - 1] == "1") {
        result = "мясяца";
    }

    return result;
}

export function getDocumentsPhrase(months: any) {
    let result = "документа";
    if((months.toString())[(months.toString()).length - 1] == "1") {
        result = "документ";
    }else if((months.toString())[(months.toString()).length - 1] == "0") {
        result = "документов";
    }

    return result;
}
