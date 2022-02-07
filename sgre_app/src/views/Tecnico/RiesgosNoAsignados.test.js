import axios from "axios"

const url = "https://backend-sgre.herokuapp.com/riesgoT"

const consultarRiesgos = async () => {
    const consulta = await axios.get(url)
    return consulta
}

it("probar axios riesgoT", async()=>{
    const resp = await consultarRiesgos()
    console.log(resp.data)
})
