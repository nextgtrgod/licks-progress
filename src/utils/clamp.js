
const clamp = (n, min, max) => {
	if (n > max) return max
	if (n < min) return min
	return n
}

export default clamp
