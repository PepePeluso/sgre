
const Login = () => {
    return (
        <div className="container-fluid">
            <h2>Iniciar sesión</h2>
            <div className="card">
                <div className="card-body">
                    <div className="input-group mb-2">
                        <label className="col-1 align-self-center text-center m-2">Usuario</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="input-group mb-2">
                        <label className="col-1 align-self-center text-center m-2">Contraseña</label>
                        <input type="password" className="form-control" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login