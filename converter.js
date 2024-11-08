const validUsername = "user"; 
const validPassword = "password"; 


function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("converter").style.display = "block";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}


async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const resultElement = document.getElementById("result");
    const apiErrorElement = document.getElementById("apiError");

    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        const rate = data.rates[toCurrency];
        if (!rate) throw new Error("Invalid currency conversion");

        const convertedAmount = (amount * rate).toFixed(2);
        resultElement.textContent = ${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency};
        apiErrorElement.style.display = "none"; 
    } catch (error) {
        console.error("Error fetching currency conversion rate:", error);
        apiErrorElement.style.display = "block"; 
        resultElement.textContent = ""; 
    }
}