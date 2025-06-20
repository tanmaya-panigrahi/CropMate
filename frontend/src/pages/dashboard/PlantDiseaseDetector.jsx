import { useState } from 'react'
import { InferenceClient } from "@huggingface/inference"

function PlantDiseaseDetector() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
      setPrediction(null)
      setError(null)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return

    setLoading(true)
    setError(null)

    try {
      const apiToken = "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"
      if (!apiToken) {
        throw new Error('Hugging Face API token is not configured.')
      }

      const client = new InferenceClient(apiToken)
      
      // Convert image URL to blob
      const response = await fetch(selectedImage)
      const blob = await response.blob()
      
      // Add timeout and retry logic
      const maxRetries = 3
      let retryCount = 0
      let output = null

      while (retryCount < maxRetries) {
        try {
          output = await client.imageClassification({
            data: blob,
            model: "linkanjarad/mobilenet_v2_1.0_224-plant-disease-identification",
            provider: "hf-inference",
          })
          break
        } catch (err) {
          retryCount++
          if (retryCount === maxRetries) throw err
          // Wait for 1 second before retrying
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      if (!output || !Array.isArray(output)) {
        throw new Error('Invalid response from the model')
      }

      setPrediction(output)
    } catch (err) {
      console.error('Error details:', err)
      if (err.message.includes('API token')) {
        setError('Configuration Error: ' + err.message)
      } else if (err.message.includes('network')) {
        setError('Network Error: Please check your internet connection and try again.')
      } else {
        setError('Error analyzing image: ' + (err.message || 'Unknown error occurred'))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="plant-detector-container">
      <h1>Plant Disease Detector</h1>
      
      <div className="upload-section">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="file-input"
        />
        
        {selectedImage && (
          <div className="preview-section">
            <img src={selectedImage} alt="Selected plant" className="preview-image" />
            <button 
              onClick={analyzeImage}
              disabled={loading}
              className="analyze-button"
            >
              {loading ? 'Analyzing...' : 'Analyze Plant'}
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {prediction && (
        <div className="results">
          <h2>Analysis Results:</h2>
          <div className="prediction-list">
            {prediction.map((item, index) => (
              <div key={index} className="prediction-item">
                <span className="disease-name">{item.label}</span>
                <span className="confidence">
                  {(item.score * 100).toFixed(2)}% confidence
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PlantDiseaseDetector 