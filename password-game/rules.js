const rules = []

const ruleGenerators = [
    () => {
        return {
            description: "Your password must be at least 8 characters long",
            test: password => password.length >= 8
        }
    },
    password => {
        const numbers = (password.match(/[0-9]/g) || []).length + 2 + Math.floor(Math.random() * 3)
        return {
            description: `Your password must contain at least ${numbers} numbers`,
            test: password => (password.match(/[0-9]/g) || []).length >= numbers
        }
    },
    password => {
        const specialCharacters = (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length + 1 + Math.floor(Math.random() * 2)
        return {
            description: `Your password must contain at least ${specialCharacters} special characters`,
            test: password => (password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) || []).length >= specialCharacters
        }
    },
    password => {
        const uppercaseLetters = (password.match(/[A-Z]/g) || []).length + 1 + Math.floor(Math.random() * 3)
        return {
            description: `Your password must contain at least ${uppercaseLetters} uppercase letters`,
            test: password => (password.match(/[A-Z]/g) || []).length >= uppercaseLetters
        }
    },
    () => {
        return {
            description: `Your password must contain a roman numeral`,
            test: password => (password.match(/[IVXLCDM]/g) || []).length > 0
        }
    },
    password => {
        const numbers = password.match(/[0-9]/g) || []
        var sum = 33 + Math.floor(Math.random() * 3)
        numbers.forEach(number => sum += parseInt(number))
        return {
            description: `The sum of digits in your password has to be ${sum}`,
            test: password => {
                const numbers = password.match(/[0-9]/g) || []
                var actualSum = 0
                numbers.forEach(number => actualSum += parseInt(number))
                return actualSum == sum
            }
        }
    },
    () => {
        const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()]
        return {
            description: "Your password must contain the day of the week",
            test: password => (password.match(new RegExp(day, "g")) || []).length > 0
        }
    },
    password => {
        const calculate = password => {
            var sum = 0
            sum += (password.match(/I/g) || []).length
            sum += (password.match(/V/g) || []).length * 5
            sum += (password.match(/X/g) || []).length * 10
            sum += (password.match(/L/g) || []).length * 50
            sum += (password.match(/C/g) || []).length * 100
            sum += (password.match(/D/g) || []).length * 500
            sum += (password.match(/M/g) || []).length * 1000
            return sum
        }
        const sum = calculate(password) + 30 + Math.floor(Math.random() * 7)
        return {
            description: `The roman numerals in your password should multiply to ${sum}`,
            test: password => calculate(password) % sum == 0
        }
    },
    () => {
        const celebrity = celebrities[Math.floor(Math.random() * celebrities.length)]
        return {
            description: `Your password must contain the birth date of ${celebrity.name}`,
            test: password => celebrity.birth_date.test(password)
        }
    },
    () => {
        return {
            description: "Please take care of my pufferfish Puffi 🐡 and protect him in a secure password",
            test: password => /🐡/g.test(password).length == 1
        }
    },
    () => {
        return {
            description: "Maximum password length is 32 characters",
            test: password => password.length <= 32
        }
    }
]