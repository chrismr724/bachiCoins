const apiFetch = async ({ payload, method = 'GET', url, token = '' }) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    if (payload) {
      options.body = JSON.stringify(payload)
    }

    const response = await fetch(url, options)
    
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      return {
        error: errorData?.error || `HTTP error! status: ${response.status}`,
        status: response.status
      }
    }

    // Check if the response has content
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return {
        error: 'Invalid response format - Expected JSON',
        status: response.status
      }
    }

    const data = await response.json()
    return data
  } catch (err) {
    return {
      error: err.message || 'Network or parsing error occurred',
      status: 500
    }
  }
}

export default apiFetch