
const map = (x, inMin,  inMax,  outMin,  outMax) => {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

export default map
