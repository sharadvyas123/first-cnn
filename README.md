# first-cnn
A web-based application that demonstrates image classification using a Convolutional Neural Network (CNN) trained on the CIFAR-10 dataset.

## Overview

This project provides an interactive web interface for classifying images into 10 different categories using a pre-trained CNN model. The model has been trained on the CIFAR-10 dataset and achieves an accuracy of 80.42%.

## Features

- Interactive web interface for image classification
- Real-time image prediction
- Drag and drop image upload
- Visual confidence meter for predictions
- Performance metrics visualization
- Responsive design for all devices

## Supported Image Categories

The model can classify images into the following 10 categories:
- Airplane
- Automobile
- Bird
- Cat
- Deer
- Dog
- Frog
- Horse
- Ship
- Truck

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Basic understanding of image classification concepts

### Installation

1. Clone this repository:
```bash
git clone [your-repository-url]
```

2. Navigate to the project directory:
```bash
cd cifar-10
```

3. Open `index.html` in your web browser or set up a local server.

## Usage

1. Open the web application in your browser
2. Navigate to the "Predict" section
3. Upload an image by either:
   - Dragging and dropping an image onto the upload area
   - Clicking "Choose File" to select an image from your device
4. Click the "Predict" button to get the classification result
5. View the prediction result and confidence level

## Important Notes

- For best results, upload images that contain only one main subject
- The image should belong to one of the 10 supported categories
- Images with multiple objects may not be classified correctly
- The model works best with clear, well-lit images

## Model Details

- Architecture: Convolutional Neural Network (CNN)
- Training Dataset: CIFAR-10 (60,000 images)
- Training Time: 50 minutes
- Accuracy: 80.42%

## Project Structure

```
cifar-10/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── image.png          # Profile image
└── ai_image.png       # Model architecture image
```

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

- GitHub: [sharadvyas123](https://github.com/sharadvyas123)
- LinkedIn: [Sharad Vyas](https://www.linkedin.com/in/sharad-vyas-270310324/)

## Acknowledgments

- CIFAR-10 dataset
- Chart.js for visualization
- Font Awesome for icons 
