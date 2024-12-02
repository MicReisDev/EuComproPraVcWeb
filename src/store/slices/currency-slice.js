const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "R$",
        currencyName: "BRL",
        currencyRate: 1
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

            if (currencyName === "BRL") {
                return state = {
                    currencySymbol: "R$",
                    currencyRate: 1,
                    currencyName
                };
            }
            if (currencyName === "EUR") {
                return state = {
                    currencySymbol: "€",
                    currencyRate: 1,
                    currencyName
                };
            }
            if (currencyName === "GBP") {
                return state = {
                    currencySymbol: "£",
                    currencyRate: 1,
                    currencyName
                };
            }
        }
    },
});

export default currencySlice.reducer;
