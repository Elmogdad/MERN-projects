
const registerHander = async (req, res) => {
    res.send('Register Handler');
}

const loginHandler = async (req, res) => {
    res.send('Login Handler');
}

export { registerHander, loginHandler };