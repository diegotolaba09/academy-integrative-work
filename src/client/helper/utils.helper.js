const MAX_AGE = 65;
const MIN_AGE = 18;
const MIN_CODE = 100;
const MAX_CODE = 999;

const validationData = (event) => {
    if (!event.dni || !event.firstName || !event.lastName || !event.birthday) {
        throw new Error("All fields are required!");
    }
    const age = getAge(event.birthday);

    if (age > MAX_AGE || age < MIN_AGE) {
        throw new Error("Age not required!");
    }
    return event;
};

const getAge = (birthday) => {
    const birthdayArr = birthday.split("/");
    const birthdayDate = new Date(
        birthdayArr[2],
        birthdayArr[1] - 1,
        birthdayArr[0]
    );
    const ageDifMs = Date.now() - birthdayDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const getBirthdayGift = (birthday) => {
    const birthdayArr = birthday.split("/");
    const season = getSeason(birthdayArr[1]);
    return {
        Otoño: "Buzo",
        Invierno: "Sweater",
        Primavera: "Camisa",
        Verano: "Remera",
    }[season];
};

const getSeason = (month) => {
    if (3 <= month && month <= 5) {
        return "Otoño";
    }

    if (6 <= month && month <= 8) {
        return "Invierno";
    }

    if (9 <= month && month <= 11) {
        return "Primavera";
    }
    return "Verano";
};

const getGiftFormatData = (data, gift) => {
    const formatData = {
        Key: { dni: data.Item.dni },
        ExpressionAttributeValues: {
            ":gift": gift,
        },
        UpdateExpression: "set gift = :gift",
        ReturnValues: "ALL_NEW",
    };

    return formatData;
};

const getCardFormatData = (client, cardType) => {
    const data = {
        ...client.Item,
        cardType: cardType,
        expiration: getExpiration(),
        code: generateCode(),
    };

    const formatData = {
        Key: { dni: data.dni },
        ExpressionAttributeValues: {
            ":cardType": data.cardType,
            ":expiration": data.expiration,
            ":code": data.code,
        },
        UpdateExpression:
            "set cardType = :cardType, expiration = :expiration, code = :code",
        ReturnValues: "ALL_NEW",
    };

    return formatData;
};

const getClientFormatData = ({ dni, firstName, lastName, birthday }) => {
    const formatData = {
        Key: { dni },
        ExpressionAttributeValues: {
            ":firstName": firstName,
            ":lastName": lastName,
            ":birthday": birthday,
        },
        UpdateExpression: "set firstName = :firstName, lastName = :lastName, birthday = :birthday",
        ReturnValues: "ALL_NEW",
    };

    return formatData;
};

const generateCode = () => {
    return Math.floor(Math.random() * (MAX_CODE - MIN_CODE) + MIN_CODE);
};

const getExpiration = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 5);
    const result = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    return result;
};

const getCardType = (age) => {
    let cardType = "Classic";

    if (age > 45) {
        cardType = "Gold";
    }

    return cardType
}

module.exports = { validationData, getCardType, getAge, getBirthdayGift, getClientFormatData, getGiftFormatData, getCardFormatData }