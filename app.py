from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = Flask(__name__, static_folder='.')
CORS(app)

# CIFAR-10 class names
CLASS_NAMES = ['airplane', 'automobile', 'bird', 'cat', 'deer', 
               'dog', 'frog', 'horse', 'ship', 'truck']

# Initialize model variable
model = None

def load_model():
    global model
    try:
        # Try to load the model
        model = tf.keras.models.load_model('cifar10_model.h5')
        # Count total parameters
        total_params = model.count_params()
        print(f"Model loaded successfully! Total parameters: {total_params:,}")
        return True
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        print("Please make sure to export your model from the notebook as 'cifar10_model.h5'")
        print("You can do this by adding this code to your notebook:")
        print("model.save('cifar10_model.h5')")
        return False

def preprocess_image(image):
    # Resize image to 32x32 (CIFAR-10 image size)
    image = image.resize((32, 32))
    # Convert to numpy array and normalize
    image = np.array(image) / 255.0
    # Add batch dimension
    image = np.expand_dims(image, axis=0)
    return image

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/styles.css')
def serve_styles():
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def serve_script():
    return send_from_directory('.', 'script.js')

@app.route('/image.png')
def serve_image():
    return send_from_directory('.', 'image.png')

@app.route('/ai_image.png')
def serve_image2():
    return send_from_directory('.', 'ai_image.png')

@app.route('/model-info')
def model_info():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    return jsonify({
        'parameters': model.count_params()
    })

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded. Please check server logs.'}), 500
        
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    try:
        # Get the image file
        file = request.files['image']
        # Read the image
        image = Image.open(io.BytesIO(file.read()))
        
        # Convert to RGB if necessary
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Preprocess the image
        processed_image = preprocess_image(image)
        
        # Make prediction
        predictions = model.predict(processed_image)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        
        return jsonify({
            'class': CLASS_NAMES[predicted_class],
            'confidence': confidence
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Try to load the model before starting the server
    if load_model():
        print("Starting Flask server...")
        app.run(debug=True, port=5000)
    else:
        print("Server not started due to model loading error.") 