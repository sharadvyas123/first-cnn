# 🧠 first-cnn

A web-based application for image classification using a Convolutional Neural Network (CNN) trained on the CIFAR-10 dataset.

---

## 🌟 Overview

This project features an interactive web interface that allows users to classify uploaded images into 10 categories using a pre-trained CNN model. The model was trained on the CIFAR-10 dataset and achieves over 80% accuracy.

---

## 🚀 Features

- **Interactive web interface** for real-time image classification  
- **Drag-and-drop** or manual image upload  
- **Confidence meter** visualizing prediction certainty  
- **Performance metrics and charts**  
- **Fully responsive design**

---

## 🏷️ Supported Categories

The model can recognize the following 10 classes:

- ✈️ Airplane
- 🚗 Automobile
- 🐦 Bird
- 🐱 Cat
- 🦌 Deer
- 🐶 Dog
- 🐸 Frog
- 🐴 Horse
- 🚢 Ship
- 🚚 Truck

---

## ⚡ Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) Python/JS experience for local development

### Installation

```bash
git clone https://github.com/sharadvyas123/first-cnn.git
cd first-cnn
```

Open `index.html` directly in your browser, **or** serve with a local HTTP server:
```bash
python -m http.server
```
Visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🕹️ Usage

1. Open the web app in your browser.
2. Go to the **Predict** section.
3. Upload an image (drag-and-drop or choose file).
4. Click **Predict** to classify the image.
5. View the predicted class and confidence score.

---

## ⚠️ Important Notes

- For best results, use images with a single, clear subject belonging to one of the 10 categories.
- Blurry, dark, or multi-object images may reduce accuracy.
- The model is optimized for CIFAR-10-like images.

---

## 🧑‍💻 Model Details

- **Architecture:** Convolutional Neural Network (CNN)
- **Dataset:** CIFAR-10 (60,000 images)
- **Training time:** ~50 minutes
- **Accuracy:** ~80.4%

---

## 📁 Project Structure

```
first-cnn/
├── index.html         # Main HTML file
├── styles.css         # App styling
├── script.js          # JS for logic and prediction
├── image.png          # Profile/sample image
├── ai_image.png       # Model architecture diagram
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please open an issue to discuss your idea.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

- **GitHub:** [sharadvyas123](https://github.com/sharadvyas123)
- **LinkedIn:** [Sharad Vyas](https://www.linkedin.com/in/sharad-vyas-270310324/)

---

## 🙏 Acknowledgments

- [CIFAR-10 dataset](https://www.cs.toronto.edu/~kriz/cifar.html)
- [Chart.js](https://www.chartjs.org/) for visualization
- [Font Awesome](https://fontawesome.com/) for icons
