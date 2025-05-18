import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.datasets import cifar10
from tensorflow.keras.utils import to_categorical
import numpy as np

# Define the model architecture
def create_model():
    model = Sequential()
    # CONV => RELU => CONV => RELU => POOL => DROPOUT
    model.add(Conv2D(32, (3, 3), padding='same', input_shape=(32, 32, 3)))
    model.add(Activation('relu'))
    model.add(Conv2D(32, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    # CONV => RELU => CONV => RELU => POOL => DROPOUT
    model.add(Conv2D(64, (3, 3), padding='same'))
    model.add(Activation('relu'))
    model.add(Conv2D(64, (3, 3)))
    model.add(Activation('relu'))
    model.add(MaxPooling2D(pool_size=(2, 2)))
    model.add(Dropout(0.25))

    # FLATTERN => DENSE => RELU => DROPOUT
    model.add(Flatten())
    model.add(Dense(512))
    model.add(Activation('relu'))
    model.add(Dropout(0.5))
    # a softmax classifier
    model.add(Dense(10))
    model.add(Activation('softmax'))

    return model

if __name__ == "__main__":
    print("Loading CIFAR-10 dataset...")
    # Load CIFAR-10 data
    (x_train, y_train), (x_test, y_test) = cifar10.load_data()
    
    # Convert class vectors to binary class matrices
    y_train = to_categorical(y_train, 10)
    y_test = to_categorical(y_test, 10)
    
    # Normalize data
    x_train = x_train.astype('float32') / 255
    x_test = x_test.astype('float32') / 255
    
    print("Creating and training the CIFAR-10 model...")
    model = create_model()
    
    # Compile the model
    model.compile(loss='categorical_crossentropy',
                 optimizer='adam',
                 metrics=['accuracy'])
    
    # Train the model
    print("Training model...")
    model.fit(x_train, y_train,
              batch_size=32,
              epochs=10,
              validation_data=(x_test, y_test),
              shuffle=True)
    
    # Evaluate the model
    scores = model.evaluate(x_test, y_test, verbose=1)
    print(f'Test loss: {scores[0]}')
    print(f'Test accuracy: {scores[1]}')
    
    # Save the model
    model.save('cifar10_model.h5')
    print("Model saved as 'cifar10_model.h5'")
 