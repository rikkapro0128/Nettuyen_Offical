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
        let data = {};
        form.change(function() {
            ($(this).serializeArray()).forEach((item) => {
                data[item.name] = item.value;
            });
        });
        form.submit(function(event) {
            event.preventDefault();
            fetch(`http://${infoOffical.domain}:${infoOffical.port}/${infoOffical.path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(data => {
                if(data.token && data.refreshToken) {
                    Cookies.set('_code_sign', data.token);
                    Cookies.set('_code_ref_sign', data.refreshToken);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: infoOffical.message,
                        showConfirmButton: true,
                    }).then((result) => {
                        if(result.isConfirmed || result.isDismissed) {
                            window.location.href = infoOffical.urlRedirect;
                        }
                    });
                }
            })
        })
    }
}

export { handleForm };
