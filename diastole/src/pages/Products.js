import React, { useState, useEffect } from "react";

// reactstrap components
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  FormGroup,
  Input,
  Box
} from '@material-ui/core'
import { useFormik } from "formik"
import * as Yup from "yup"

function Menu(props) {
  const [image, subiendoImage] = useState(null);
  const [initialValuesFormik, updateInititalValuesFormik] = useState({
    name: '',
    precio: 0.0,
    image: null,
    descripcion: '',
    disponible: true
  });

  const formik = useFormik({
    initialValues: initialValuesFormik,
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().min(3, "Deben haber al menos tres caracteres").required("El nombre es obligatorio"),
      //precio: Yup.number().min(0, "El precio debe tener un número"),
      descripcion: Yup.string().min(7, "La descripícon debe ser más larga")

    }),
    onSubmit: async plato => {
      console.log('platito')
    }
  });
  useEffect(() => {
    // TODO Fetch data
  }, []);
  return (
    <>
      {/* Page content */}
      <Container className="mt-3">
        <Box className="order-xl-1" xl="12">
          <Card className="bg-secondary shadow">
            <CardHeader className="bg-white border-0">
              <Box xs="8">
                <h3 className="mb-0">REGISTRO DE PLATOS</h3>
              </Box>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="pl-lg-4">
                  <Box lg="9" style={{ paddingLeft: "30%" }}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="name"
                      >
                        Nombre
                            </label>
                      <Input
                        className="form-control-alternative text-gray-700"
                        id="name"
                        placeholder="Nombre"
                        type="text"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                      />
                    </FormGroup>
                    {formik.touched.name && formik.errors.name ? (
                      <div style={{ backgroundBoxor: "lightcoral", padding: "4px;" }}>
                        <p style={{ Boxor: "black", font: "bold", textAlign: "center" }}>{formik.errors.name}</p>
                      </div>

                    ) : null}
                  </Box>
                  <Box lg="9" style={{ paddingLeft: "30%" }}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="precio"
                      >
                        Precio
                            </label>
                      <Input
                        className="form-control-alternative"
                        id="precio"
                        placeholder="$9.99"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formik.values.precio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                      />
                    </FormGroup>
                    {formik.touched.precio && formik.errors.precio ? (
                      <div style={{ backgroundBoxor: "lightcoral", padding: "4px;" }}>
                        <p style={{ Boxor: "black", font: "bold", textAlign: "center" }}>{formik.errors.precio}</p>
                      </div>

                    ) : null}
                  </Box>
                  <Box lg="9" style={{ paddingLeft: "30%" }}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="descripcion"
                      >
                        Descripcion
                            </label>
                      <Input
                        className="form-control-alternative"
                        id="descripcion"
                        placeholder="1"
                        type="text"
                        value={formik.values.descripcion}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}


                      />
                    </FormGroup>
                    {formik.touched.descripcion && formik.errors.descripcion ? (
                      <div style={{ backgroundBoxor: "lightcoral", padding: "4px;" }}>
                        <p style={{ Boxor: "black", font: "bold", textAlign: "center" }}>{formik.errors.descripcion}</p>
                      </div>

                    ) : null}
                  </Box>
                  <Box lg="9" style={{ paddingLeft: "30%" }}>
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="imagen"
                      >
                        Imágen
                            </label>

                      <br />
                      {image != null ?
                        <img style={{ width: '100%' }}
                          src={typeof image === 'string' ? image : URL.createObjectURL(image)} />
                        : <div></div>}
                      <div className="form-group" style={{ position: 'relative' }}>
                        <button type="button" className="btn btn-success" style={{ width: '100%' }}>
                          {image != null ? "Cambiar " : "Subir "} imagen del plato
                                 </button>
                        <Input
                          className="form-control" style={{ position: 'absolute', top: 0, opacity: 0 }}
                          id="imagen"
                          type="file"
                          onChange={e => { subiendoImage(e.target.files[0]) }}
                          onBlur={formik.handleBlur}
                        />
                      </div>

                    </FormGroup>
                  </Box>
                  <Box lg="9" style={{ paddingLeft: "30%" }}>

                    <div style={{ justifyContent: "center" }}>
                      <input style={{ display: 'flex', justifyContent: "center", justifyItems: "center", Boxor: "primary", width: "100%", borderRadius: "10px", border: "1px solid transparent" }}
                        type="submit"
                        className="bg-blue w-full my-4 p-2 text-white uppercase"
                        value="Agregar"
                      />
                    </div>
                  </Box>
                </div>
              </form>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}

export default Menu;
