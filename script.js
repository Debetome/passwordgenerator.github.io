const generateBtn = document.getElementById("generate")
const copyBtn = document.getElementById("copy-password")
const clearBtn = document.getElementById("clear")

const passwordField = document.getElementById("password-field")

function getChars() {
    const options = [...document.querySelectorAll(".check-options .check-option")]
    const checkedOptions = options.filter(option => option.querySelector("input").checked === true)
    const chars = checkedOptions.map(option => option.querySelector("label").innerText)
    return chars
}

function generatePassword() {
    const charOptions = getChars()
    const length = document.querySelector(".length-field input").value

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