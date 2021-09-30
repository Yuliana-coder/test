import {data} from "./data.js"

/**
 * возвращает список карточек или карточку по id
 * @param id если нужно вернуть конкретную карточку, передать id карточки
 * @param numberItems если нужно вернуть не все карточки, передать количество карточек
 * @returns массив карточек или конкретная карточка, если указано id карточки
 */
export function getCardsData(id: any = null, numberItems: any = null, sortField: any = "rateFrom", filters: any = []) {
    // return cardAdapter(data, id, numberItems).sort(byField(sortField));
    return cardAdapter(data, id, numberItems, sortField, filters);
}


function byField(field: any) {
    return (a: any, b: any) => a[field] > b[field] ? 1 : -1;
}

/**
 * возвращает отформатированную структуру данных
 * @param dataArray массив карточек с бекенда
 * @param id если нужно вернуть конкретную карточку, передать id карточки
 * @param numberItems если нужно вернуть не все карточки, передать количество карточек
 * @returns отформатированный массив карточек или конкретная карточка в массиве, если передано id карточки
 */
function cardAdapter(dataArray: any, id: any = null, numberItems: any = null, sortField = "rateFrom", filters=[]) {
    let currentArray: any =[...dataArray];
        
    // if(numberItems) {
    //     currentArray = currentArray.slice(0, numberItems)
    // }

    let newData: any =  [...currentArray].map((item: any) => {
        return {
            id: [...dataArray].indexOf(item) + 1,
            logo: item.organization?.logo,
            rateFrom: item.rate?.periods[0]?.rate?.from,
            rateTo: item.rate?.periods[0]?.rate?.to,
            name: item.name,
            creditAmountFrom: item.rate?.creditAmount?.from,
            creditAmountTo: item.rate?.creditAmount?.to,
            termFrom: item.rate?.periods[0]?.term?.from,
            termTo: item.rate?.periods[0]?.term?.to,
            ageFrom: item.customerRequirements?.age,
            lastExperience: item.customerRequirements?.lastExperience,
            documents: item.customerRequirements?.documents,
            license: item.organization?.license,
            organization: item.organization?.name,
            initialAmount: item.rate?.initialAmount?.from
        }
    })

    if(id) {        
        return {totalNumber: 1, data:  [...newData].filter((item: any) => { return item.id === Number(id) })}; 
    }else{
        let result: any = [...newData];
        
        if(localStorage.getItem("sorting")) {
            result = newData.sort(byField(sortField))
        }
                
        if(Object.keys(filters) && filters.filter((item: any) => { return Object.values(item)[0] }).length) {
            filters.forEach((item: any) => {
                result = result.filter((item1: any) => {
                    return Object.values(item)[0] ? item1[Object.keys(item)[0]] === Object.values(item)[0] : true
                })
            })
        }

        return numberItems ? {totalNumber: result.length, data: result.slice(0, numberItems)} : {totalNumber: result.length, data: result};
    }
}

/**
 * "запрос" на общее количество карточек
 */
export function getTotalNumberCards() { 
    return data.length;
}
