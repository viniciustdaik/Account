var signInInfo, emailInput, passwordInput, signInButton, signUpButton, signOutButton, deleteButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    emailInput = createInput("viniciuskriiger2008@gmail.com").attribute("placeholder", "Email");
    emailInput.position(width / 2 - 65, height / 2 - 90);
    emailInput.size(200, 30);

    passwordInput = createInput("").attribute("placeholder", "Senha");
    passwordInput.position(width / 2 - 65, height / 2 - 50);
    passwordInput.size(200, 30);

    signInButton = createButton("Entrar");
    signInButton.position(width / 2 - 35, height / 2);
    signInButton.size(150, 50);
    signInButton.mousePressed(() => this.signIn());

    signUpButton = createButton("Cadastrar");
    signUpButton.position(width / 2 - 35, height / 2 + 52.5);
    signUpButton.size(150, 50);
    signUpButton.mousePressed(() => this.signUp());

    signOutButton = createButton("Sair");
    signOutButton.position(width / 2 - 35, height / 2 + 104.5);
    signOutButton.size(150, 50);
    signOutButton.mousePressed(() => this.signOut());

    deleteButton = createButton("Deletar");
    deleteButton.position(width / 2 - 45, height / 2 + 184.5);
    deleteButton.style("background-color:red");
    deleteButton.style("font-size:45px");
    deleteButton.size(170, 50);
    deleteButton.mousePressed(() => this.Delete());
}

function draw() {
    background("gray");

    if (firebase.auth().currentUser !== null) {
        textAlign("center");
        fill("black");
        textSize(45);
        //text("uid: " + firebase.auth().currentUser.uid, width / 2, 35);
        text("" + firebase.auth().currentUser.email, width / 2, 35);
    }

    drawSprites();
}

function signIn() {
    console.log(firebase.auth().currentUser);
    if (emailInput.value() !== "" && passwordInput.value() !== "") {
        firebase.auth().signInWithEmailAndPassword(emailInput.value(), passwordInput.value())
            .then(response => {
                console.log(response);
                console.log(firebase.auth().currentUser.uid);
            }).catch(error => {
                console.log('error: ' + error);
            });
    }
}

function signUp() {
    if (emailInput.value() !== "" && passwordInput.value() !== "") {
        firebase.auth().createUserWithEmailAndPassword(emailInput.value(), passwordInput.value())
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                print(userCredential);
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).update({
                    email: emailInput.value(),
                    name: "",
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                print(errorMessage, " errorCode: " + errorCode);
            });
    }
}

function signOut() {
    firebase.auth().signOut();
}

function Delete() {
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid).remove();
    firebase.auth().currentUser.delete();
}
