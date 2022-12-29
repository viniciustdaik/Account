var emailInput, passwordInput, signInButton, signUpButton, signOutButton, deleteButton,
    googleSignInButton, verifyEmailButton, applyChangesButton, verifyButtonCooldownDone = true;

var userInfo;

var usernameInput, nameInput, accountPhoto;

var initialWidth, initialHeight, newWidthAdded = 0;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);//iPad

function setup() {
    createCanvas(windowWidth, windowHeight);

    initialWidth = width;
    initialHeight = height;

    emailInput = createInput("").attribute("placeholder", "Email");
    if (!isMobile) {
        emailInput.size(400, 30);
        emailInput.position(width / 2 - 185, height / 2 - 90);
    } else {
        emailInput.size(width / 1.12, 30);//width / 1.12
        //emailInput.style("width:89%");
        emailInput.position(10, height / 2 - 90);
    }
    emailInput.style("border-radius:15px");
    emailInput.style("font-size:25px");

    passwordInput = createInput("").attribute("placeholder", "Senha");
    if (!isMobile) {
        passwordInput.position(width / 2 - 185, height / 2 - 40);
        passwordInput.size(400, 30);
    } else {
        passwordInput.size(width / 1.12, 30);//width / 1.12
        //passwordInput.style("width:89%");
        passwordInput.position(10, height / 2 - 40);
    }
    passwordInput.style("border-radius:15px");
    passwordInput.style("font-size:25px");

    nameInput = createInput("").attribute("placeholder", "");
    if (!isMobile || isMobile && width < height) {
        nameInput.position(width / 2 - 90 - 17.5, height / 2 - 90);//width / 2 - 60 - 17.5
    } else if (isMobile && width >= height) {
        nameInput.position(width / 2 - 90 - 17.5, height / 2 - 50);//width / 2 - 60 - 17.5
    }
    nameInput.size(200, 30);
    nameInput.style("font-size:25px");
    nameInput.style("border-radius:15px");
    nameInput.hide();

    usernameInput = createInput("").attribute("placeholder", "");
    if (!isMobile || isMobile && width < height) {
        usernameInput.position(width / 2 - 90 - 17.5, height / 2 - 160);
    } else if (isMobile && width >= height) {
        usernameInput.position(width / 2 - 90 - 17.5, height / 2 - 60);
    }
    usernameInput.size(200, 30);
    usernameInput.style("font-size:25px");
    usernameInput.style("border-radius:15px");
    usernameInput.hide();

    signInButton = createButton("Entrar");
    signInButton.position(width / 2 - 55 - 17.5, height / 2 + 10);//, height / 2
    signInButton.size(150, 50);
    signInButton.style("background-color:blue");
    if (!isMobile) {
        signInButton.style("font-size:45px");
    } else {
        signInButton.style("font-size:35px");
    }
    signInButton.style("border-radius:25px");
    signInButton.style("color:white");
    signInButton.style("cursor:pointer");
    signInButton.mousePressed(() => this.signIn("email&password"));

    signUpButton = createButton("Cadastrar");
    signUpButton.hide();
    signUpButton.position(width / 2 - 65 - 17.5, height / 2 + 62.5);
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
    googleSignInButton.position(width / 2 - 22.5 - 17.5, height / 2 + 65); //, height / 2 + 120
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
    signOutButton.size(150, 50);
    signOutButton.style("background-color:red");
    if (!isMobile) {
        signOutButton.style("font-size:45px");
        //signOutButton.position(width / 2 - 55 - 17.5, height / 2); //height / 2 + 104.5
    } else {
        signOutButton.style("font-size:40px");
        //signOutButton.position(width - 135 - 17.5, 5);
    }
    if (!isMobile || isMobile && width < height) {
        var YNum = 0;
        if (isMobile) {
            YNum = 10;
        }
        signOutButton.position(width / 2 - 55 - 17.5, height / 2 + YNum); //height / 2 + 104.5
    } else if (isMobile && width >= height) {
        signOutButton.position(width - 135 - 17.5, 5);
    }
    signOutButton.style("color:white");
    signOutButton.style("border-radius:25px");
    signOutButton.style("cursor:pointer");
    signOutButton.hide();
    signOutButton.mousePressed(() => this.confirm("signOut"));

    deleteButton = createButton("Deletar");
    deleteButton.style("background-color:red");
    if (!isMobile) {
        deleteButton.style("font-size:45px");
        //deleteButton.position(width / 2 - 65 - 17.5, height / 2 + 52.5); //height / 2 + 184.5
    } else {
        deleteButton.style("font-size:38px");
        //deleteButton.position(20 - 17.5, 5);
    }
    if (!isMobile || isMobile && width < height) {
        var YNum = 0;
        if (isMobile) {
            YNum = 10;
        }
        deleteButton.position(width / 2 - 65 - 17.5, height / 2 + 52.5 + YNum); //height / 2 + 184.5
    } else if (isMobile && width >= height) {
        deleteButton.position(20 - 17.5, 5);
    }
    deleteButton.style("color:white");
    deleteButton.style("border-radius:25px");
    deleteButton.style("cursor:pointer");
    deleteButton.size(170, 50);
    deleteButton.hide();
    deleteButton.mousePressed(() => this.confirm("Delete"));

    verifyEmailButton = createButton("Verificar Email");
    verifyEmailButton.hide();
    if (!isMobile) {
        verifyEmailButton.position(width / 2 - 185, height / 2 - 230);
        verifyEmailButton.size(400, 50);
    } else {
        //verifyEmailButton.size(width / 1.05, 50);
        verifyEmailButton.size(290, 50);
        verifyEmailButton.position(width / 2 - 150, height / 2 - 150);//10, height / 2 - 150
    }
    verifyEmailButton.style("background-color:blue");
    if (!isMobile) {
        verifyEmailButton.style("font-size:45px");
    } else {
        verifyEmailButton.style("font-size:35px");
    }
    verifyEmailButton.style("border-radius:25px");
    verifyEmailButton.style("color:white");
    verifyEmailButton.style("cursor:pointer");
    verifyEmailButton.mousePressed(() => this.emailVerification());

    applyChangesButton = createButton("Salvar");
    applyChangesButton.hide();
    applyChangesButton.size(250, 40);
    if (!isMobile) {
        //applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 - 48);
    } else {
        //applyChangesButton.size(width / 1.05, 50);
        //applyChangesButton.position(10, height / 2 - 48);
        //applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 - 35);
    }
    if (!isMobile) {
        applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 - 48);
    } else if (isMobile && width < height) {
        applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 - 35);
    } else if (isMobile && width >= height) {
        applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 + 5)
    }
    applyChangesButton.style("background-color:#103205");
    applyChangesButton.style("border-color:white");
    if (!isMobile) {
        applyChangesButton.style("font-size:32.5px");
    } else {
        applyChangesButton.style("font-size:30px");
    }
    applyChangesButton.style("border-radius:25px");
    applyChangesButton.style("color:gold");
    applyChangesButton.style("cursor:pointer");
    applyChangesButton.mousePressed(() => this.applyChanges());
}

function draw() {
    background("gray");

    if (firebase.apps.length === 0) {
        //console.log("firebase: " + firebase);
        //console.log("firebase apps length: " + firebase.apps.length);
        fetch("https://viniciustdaik.github.io/Data/Data.json")
            .then((data) => {
                if (data.status === 200) {
                    return data.json();
                } else {
                    return null;
                }
            })
            .then((response) => {
                var responseObject = response;
                //console.log(responseObject);
                if (responseObject && firebase.apps.length === 0) {
                    firebase.initializeApp(responseObject);
                }
            });
    } else {
        if (navigator.onLine === false) {
            push();
            textAlign("center", "top");
            fill("maroon");
            stroke("red");
            textWrap("WORD");
            textSize(35);
            var minusY = 55;
            if (windowWidth <= 247) {
                minusY = 210;
            } else if (windowWidth <= 344) {
                minusY = 170;
            } else if (windowWidth <= 420) {
                minusY = 130;
            } else if (windowWidth <= 836) {
                minusY = 90;
            }
            text("Você Está Offline. Cheque Sua Conexão De Internet.", 0 - newWidthAdded / 2,
                height - minusY, windowWidth, height);
            pop();
        }

        if (keyWentDown("enter")) {
            if (firebase.auth().currentUser !== null) {
                applyChanges();
            } else {
                signIn("email&password");
            }
        }

        /*firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                var uid = user.uid;
                firebase.auth().currentUser.emailVerified = user.emailVerified;
                // ...
            } else {
                // User is signed out
                // ...
            }
        });*/

        if (firebase.auth().currentUser !== null) {
            if (accountPhoto === undefined && firebase.auth().currentUser.photoURL !== null) {
                accountPhoto = createImg(firebase.auth().currentUser.photoURL);
                accountPhoto.position(width / 2 - 25, 5);
                accountPhoto.style("content:contain");
                accountPhoto.style("border-radius:45px");
                accountPhoto.size(50, 50);
            }
            if (firebase.auth().currentUser.emailVerified === true
                || firebase.auth().currentUser === null) {
                verifyEmailButton.hide();
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

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((snapshot) => {
                        if (userInfo === undefined && userInfo !== null
                            && firebase.auth().currentUser !== null) {
                            //snapshot.docs.forEach(doc => {
                            var doc = snapshot;
                            console.log("userInfo:" + doc.data());
                            userInfo = doc.data();
                            if (firebase.auth().currentUser.emailVerified === false) {
                                console.log("Email is not verified.");
                                verifyEmailButton.show();
                            } else {
                                console.log("Email is verified.");
                                verifyEmailButton.hide();
                            }
                            if (firebase.auth().currentUser.displayName !== null
                                && firebase.auth().currentUser.displayName !== undefined) {
                                nameInput.value(firebase.auth().currentUser.displayName);
                            }

                            if (userInfo !== undefined && usernameInput.value() !== userInfo.username) {
                                usernameInput.value(userInfo.username);
                            }
                            //});
                        }
                    });
            } else if (userInfo !== null
                && firebase.auth().currentUser !== null) {
                if (firebase.auth().currentUser.emailVerified === false
                    && userInfo.verifyButtonCooldownDone === undefined) {
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                        .update({
                            verifyButtonCooldownDone: true,
                        });

                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                        .get()
                        .then((snapshot) => {
                            if (userInfo === undefined) {
                                //snapshot.docs.forEach(doc => {
                                var doc = snapshot;
                                console.log("userInfo:" + doc.data());
                                userInfo = doc.data();
                                if (userInfo === null) {
                                    userInfo = undefined;
                                }
                                if (nameInput.value().trim() !== firebase.auth().currentUser.displayName

                                    && nameInput.value() !== "" && firebase.auth().currentUser
                                        .displayName !== null
                                    || nameInput.value().trim() !== firebase.auth().currentUser.displayName

                                    && nameInput.value() === "" && firebase.auth().currentUser
                                        .displayName !== null
                                    || nameInput.value().trim() !== firebase.auth().currentUser.displayName

                                    && nameInput.value() !== "" && firebase.auth().currentUser
                                        .displayName === null) {
                                    nameInput.value(firebase.auth().currentUser.displayName);
                                }

                                if (usernameInput.value() !== userInfo.username) {
                                    usernameInput.value(userInfo.username);
                                }
                                //});
                            }
                        });
                } else if (firebase.auth().currentUser.emailVerified === true
                    && userInfo.verifyButtonCooldownDone !== undefined) {
                    firebase.firestore().collection('users')
                        .doc(firebase.auth().currentUser.uid).update({
                            verifyButtonCooldownDone: firebase.firestore.FieldValue.delete(),
                        });
                } else if (firebase.auth().currentUser.emailVerified === false
                    && userInfo.verifyButtonCooldownDone !== undefined
                    && verifyButtonCooldownDone !== userInfo.verifyButtonCooldownDone) {
                    verifyButtonCooldownDone = userInfo.verifyButtonCooldownDone;

                    if (verifyButtonCooldownDone === false) {
                        setTimeout(() => {
                            if (firebase.auth().currentUser.uid !== null
                                && verifyButtonCooldownDone === false) {
                                console.log("verifyButtonCooldownDone");

                                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                                    .update({
                                        verifyButtonCooldownDone: true,
                                    });

                                userInfo.verifyButtonCooldownDone = true;
                                verifyButtonCooldownDone = true;
                            }
                        }, 10000);
                    }
                }
                if (firebase.auth().currentUser.emailVerified === false) {
                    verifyEmailButton.show();
                }
                if (nameInput.value().trim() !== firebase.auth().currentUser.displayName

                    && nameInput.value() !== "" && firebase.auth().currentUser.displayName !== null
                    || nameInput.value().trim() !== firebase.auth().currentUser.displayName

                    && nameInput.value() === "" && firebase.auth().currentUser.displayName !== null
                    || nameInput.value().trim() !== firebase.auth().currentUser.displayName

                    && nameInput.value().trim() !== "" && firebase.auth().currentUser.displayName === null


                    || usernameInput.value().toLowerCase().trim() !== userInfo.username.toLowerCase().trim()
                    && usernameInput.value() !== "") {
                    applyChangesButton.show();
                } else {
                    applyChangesButton.hide();
                }

                var yMinus = isMobile ? 5 : 0;
                textSize(25);
                textAlign("center");//right, center
                fill("black");
                //text("Nome: ", nameInput.x - newWidthAdded / 2, nameInput.y + 18);
                text("Nome", 0 - newWidthAdded / 2, nameInput.y - 24 - yMinus, windowWidth);
                nameInput.show();

                text("Nome De Usuário", 0 - newWidthAdded / 2, usernameInput.y - 24 - yMinus, windowWidth);
                usernameInput.show();
            }

            if (firebase.auth().currentUser.emailVerified === true
                || firebase.auth().currentUser === null) {
                verifyEmailButton.hide();
            }
            textAlign("center", "top");
            fill("black");
            textSize(45);
            textWrap("CHAR");
            //text("uid: " + firebase.auth().currentUser.uid, windowWidth / 2 - newWidthAdded / 2, 35);
            var textX = 0;
            if (accountPhoto !== undefined || isMobile && width >= height) {
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
            verifyEmailButton.hide();
            signInButton.show();
            //signUpButton.show();
            emailInput.show();
            googleSignInButton.show();
            passwordInput.show();
            signOutButton.hide();
            deleteButton.hide();
            nameInput.hide();
            usernameInput.hide();
            applyChangesButton.hide();
            if (accountPhoto !== undefined) {
                accountPhoto.hide();
            }

            if (userInfo === null) {
                userInfo = undefined;
            }
        }
    }

    drawSprites();
}

function signIn(provider) {
    console.log(firebase.auth().currentUser);
    emailInput.value(trim(emailInput.value()));
    passwordInput.value(trim(passwordInput.value()));
    if (emailInput.value() !== "" && passwordInput.value() !== ""
        && provider === "email&password") {
        firebase.auth().signInWithEmailAndPassword(emailInput.value(), passwordInput.value())
            .then(response => {
                console.log(response);
                console.log(firebase.auth().currentUser.uid);

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((snapshot) => {
                        if (userInfo === undefined) {
                            //snapshot.docs.forEach(data => {
                            var data = snapshot;
                            console.log("userInfo:" + data.data());
                            userInfo = data.data();
                            if (userInfo !== null) {
                                if (firebase.auth().currentUser.displayName !== null
                                    && firebase.auth().currentUser.displayName !== undefined) {
                                    nameInput.value(firebase.auth().currentUser.displayName);
                                }

                                if (usernameInput.value() !== userInfo.username) {
                                    usernameInput.value(userInfo.username);
                                }
                            } else {
                                userInfo = undefined;
                            }
                            //});
                        }
                    });
            }).catch(error => {
                if (error.message !== "There is no user record " +
                    "corresponding to this identifier. The user may have been deleted.") {
                    console.log(error);
                } else {
                    console.log("Creating User...");
                }
                var alertText;
                if (error.message === "There is no user record " +
                    "corresponding to this identifier. The user may have been deleted.") {
                    //alertText = "O Usuário Não Foi Encontrado.";
                    signUp("email&password");
                } else if (error.message === "The email address is badly formatted.") {
                    alertText = "O Endereço De Email Está Escrito Incorretamente\n(Falta @algo.com).";
                } else if (error.message === "The password is invalid or the user " +
                    "does not have a password.") {
                    alertText = "A Senha Está Incorreta Ou O Usuário Não Tem Uma Senha.";
                } else if (error.message === "A network error (such as timeout, interrupted connection or " +
                    "unreachable host) has occurred.") {
                    alertText = "Você Está Offline. Cheque Sua Conexão De Internet.";
                }

                console.log(alertText);
                if (alertText !== undefined) {
                    alert(alertText);
                }
            });
    } else if (provider === "google") {
        var GoogleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(GoogleProvider)
            .then((result) => {
                //if (firebase.auth().currentUser === null) {
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

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((snapshot) => {
                        //snapshot.docs.forEach(data => {
                        var data = snapshot;
                        console.log(data.data());
                        if (data.data() !== null
                            && data.data() !== undefined) {
                            userInfo = data.data();
                            console.log("userInfo:" + userInfo);
                            if (firebase.auth().currentUser.displayName !== null
                                && firebase.auth().currentUser.displayName !== undefined) {
                                nameInput.value(firebase.auth().currentUser.displayName);
                            }

                            if (usernameInput.value() !== userInfo.username) {
                                usernameInput.value(userInfo.username);
                            }
                        } else {
                            console.log(firebase.auth().currentUser.uid);
                            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                                .set({
                                    username: "",
                                    trexHighscore: 0,
                                }).then(() => {
                                    firebase.firestore().collection('users')
                                        .doc(firebase.auth().currentUser.uid)
                                        .get()
                                        .then((snapshot) => {
                                            if (userInfo === undefined) {
                                                //snapshot.docs.forEach(data2 => {
                                                var data2 = snapshot;
                                                console.log("userInfo:" + data2.data());
                                                userInfo = data2.data();
                                                if (userInfo === null) {
                                                    userInfo = undefined;
                                                }

                                                if (firebase.auth().currentUser.displayName
                                                    !== null
                                                    && firebase.auth().currentUser.displayName
                                                    !== undefined
                                                    && firebase.auth().currentUser.displayName
                                                    !== "undefined") {
                                                    nameInput.value(firebase.auth()
                                                        .currentUser.displayName);
                                                }

                                                if (usernameInput.value() !== userInfo.username) {
                                                    usernameInput.value(userInfo.username);
                                                }
                                                //});
                                            }
                                        });
                                });
                        }

                        //});
                    });
                //}
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

                var alertText;
                if (error.message === "A network error (such as timeout, interrupted connection or " +
                    "unreachable host) has occurred.") {
                    alertText = "Você Está Offline. Cheque Sua Conexão De Internet.";
                }

                console.log(alertText);
                if (alertText !== undefined) {
                    alert(alertText);
                }
                // ...
            });
    } else if (provider === "email&password" && emailInput.value() === ""
        || provider === "email&password" && passwordInput.value() === "") {
        var alertText;

        if (emailInput.value() === "") {
            alertText = "Insira Um Email";
        }

        if (passwordInput.value() === ""
            && alertText === undefined) {
            alertText = "Insira Uma Senha.";
        } else if (passwordInput.value() === ""
            && alertText !== undefined) {
            alertText = alertText + " E Uma Senha.";
        } else if (passwordInput.value() !== "") {
            alertText = alertText + ".";
        }

        console.log(alertText);
        alert(alertText);
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

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                    username: "",
                    trexHighscore: 0,
                });

                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                    .get()
                    .then((snapshot) => {
                        if (userInfo === undefined) {
                            //snapshot.docs.forEach(doc => {
                            var doc = snapshot;
                            console.log("userInfo:" + doc.data());
                            userInfo = doc.data();
                            if (userInfo === null) {
                                userInfo = undefined;
                            }

                            if (firebase.auth().currentUser.displayName !== null
                                && firebase.auth().currentUser.displayName !== undefined) {
                                nameInput.value(firebase.auth().currentUser.displayName);
                            }

                            if (usernameInput.value() !== userInfo.username) {
                                usernameInput.value(userInfo.username);
                            }
                            //});
                        }
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                print(errorMessage, " errorCode: " + errorCode);

                var alertText;
                if (error.message === "The email address is already in use by another account.") {
                    //alertText = "O Endereço De Email Já Está Sendo Usado Por Outra Conta.";
                    signIn("email&password");
                } else if (error.message === "Password should be at least 6 characters") {
                    alertText = "A Senha Deve Ter Pelo Menos 6 Caracteres.";
                } else if (error.message === "The email address is badly formatted.") {
                    alertText = "O Endereço De Email Está Escrito Incorretamente\n(Falta @algo.com).";
                } else if (error.message === "A network error (such as timeout, interrupted connection or " +
                    "unreachable host) has occurred.") {
                    alertText = "Você Está Offline. Cheque Sua Conexão De Internet.";
                }

                console.log(alertText);
                if (alertText !== undefined) {
                    alert(alertText);
                }
            });
    } else if (provider === "email&password" && emailInput.value() === ""
        || provider === "email&password" && passwordInput.value() === "") {
        var alertText;

        if (emailInput.value() === "") {
            alertText = "Insira Um Email";
        }

        if (passwordInput.value() === ""
            && alertText === undefined) {
            alertText = "Insira Uma Senha.";
        } else if (passwordInput.value() === ""
            && alertText !== undefined) {
            alertText = alertText + " E Uma Senha.";
        } else if (passwordInput.value() !== "") {
            alertText = alertText + ".";
        }

        console.log(alertText);
        alert(alertText);
    }
}

function signOut() {
    if (firebase.auth().currentUser !== null) {
        firebase.auth().signOut();
        userInfo = undefined;
        verifyEmailButton.hide();
        nameInput.hide();
        applyChangesButton.hide();
        if (accountPhoto !== undefined) {
            accountPhoto.hide();
            accountPhoto = undefined;
        }
        nameInput.value("");
        usernameInput.value("");
    }
}

function Delete() {
    if (firebase.auth().currentUser !== null) {
        var username = userInfo.username;
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).delete();
        if (username !== "") {
            firebase.firestore().collection('usernames').doc(username).delete()
                .then(() => {
                    firebase.auth().currentUser.delete();
                    verifyEmailButton.hide();
                    nameInput.hide();
                    usernameInput.hide();
                    applyChangesButton.hide();
                    if (accountPhoto !== undefined) {
                        accountPhoto.hide();
                        accountPhoto = undefined;
                    }
                    userInfo = null;
                    nameInput.value("");
                    usernameInput.value("");
                });
        } else {
            firebase.auth().currentUser.delete();
            verifyEmailButton.hide();
            nameInput.hide();
            usernameInput.hide();
            applyChangesButton.hide();
            if (accountPhoto !== undefined) {
                accountPhoto.hide();
                accountPhoto = undefined;
            }
            userInfo = null;
            nameInput.value("");
            usernameInput.value("");
        }
    }
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
            'Tem Certeza Que Você Quer Sair?' : 'Tem Certeza Que Você Quer DELETAR Sua Conta?',
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
    if (windowWidth >= 440 && !isMobile) {
        resizeCanvas(windowWidth, windowHeight);
        emailInput.position(width / 2 - 185, height / 2 - 90);
        passwordInput.position(width / 2 - 185, height / 2 - 40);
        nameInput.position(width / 2 - 90 - 17.5, height / 2 - 90);//width / 2 - 60 - 17.5
        usernameInput.position(width / 2 - 90 - 17.5, height / 2 - 160);
        googleSignInButton.position(width / 2 - 22.5 - 17.5, height / 2 + 65); //, height / 2 + 120
        applyChangesButton.position(width / 2 - 108 - 17.5, height / 2 - 48);
        verifyEmailButton.position(width / 2 - 185, height / 2 - 230);
        if (accountPhoto !== undefined) {
            accountPhoto.position(width / 2 - 25, 5);
        }
        signInButton.position(width / 2 - 55 - 17.5, height / 2 + 10);//, height / 2
        signUpButton.position(width / 2 - 65 - 17.5, height / 2 + 62.5);
        signOutButton.position(width / 2 - 55 - 17.5, height / 2); //height / 2 + 104.5
        deleteButton.position(width / 2 - 65 - 17.5, height / 2 + 52.5); //height / 2 + 184.5
        if (initialWidth !== width) {
            newWidthAdded = width - initialWidth;
        } else {
            newWidthAdded = 0;
        }
    }
}

function alert(text) {
    Swal.fire({
        title: text,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK!',
    }).then((result) => {
        if (result.isConfirmed) {

        }
    })
}

function emailVerification() {
    if (firebase.auth().currentUser !== null
        && firebase.auth().currentUser.emailVerified === false
        && verifyButtonCooldownDone === true) {
        firebase.auth().currentUser.sendEmailVerification().then(() => {
            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                .update({
                    verifyButtonCooldownDone: false,
                });
            userInfo.verifyButtonCooldownDone = false;
            verifyButtonCooldownDone = false

            alert("Link De Verificação Enviado Para " + firebase.auth().currentUser.email + "");

            setTimeout(() => {
                if (firebase.auth().currentUser.uid !== null
                    && verifyButtonCooldownDone === false) {
                    console.log("verifyButtonCooldownDone");

                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                        .update({
                            verifyButtonCooldownDone: true,
                        });

                    userInfo.verifyButtonCooldownDone = true;
                    verifyButtonCooldownDone = true;
                }
            }, 10000);
        })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                print(errorMessage, " errorCode: " + errorCode);

                var alertText;
                if (error.message === "We have blocked all requests from this device due to " +
                    "unusual activity. Try again later.") {
                    alertText = "Muitas Tentativas, Tente Novamente Mais Tarde.";
                } else if (error.message === "A network error (such as timeout, interrupted connection or " +
                    "unreachable host) has occurred.") {
                    alertText = "Você Está Offline. Cheque Sua Conexão De Internet.";
                }

                console.log(alertText);
                if (alertText !== undefined) {
                    alert(alertText);
                }
            });
    } else if (firebase.auth().currentUser !== null
        && firebase.auth().currentUser.emailVerified === false
        && verifyButtonCooldownDone === false) {
        alert("Espere 10 Segundos Antes De Mandar Outro Link.");
    }
}

function applyChanges() {
    if (firebase.auth().currentUser !== null
        && nameInput.value().trim() !== firebase.auth().currentUser.displayName
        && nameInput.value() !== "" && firebase.auth().currentUser.displayName !== null
        || firebase.auth().currentUser !== null
        && nameInput.value().trim() !== firebase.auth().currentUser.displayName
        && nameInput.value() === "" && firebase.auth().currentUser.displayName !== null
        || firebase.auth().currentUser !== null
        && nameInput.value().trim() !== firebase.auth().currentUser.displayName
        && nameInput.value() !== "" && firebase.auth().currentUser.displayName === null) {
        firebase.auth().currentUser.updateProfile({
            displayName: nameInput.value(),
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            print(errorMessage, " errorCode: " + errorCode);

            var alertText;
            if (error.message === "Display name too long.") {
                alertText = "O Nome É Muito Longo.";
            } else if (error.message === "A network error (such as timeout, interrupted connection or " +
                "unreachable host) has occurred.") {
                alertText = "Você Está Offline. Cheque Sua Conexão De Internet.";
            }

            console.log(alertText);
            if (alertText !== undefined) {
                alert(alertText);
            }
        });

        applyChangesButton.hide();

        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                //snapshot.docs.forEach(doc => {
                var doc = snapshot;
                //console.log("userInfo:" + doc.data());
                userInfo = doc.data();

                if (firebase.auth().currentUser.emailVerified === false) {
                    verifyEmailButton.show();
                } else {
                    verifyEmailButton.hide();
                }
                //});
            });
    }

    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            var doc = snapshot;
            //console.log("userInfo:" + doc.data());
            userInfo = doc.data();
            if (userInfo === null) {
                userInfo = undefined;
            }
        }).then(() => {
            if (firebase.auth().currentUser !== null
                && usernameInput.value().toLowerCase().trim() !== userInfo.username.toLowerCase().trim()
                && usernameInput.value() !== "") {
                firebase.firestore().collection('usernames').doc(usernameInput.value())
                    .get()
                    .then((snapshot) => {
                        var doc = snapshot;
                        console.log(doc.data());
                        if (doc.data() === undefined) {
                            firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                                .get()
                                .then((snapshot) => {
                                    var doc2 = snapshot;
                                    //console.log("userInfo:" + doc2.data());
                                    userInfo = doc2.data();

                                    var newUsername = usernameInput.value().trim().toLowerCase();
                                    firebase.firestore().collection('usernames').doc(newUsername).set({});
                                    var previousUsername = userInfo.username.toLowerCase().trim();
                                    if (previousUsername !== "") {
                                        firebase.firestore().collection('usernames')
                                            .doc(previousUsername).delete();
                                    }

                                    firebase.firestore().collection('users')
                                        .doc(firebase.auth().currentUser.uid).set({
                                            username: usernameInput.value().trim(),
                                        });

                                    userInfo.username = usernameInput.value();

                                    usernameInput.value(usernameInput.value().trim());
                                });
                        } else {
                            alert("Nome De Usuário Indisponível, Tente Outro!");
                        }
                    });
            }

        });
}