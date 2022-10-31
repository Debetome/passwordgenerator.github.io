const generateBtn = document.getElementById("generate")
const copyBtn = document.getElementById("copy-password")
const clearBtn = document.getElementById("clear")

const passwordField = document.getElementById("password-field")
const lengthField = document.querySelector(".length-field input")

const charOptions = [...document.querySelectorAll(".check-options .check-option")]

const LOCAL_STORAGE_KEY = "passwordGenerator.app"

let stateData = {
    charOptions: [true, false, true, false],
    lengthFieldValue: 15,
}

function saveCurrentState() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateData))
}

// Defining initial state
function loadStateFromLocalStorage() {
    const storedState = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedState) stateData = JSON.parse(storedState)
    setCheckBoxesState()
    setInputLengthState()
}

function setCheckBoxesState() {
    for (let i=0; i<charOptions.length; i++) {
        charOptions[i].querySelector("input").checked = stateData.charOptions[i]
    }
}

function setInputLengthState() {
    lengthField.value = stateData.lengthFieldValue
}


// Defining events
function defineEvents() {
    defineCheckBoxesEvents()
    defineLengthInputEvent()
}

function defineCheckBoxesEvents() {
    for (let i=0; i<charOptions.length; i++) {
        charOptions[i].addEventListener("change", () => {
            stateData.charOptions[i] = !stateData.charOptions[i]
            saveCurrentState()
        })
    }
}

function defineLengthInputEvent() {
    lengthField.addEventListener("change", () => {
        stateData.lengthFieldValue = lengthField.value
        saveCurrentState()
    })
}


// Main logic
function getChars() {
    const charOptions = [...document.querySelectorAll(".check-options .check-option")]
    const checkedOptions = charOptions.filter(option => option.querySelector("input").checked === true)
    const chars = checkedOptions.map(option => option.querySelector("label").innerText)
    return chars
}

function generatePassword() {
    const charOptions = getChars()
    const length = lengthField.value

    if (charOptions.length === 0) return
    if (length === 0) return

    const chars = charOptions.reduce((current, item) => {
        return `${current}${item}`
    }, "").split("")

    let password = ""

    for (let i=0; i<length; i++) {
        const index = Math.floor(Math.random() * chars.length)
        const randomChar = chars[index]
        password = `${password}${randomChar}`
    }

    passwordField.value = password
}

function copyPassword() {
    navigator.clipboard.writeText(passwordField.value).then(() => {
        console.log("Password was copied to the clipboard")
    }, (err) => {
        console.err("Unable to copy password", err)
    })
}

// Initial instructions
generateBtn.addEventListener("click", () => {
    generatePassword()
})

copyBtn.addEventListener("click", () => {
    copyPassword()
})

clearBtn.addEventListener("click", () => {
    passwordField.value = ""
    console.log("Password cleared!")
})

loadStateFromLocalStorage()
defineEvents()
generatePassword()