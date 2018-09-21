const response = (success = false, data = {data: 'sorry no data available'}) => {
	return {
		success,
		data
	}
}

export default response
