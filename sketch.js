var signInInfo, emailInput, passwordInput, signInButton, signUpButton, signOutButton, deleteButton;

function setup() {
    createCanvas(windowWidth, windowHeight);

    emailInput = createInput("viniciuskriiger2008@gmail.com").attribute("placeholder", "Email");
    emailInput.position(width / 2 - 85, height / 2 - 90);
    emailInput.size(200, 30);

    passwordInput = createInput("").attribute("placeholder", "Senha");
    passwordInput.position(width / 2 - 85, height / 2 - 50);
    passwordInput.size(200, 30);

    signInButton = createButton("Entrar");
    signInButton.position(width / 2 - 55, height / 2);
    signInButton.size(150, 50);
    signInButton.style("background-color:blue");
    signInButton.style("font-size:45px");
    signInButton.style("border-radius:25px");
    signInButton.mousePressed(() => this.signIn());

    signUpButton = createButton("Cadastrar");
    signUpButton.position(width / 2 - 65, height / 2 + 52.5);
    signUpButton.size(170, 50);
    signUpButton.style("background-color:lightblue");
    signUpButton.style("font-size:35px");
    signUpButton.style("border-radius:25px");
    signUpButton.mousePressed(() => this.signUp());

    signOutButton = createButton("Sair");
    signOutButton.position(width / 2 - 55, height / 2); //height / 2 + 104.5
    signOutButton.size(150, 50);
    signOutButton.style("background-color:red");
    signOutButton.style("font-size:45px");
    signOutButton.style("border-radius:25px");
    signOutButton.hide();
    signOutButton.mousePressed(() => this.signOut());

    deleteButton = createButton("Deletar");
    deleteButton.position(width / 2 - 65, height / 2 + 52.5); //height / 2 + 184.5
    deleteButton.style("background-color:red");
    deleteButton.style("font-size:45px");
    deleteButton.style("border-radius:25px");
    deleteButton.size(170, 50);
    deleteButton.hide();
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

        signInButton.hide();
        signUpButton.hide();
        emailInput.hide();
        passwordInput.hide();
        signOutButton.show();
        deleteButton.show();
    } else {
        signInButton.show();
        signUpButton.show();
        emailInput.show();
        passwordInput.show();
        signOutButton.hide();
        deleteButton.hide();
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
