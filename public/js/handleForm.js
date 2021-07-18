import "./cookie.js";

function aleartSuccess(message, urlRedirect, setTime) {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: message || 'Bạn đã cập nhật thành công!',
        showConfirmButton: true,
        timer: undefined || setTime,
    }).then((result) => {
        if(result.isConfirmed || result.isDismissed) {
            window.location.href = urlRedirect;
        }
    });
}
function aleartFail(message, urlRedirect) {
    Swal.fire({
        icon: 'error',
        title: 'Úi!',
        text: message,
    }).then((result) => {
        if(result.isConfirmed || result.isDismissed) {
            if(urlRedirect) {
                window.location.href = urlRedirect;
            }else {
                return;
            }
        }
    });
}

function getValueForm(forminput) {
    const data = {};
    (forminput.serializeArray()).forEach((item) => {
        data[item.name] = item.value;
    });
    return data;
}

function uploadImage(elementInput, renderThisElement) {
    elementInput.change(() => {
        const fileReader = new FileReader();
        const img = new Image();
        const fileImage = elementInput[0].files[0];
        renderThisElement.show();
        img.src = URL.createObjectURL(fileImage);
        renderThisElement.append(img);
        if(renderThisElement.children('img').length > 1) {
            renderThisElement.children('img').remove();
            renderThisElement.append(img);
        }
    });
}

// handle signin, signup & logout
function handleForm(option) {
    const { idElement, domain, port, path, message, urlRedirect } = option;
    const infoSignIn = $(idElement.signin)[0] ? {
        idElement: idElement.signin,
        domain,
        port,
        path: path.signin,
        message: message.signin,
        urlRedirect: urlRedirect.signin,
    } : null;
    const infoSignUp = $(idElement.signup)[0] ? {
        idElement: idElement.signup,
        domain,
        port,
        path: path.signup,
        message: message.signup,
        urlRedirect: urlRedirect.signup,
    } : null;
    const infoOffical = infoSignIn ? infoSignIn : infoSignUp;
    if(infoOffical) {
        const form = $(infoOffical.idElement);
        form.submit(function(event) {
            event.preventDefault();
            const valueForm = getValueForm($(this));
            fetch(`http://${infoOffical.domain}:${infoOffical.port}/${infoOffical.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(valueForm),
            })
            .then(res => res.json())
            .then(data => {
                if(data.token && data.refreshToken) {
                    Cookies.set('_code_sign', data.token);
                    Cookies.set('_code_ref_sign', data.refreshToken);
                    aleartSuccess(infoOffical.message, infoOffical.urlRedirect);
                }
            })
        })
    }
    // handle logout
    const logout = $('#logout');
    logout.click(function(e) { 
        e.preventDefault();
        Swal.fire({
            title: 'Bạn muốn đăng xuất à?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng rồi',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Bạn đã đăng xuất!',
                ).then(data => {
                    if(data.isConfirmed || data.isDismissed) {
                        fetch(`http://localhost:3300/api/signout`, {
                            method: 'POST',
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.message === 'success!') {
                                window.location.href = '/';
                            }
                        })
                    }
                })
            }
        })
    })
    // handle changePassword
    const formChangePass = $('#change-password');
    formChangePass.submit(function(e) {
        e.preventDefault();
        const valueForm = getValueForm($(this));
        fetch(`http://localhost:3300/user/change-password?_method=put`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(valueForm),
        })
        .then(res => res.json())
        .then(data => {
            if(data.result) {
                aleartSuccess(data.mess, 'http://localhost:3300/user/change-password');
            }else {
                aleartFail(data.mess, 'http://localhost:3300/user/change-password');
            }
        })
    });
}

function handleLoadImage() {
    const inputImage = $('#load-file-avatar');
    const showImage = $('#image-view-loading');
    const form = $('#upload-info-account');
    showImage.hide();
    uploadImage(inputImage, showImage);
    form.submit(function(e) {
        e.preventDefault();
        // do something!
        const formData = new FormData();
        const data = {};
        (form.serializeArray()).forEach((item) => {
            data[item.name] = item.value;
        });
        data.dateToBirthday = new Date(data.dateToBirthday);
        const id = data.id;
        delete data.id;
        // that code belows, it will be upload info user when this user change data
        if(inputImage[0].files[0]) {
            formData.append('avatar', inputImage[0].files[0]);
        }
        formData.append('info', JSON.stringify(data));
        fetch(`http://localhost:3300/user/update/info/${id}`, {
            method: 'PUT',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.status) {
                aleartSuccess('Bạn đã cập nhật thông tin!', 'http://localhost:3300/user/info/');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
}

export { handleForm, handleLoadImage, aleartFail, aleartSuccess };
