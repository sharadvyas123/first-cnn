document.addEventListener('DOMContentLoaded', function() {
    // Fetch model parameters
    fetch('http://localhost:5000/model-info')
        .then(response => response.json())
        .then(data => {
            const paramCount = document.getElementById('paramCount');
            if (paramCount) {
                paramCount.textContent = `${(data.parameters / 1000000).toFixed(2)}M`;
            }
        })
        .catch(error => {
            console.error('Error fetching model info:', error);
            const paramCount = document.getElementById('paramCount');
            if (paramCount) {
                paramCount.textContent = 'Error loading';
            }
        });

    // Navigation functionality
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');
        
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    };
    
    navSlide();
    
    // Section navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // File Upload and Prediction
    const dropZone = document.getElementById('dropZone');
    const imageInput = document.getElementById('imageInput');
    const previewContainer = document.getElementById('previewContainer');
    const previewImage = document.getElementById('previewImage');
    const predictBtn = document.getElementById('predictBtn');
    const resultContainer = document.getElementById('resultContainer');
    const predictionResult = document.getElementById('predictionResult');
    const confidenceBar = document.getElementById('confidenceBar');

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });

    // Highlight drop zone when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', handleDrop, false);
    imageInput.addEventListener('change', handleFileSelect, false);

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropZone.style.borderColor = '#45a049';
    }

    function unhighlight(e) {
        dropZone.style.borderColor = '#4CAF50';
    }

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    function handleFileSelect(e) {
        const files = e.target.files;
        handleFiles(files);
    }

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'block';
                    resultContainer.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    // Handle prediction
    predictBtn.addEventListener('click', async function() {
        if (!previewImage.src) {
            alert('Please upload an image first.');
            return;
        }

        try {
            // Show loading state
            predictBtn.disabled = true;
            predictBtn.textContent = 'Predicting...';

            // Convert image to blob
            const response = await fetch(previewImage.src);
            const blob = await response.blob();

            // Create form data
            const formData = new FormData();
            formData.append('image', blob, 'image.jpg');

            // Send to backend
            const result = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData
            });

            const data = await result.json();

            if (data.error) {
                predictionResult.textContent = `Error: ${data.error}`;
            } else {
                predictionResult.textContent = `Prediction: ${data.class} (${(data.confidence * 100).toFixed(2)}% confidence)`;
                const confidence = (data.confidence * 100).toFixed(2);
                confidenceBar.style.width = `${confidence}%`;
            }
            resultContainer.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
            predictionResult.textContent = `Error: ${error.message}`;
            resultContainer.style.display = 'block';
        } finally {
            predictBtn.disabled = false;
            predictBtn.textContent = 'Predict';
        }
    });

    // Initialize charts
    initializeCharts();
});

// Initialize charts
function initializeCharts() {
    // Accuracy Chart
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    new Chart(accuracyCtx, {
        type: 'line',
        data: {
            labels: ['Epoch 1', 'Epoch 2', 'Epoch 3', 'Epoch 4', 'Epoch 5'],
            datasets: [{
                label: 'Training Accuracy',
                data: [0.65, 0.72, 0.78, 0.80, 0.82],
                borderColor: '#4CAF50',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });

    // Class Distribution Chart
    const distributionCtx = document.getElementById('classDistribution').getContext('2d');
    new Chart(distributionCtx, {
        type: 'bar',
        data: {
            labels: ['Airplane', 'Automobile', 'Bird', 'Cat', 'Deer', 'Dog', 'Frog', 'Horse', 'Ship', 'Truck'],
            datasets: [{
                label: 'Number of Images',
                data: [6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000, 6000],
                backgroundColor: '#4CAF50'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}