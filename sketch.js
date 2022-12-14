var signInInfo, emailInput, passwordInput, signInButton, signUpButton, signOutButton, deleteButton;

var userInfo;

var nameInput;

function setup() {
    createCanvas(windowWidth, windowHeight);

    emailInput = createInput("viniciuskriiger2008@gmail.com").attribute("placeholder", "Email");
    emailInput.position(width / 2 - 185, height / 2 - 90);
    emailInput.size(400, 30);
    emailInput.style("border-radius:15px");
    emailInput.style("font-size:25px");

    passwordInput = createInput("").attribute("placeholder", "Senha");
    passwordInput.position(width / 2 - 85, height / 2 - 50);
    passwordInput.size(200, 30);
    passwordInput.style("border-radius:15px");
    passwordInput.style("font-size:25px");

    nameInput = createInput("").attribute("placeholder", "");
    nameInput.position(width / 2 - 60, height / 2 - 90);
    nameInput.size(200, 30);
    nameInput.style("font-size:25px");
    nameInput.style("border-radius:15px");
    nameInput.hide();

    signInButton = createButton("Entrar");
    signInButton.position(width / 2 - 55, height / 2);
    signInButton.size(150, 50);
    signInButton.style("background-color:blue");
    signInButton.style("font-size:45px");
    signInButton.style("border-radius:25px");
    signInButton.style("cursor:pointer");
    signInButton.mousePressed(() => this.signIn());

    signUpButton = createButton("Cadastrar");
    signUpButton.position(width / 2 - 65, height / 2 + 52.5);
    signUpButton.size(170, 50);
    signUpButton.style("background-color:lightblue");
    signUpButton.style("font-size:35px");
    signUpButton.style("border-radius:25px");
    signUpButton.style("cursor:pointer");
    signUpButton.mousePressed(() => this.signUp());

    signOutButton = createButton("Sair");
    signOutButton.position(width / 2 - 55, height / 2); //height / 2 + 104.5
    signOutButton.size(150, 50);
    signOutButton.style("background-color:red");
    signOutButton.style("font-size:45px");
    signOutButton.style("border-radius:25px");
    signOutButton.style("cursor:pointer");
    signOutButton.hide();
    signOutButton.mousePressed(() => this.confirm("signOut"));

    deleteButton = createButton("Deletar");
    deleteButton.position(width / 2 - 65, height / 2 + 52.5); //height / 2 + 184.5
    deleteButton.style("background-color:red");
    deleteButton.style("font-size:45px");
    deleteButton.style("border-radius:25px");
    deleteButton.style("cursor:pointer");
    deleteButton.size(170, 50);
    deleteButton.hide();
    deleteButton.mousePressed(() => this.confirm("Delete"));
}

function draw() {
    background("gray");

    if (firebase.auth().currentUser !== null) {
        push();
        if (userInfo === undefined) {
            var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
            userInfoRef.on("value", data => {
                if (userInfo === undefined) {
                    userInfo = data.val();
                    console.log("userInfo:" + userInfo);
                    nameInput.value(userInfo.name);
                }
            });
        } else {
            textSize(25);
            textAlign("right", "center")
            fill("black")
            text("Nome: ", nameInput.x, nameInput.y + 18);
            nameInput.show();
            if (nameInput.value() !== userInfo.name) {
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).update({
                    name: nameInput.value(),
                });

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    userInfo = data.val();
                    //console.log("userInfo:" + userInfo);
                });
            }
        }

        textAlign("center");
        fill("black");
        textSize(45);
        //text("uid: " + firebase.auth().currentUser.uid, width / 2, 35);
        text("" + firebase.auth().currentUser.email, width / 2, 35);

        pop();

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
        nameInput.hide();
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

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    if (userInfo === undefined) {
                        userInfo = data.val();
                        console.log("userInfo:" + userInfo);
                        nameInput.value(userInfo.name);
                    }
                });
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
                    username: "",
                });

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    if (userInfo === undefined) {
                        userInfo = data.val();
                        console.log("userInfo:" + userInfo);
                        nameInput.value(userInfo.name);
                    }
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
    userInfo = undefined;
}

function Delete() {
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid).remove();
    firebase.auth().currentUser.delete();
    userInfo = undefined;
}

function confirm(ThingToConfirm) {
    /*swal(
        {
            title: `Tem Certeza Que Você Quer Sair?`,
            dangerMode: true,
            buttons: true,
        },
    );*/


    Swal.fire({
        title: ThingToConfirm === "signOut" ?
            'Tem Certeza Que Você Quer Sair?' : 'Tem certeza que você quer DELETAR sua conta?',
        //text:
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim!',
        cancelButtonText: 'Não!',
    }).then((result) => {
        if (result.isConfirmed) {
            /*Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )*/

            ThingToConfirm === "signOut" ?
                signOut() : Delete();
        }
    })

}