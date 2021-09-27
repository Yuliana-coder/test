export function getYearsPhrase(age: any) {
    let result = "лет";
    if(age[age.length - 1] == "1") {
        result = "года";
    }

    return result;
}
