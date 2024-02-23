const rulesElement = document.getElementById("rules")

// Prüft, ob das Passwort die Regel erfüllt
function checkRule(ruleNumber, password) {
    const ruleElement = document.getElementById(`rule-${ruleNumber + 1}`)

    if (rules[ruleNumber].test(password)) {
        ruleElement.classList.remove("violated-rule")
        return false
    } else {
        ruleElement.classList.add("violated-rule")
        return true
    }
}

// Sortiert die Regeln nach Erfüllung und Nummerierung
function sortRules() {
    const ruleElements = []

    for (let ruleNumber = 0; ruleNumber < rules.length; ruleNumber++) {
        const ruleElement = document.getElementById(`rule-${ruleNumber + 1}`)
        ruleElements.push(ruleElement)
        rulesElement.removeChild(ruleElement)
    }

    ruleElements.sort((a, b) => {
        return a.classList.contains("violated-rule") - b.classList.contains("violated-rule")
    })

    ruleElements.reverse()

    ruleElements.forEach(ruleElement => rulesElement.appendChild(ruleElement))
}

// Generiert die nächste Regel
function generateNextRule(password) {
    // Neue Regel generieren
    const ruleGenerator = ruleGenerators[rules.length]
    const rule = ruleGenerator(password)
    rules.push(rule)

    // Nummer der Regel
    const ruleNumber = rules.length

    // Regel-Element erstellen und hinzufügen
    const ruleElement = document.createElement("div")
    ruleElement.id = `rule-${ruleNumber}`
    ruleElement.classList.add("rule")
    const ruleTitleElement = document.createElement("h3")
    ruleTitleElement.classList.add("rule-title")
    ruleTitleElement.innerText = `Rule ${ruleNumber}`
    ruleElement.appendChild(ruleTitleElement)
    const ruleDescriptionElement = document.createElement("p")
    ruleDescriptionElement.classList.add("rule-description")
    ruleDescriptionElement.innerHTML = rule.description
    ruleElement.appendChild(ruleDescriptionElement)
    rulesElement.appendChild(ruleElement)
    
    // checkPassword aufrufen, um zu prüfen, ob alle Regeln erfüllt sind
    checkPassword()
}

// Prüft das Passwort auf alle Regeln
function checkPassword() {
    const password = document.getElementById("password").innerHTML;

    let violatedRules = 0
    for (let rule = 0; rule < rules.length; rule++) {
        if (checkRule(rule, password)) {
            violatedRules++
        }
    }

    sortRules()

    if (violatedRules == 0) {
        if (ruleGenerators.length > rules.length) {
            // Es gibt noch mehr Regeln, die man generieren kann
            generateNextRule(password)
        } else {
            // Alle Regeln erfüllt
            alert("You won!")
        }
    }
}

// Erste Regel generieren
generateNextRule()

// Event-Listener für das Passwort hinzufügen
document.getElementById("password").addEventListener("input", checkPassword)