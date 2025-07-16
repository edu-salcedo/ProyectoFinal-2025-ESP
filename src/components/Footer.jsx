

export default function Footer() {

    return (
        <>
            <footer className="bg-body-secondary  py-2 mt-5">
                <div className="container text-center ">
                    <div className="row ">
                        <div className="col-md-6 mb-3">
                            <h5 className="text-uppercase">Mi Tienda</h5>
                            <p>Tu lugar ideal para comprar lo que necesitás. Calidad, precio y confianza.</p>
                        </div>

                        <div className="col-md-6  d-flex justify-content-center align-items-center gap-5 ">
                            <h5 className="text-uppercase">Seguinos</h5>
                            <div className="d-flex gap-3">
                                <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary">
                                    <i className="bi bi-facebook fs-4"></i>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-danger">
                                    <i className="bi bi-instagram fs-4"></i>
                                </a>
                                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-dark">
                                    <i className="bi bi-twitter-x fs-4"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}
