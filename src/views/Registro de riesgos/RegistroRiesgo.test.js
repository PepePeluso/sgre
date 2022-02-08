import axios from "axios"

const url = "https://backend-sgre.herokuapp.com/riesgoNatSeq"

const consultarRiesgosN = async () => {
    const consulta = await axios.get(url)
    return consulta
}

it("probar axios riesgos Nat", async()=>{
    const resp = await consultarRiesgosN()
    console.log(resp.data)
})