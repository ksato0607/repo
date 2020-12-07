function greeter(person: string) {
    return "Hello, " + person;
}

const user = "Jane User";

document.body.textContent = greeter(user);