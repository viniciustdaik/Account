var signInInfo, emailInput, passwordInput, signInButton, signUpButton, signOutButton, deleteButton,
    googleSignInButton;

var userInfo;

var nameInput, accountPhoto;

var initialWidth, initialHeight, newWidthAdded = 0;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);//iPad

function setup() {
    createCanvas(windowWidth, windowHeight);

    var xMinus = !isMobile ? 0 : 17.5;

    initialWidth = width;
    initialHeight = height;

    emailInput = createInput("").attribute("placeholder", "Email");
    if (!isMobile) {
        emailInput.size(400, 30);
        emailInput.position(width / 2 - 185, height / 2 - 90);
    } else {
        emailInput.size(width / 1.12, 30);
        emailInput.position(10, height / 2 - 90);
    }
    emailInput.style("border-radius:15px");
    emailInput.style("font-size:25px");

    passwordInput = createInput("").attribute("placeholder", "Senha");
    if (!isMobile) {
        passwordInput.position(width / 2 - 185, height / 2 - 40);
        passwordInput.size(400, 30);
    } else {
        passwordInput.size(width / 1.12, 30);
        passwordInput.position(10, height / 2 - 40);
    }
    passwordInput.style("border-radius:15px");
    passwordInput.style("font-size:25px");

    nameInput = createInput("").attribute("placeholder", "");
    nameInput.position(width / 2 - 60 - xMinus, height / 2 - 90);
    nameInput.size(200, 30);
    nameInput.style("font-size:25px");
    nameInput.style("border-radius:15px");
    nameInput.hide();

    signInButton = createButton("Entrar");
    signInButton.position(width / 2 - 55 - xMinus, height / 2 + 10);
    signInButton.size(150, 50);
    signInButton.style("background-color:blue");
    if (!isMobile) {
        signInButton.style("font-size:45px");
    } else {
        signInButton.style("font-size:35px");
    }
    signInButton.style("border-radius:25px");
    signInButton.style("color:black");
    signInButton.style("cursor:pointer");
    signInButton.mousePressed(() => this.signIn("email&password"));

    signUpButton = createButton("Cadastrar");
    signUpButton.position(width / 2 - 65 - xMinus, height / 2 + 62.5);
    signUpButton.size(170, 50);
    signUpButton.style("background-color:lightblue");
    signUpButton.style("color:black");
    if (!isMobile) {
        signUpButton.style("font-size:35px");
    } else {
        signUpButton.style("font-size:28px");
    }
    signUpButton.style("border-radius:25px");
    signUpButton.style("cursor:pointer");
    signUpButton.mousePressed(() => this.signUp("email&password"));

    googleSignInButton = createButton("");
    googleSignInButton.position(width / 2 - 22.5 - xMinus, height / 2 + 120);
    googleSignInButton.size(80, 80);
    googleSignInButton.style("background-color:white");
    googleSignInButton.style("background-image:url('./assets/googleIconNoBG.png");
    googleSignInButton.style("background-color:#ffffff");
    googleSignInButton.style("background-position:center");
    googleSignInButton.style("background-size:contain");
    googleSignInButton.style("background-repeat:no-repeat");;
    googleSignInButton.style("font-size:45px");
    googleSignInButton.style("border-radius:45px");
    googleSignInButton.style("cursor:pointer");
    googleSignInButton.mousePressed(() => this.signIn("google"));

    signOutButton = createButton("Sair");
    signOutButton.position(width / 2 - 55 - xMinus, height / 2); //height / 2 + 104.5
    signOutButton.size(150, 50);
    signOutButton.style("background-color:red");
    if (!isMobile) {
        signOutButton.style("font-size:45px");
    } else {
        signOutButton.style("font-size:40px");
    }
    signOutButton.style("color:black");
    signOutButton.style("border-radius:25px");
    signOutButton.style("cursor:pointer");
    signOutButton.hide();
    signOutButton.mousePressed(() => this.confirm("signOut"));

    deleteButton = createButton("Deletar");
    deleteButton.position(width / 2 - 65 - xMinus, height / 2 + 52.5); //height / 2 + 184.5
    deleteButton.style("background-color:red");
    if (!isMobile) {
        deleteButton.style("font-size:45px");
    } else {
        deleteButton.style("font-size:38px");
    }
    deleteButton.style("color:black");
    deleteButton.style("border-radius:25px");
    deleteButton.style("cursor:pointer");
    deleteButton.size(170, 50);
    deleteButton.hide();
    deleteButton.mousePressed(() => this.confirm("Delete"));
}

function draw() {
    background("gray");

    if (firebase.auth().currentUser !== null) {
        if (accountPhoto === undefined && firebase.auth().currentUser.photoURL !== null) {
            accountPhoto = createImg(firebase.auth().currentUser.photoURL);
            accountPhoto.position(width / 2 - 20, 5);
            accountPhoto.style("content:contain");
            accountPhoto.style("border-radius:45px");
            accountPhoto.size(50, 50);
        }
        push();
        if (userInfo === undefined && userInfo !== null
            && firebase.auth().currentUser !== null) {
            textAlign("center");
            fill("yellow");
            stroke('gold');
            textSize(55);
            if (userInfo !== null && firebase.auth().currentUser !== null) {
                text("Carregando...", 0 - newWidthAdded / 2, height / 2 - 80, windowWidth);
            }
            stroke('gray');
            var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
            userInfoRef.on("value", data => {
                if (userInfo === undefined && userInfo !== null
                    && firebase.auth().currentUser !== null) {
                    userInfo = data.val();
                    console.log("userInfo:" + userInfo);
                    if (userInfo !== null) {
                        nameInput.value(userInfo.name);
                    }
                }
            });
        } else if (userInfo !== null
            && firebase.auth().currentUser !== null) {
            textSize(25);
            textAlign("right", "center")
            fill("black")
            text("Nome: ", nameInput.x - newWidthAdded / 2, nameInput.y + 18);
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

        textAlign("center", "top");
        fill("black");
        textSize(45);
        textWrap("CHAR");
        //text("uid: " + firebase.auth().currentUser.uid, windowWidth / 2 - newWidthAdded / 2, 35);
        var textX = 0;
        if (accountPhoto !== undefined) {
            textX = 40;
        }
        text("" + firebase.auth().currentUser.email, 0 - newWidthAdded / 2, 25 + textX,
            windowWidth, windowHeight);

        pop();

        signInButton.hide();
        signUpButton.hide();
        emailInput.hide();
        googleSignInButton.hide();
        passwordInput.hide();
        signOutButton.show();
        deleteButton.show();
        if (accountPhoto !== undefined) {
            accountPhoto.show();
        }
    } else {
        signInButton.show();
        signUpButton.show();
        emailInput.show();
        googleSignInButton.show();
        passwordInput.show();
        signOutButton.hide();
        deleteButton.hide();
        nameInput.hide();
        if (accountPhoto !== undefined) {
            accountPhoto.hide();
        }

        if (userInfo === null) {
            userInfo = undefined;
        }
    }

    drawSprites();
}

function signIn(provider) {
    console.log(firebase.auth().currentUser);
    if (emailInput.value() !== "" && passwordInput.value() !== ""
        && provider === "email&password") {
        firebase.auth().signInWithEmailAndPassword(emailInput.value(), passwordInput.value())
            .then(response => {
                console.log(response);
                console.log(firebase.auth().currentUser.uid);

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    if (userInfo === undefined) {
                        userInfo = data.val();
                        console.log("userInfo:" + userInfo);
                        if (userInfo !== null) {
                            nameInput.value(userInfo.name);
                        } else {
                            userInfo = undefined;
                        }
                    }
                });
            }).catch(error => {
                console.log('error: ' + error);
            });
    } else if (provider === "google") {
        var GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                var user = result.user;
                console.log(user);

                if (accountPhoto === undefined && firebase.auth().currentUser.photoURL !== null) {
                    accountPhoto = createImg(firebase.auth().currentUser.photoURL);
                    accountPhoto.position(width / 2 - 20, 5);
                    accountPhoto.style("content:contain");
                    accountPhoto.style("border-radius:45px");
                    accountPhoto.size(50, 50);
                }

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    if (userInfo === undefined && data.val() !== null) {
                        userInfo = data.val();
                        console.log("userInfo:" + userInfo);
                        nameInput.value(userInfo.name);
                    } else {
                        if (data.val() === null) {
                            var displayName = "";
                            if (firebase.auth().currentUser.displayName !== null) {
                                displayName = firebase.auth().currentUser.displayName;
                            }

                            firebase.database().ref("/users/" + firebase.auth().currentUser.uid).update({
                                name: displayName,
                                username: "",
                            });

                            var userInfoRef = firebase.database().ref("/users/"
                                + firebase.auth().currentUser.uid);
                            userInfoRef.on("value", data2 => {
                                if (userInfo === undefined) {
                                    userInfo = data2.val();
                                    console.log("userInfo:" + userInfo);
                                    if (userInfo !== null) {
                                        nameInput.value(userInfo.name);
                                    } else {
                                        userInfo = undefined;
                                    }
                                }
                            });
                        }
                    }
                });
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
}

function signUp(provider) {
    if (emailInput.value() !== "" && passwordInput.value() !== ""
        && provider === "email&password") {
        firebase.auth().createUserWithEmailAndPassword(emailInput.value(), passwordInput.value())
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                print(userCredential);
                firebase.database().ref("/users/" + firebase.auth().currentUser.uid).update({
                    name: "",
                    username: "",
                });

                var userInfoRef = firebase.database().ref("/users/" + firebase.auth().currentUser.uid);
                userInfoRef.on("value", data => {
                    if (userInfo === undefined) {
                        userInfo = data.val();
                        console.log("userInfo:" + userInfo);
                        if (userInfo !== null) {
                            nameInput.value(userInfo.name);
                        } else {
                            userInfo = undefined;
                        }
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
    if (accountPhoto !== undefined) {
        accountPhoto.hide();
        accountPhoto = undefined;
    }
}

function Delete() {
    firebase.database().ref("/users/" + firebase.auth().currentUser.uid).remove();
    firebase.auth().currentUser.delete();
    nameInput.hide();
    if (accountPhoto !== undefined) {
        accountPhoto.hide();
        accountPhoto = undefined;
    }
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

function windowResized() {
    if (windowWidth >= 295 && !isMobile) {
        resizeCanvas(windowWidth, windowHeight);
        emailInput.position(windowWidth / 2 - 185, height / 2 - 90);
        passwordInput.position(windowWidth / 2 - 85, height / 2 - 50);
        googleSignInButton.position(windowWidth / 2 - 22.5, height / 2 + 110);
        nameInput.position(windowWidth / 2 - 60, height / 2 - 90);
        if (accountPhoto !== undefined) {
            accountPhoto.position(windowWidth / 2 - 20, 5);
        }
        signInButton.position(windowWidth / 2 - 55, height / 2);
        signUpButton.position(windowWidth / 2 - 65, height / 2 + 52.5);
        signOutButton.position(windowWidth / 2 - 55, height / 2); //height / 2 + 104.5
        deleteButton.position(windowWidth / 2 - 65, height / 2 + 52.5); //height / 2 + 184.5
        if (initialWidth !== width) {
            newWidthAdded = width - initialWidth;
        } else {
            newWidthAdded = 0;
        }
    }
}