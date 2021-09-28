import {data} from "./data.js"

/**
 * 
 * @param id если нужно вернуть конкретную карточку, передать id карточки
 * @param numberItems если нужно вернуть не все карточки, передать количество карточек
 * @returns массив карточек или конкретная карточка, если указано id карточки
 */
export function getCardsData(id: any = null, numberItems: any = null) {
    return cardAdapter(data, id, numberItems);
}

/**
 * 
 * @param dataArray массив карточек с бекенда
 * @param id если нужно вернуть конкретную карточку, передать id карточки
 * @param numberItems если нужно вернуть не все карточки, передать количество карточек
 * @returns отформатированный массив карточек или конкретная карточка в массиве, если передано id карточки
 */
function cardAdapter(dataArray: any, id: any = null, numberItems: any = null) {
    let currentArray: any =[...dataArray];
        
    if(numberItems) {
        currentArray = currentArray.slice(0, numberItems)
    }

    let newData: any =  currentArray.map((item: any) => {
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
        return newData.filter((item: any) => { return item.id === Number(id) })
    }else{
        return newData
    }
}
