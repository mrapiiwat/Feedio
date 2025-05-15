import sys
import tensorflow as tf
import cv2
import numpy as np
from tensorflow.keras.applications.efficientnet import preprocess_input

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')

CLASS_NAMES = ['dogs', 'not_dogs']
import os   

# Get the directory containing the script
script_dir = os.path.dirname(os.path.abspath(__file__))
# Model path is relative to the script directory
model_path = os.path.join(script_dir, 'dog_classifier_final.h5')
# Print debug info to stderr instead of stdout
print(f"Loading model from: {model_path}", file=sys.stderr)

# Check if model file exists
if not os.path.exists(model_path):
    print(f"Error: Model file not found at {model_path}", file=sys.stderr)
    # Try to find the model in other locations
    possible_paths = [
        os.path.join('/app/src', 'dog_classifier_final.h5'),
        os.path.join('/app/dist', 'dog_classifier_final.h5'),
        os.path.join('/app', 'dog_classifier_final.h5')
    ]
    for path in possible_paths:
        if os.path.exists(path):
            print(f"Found model at alternative location: {path}", file=sys.stderr)
            model_path = path
            break
    else:
        print("Could not find model file in any location", file=sys.stderr)
        # List files in current directory to debug
        print(f"Files in {script_dir}:", file=sys.stderr)
        for file in os.listdir(script_dir):
            print(f"  {file}", file=sys.stderr)
        sys.exit(2)
model = tf.keras.models.load_model(model_path)

image_path = sys.argv[1]
image = cv2.imread(image_path)
if image is None:
    print(f"Error: Could not load image at {image_path}")
    sys.exit(1)

image = cv2.resize(image, (224, 224))
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = np.expand_dims(image, axis=0)
image = preprocess_input(image)

predictions = model.predict(image, verbose=0)
prob = predictions[0] if predictions.shape == (1,) else predictions[0][0]
predicted_class = int(prob > 0.5)
predicted_label = CLASS_NAMES[predicted_class]

print(predicted_label)
sys.exit(0)

if not os.path.exists(model_path):
    print(f"Error: Model file not found at {model_path}", file=sys.stderr)
    # Try to find the model in other locations
    possible_paths = [
        os.path.join('/app/src', 'dog_classifier_final.h5'),
        os.path.join('/app/dist', 'dog_classifier_final.h5'),
        os.path.join('/app', 'dog_classifier_final.h5')
    ]
    for path in possible_paths:
        if os.path.exists(path):
            print(f"Found model at alternative location: {path}", file=sys.stderr)
            model_path = path
            break
    else:
        print("Could not find model file in any location", file=sys.stderr)
        # List files in current directory to debug
        print(f"Files in {script_dir}:", file=sys.stderr)
        for file in os.listdir(script_dir):
            print(f"  {file}", file=sys.stderr)
        sys.exit(2)
model = tf.keras.models.load_model(model_path)

image_path = sys.argv[1]
image = cv2.imread(image_path)
if image is None:
    print(f"Error: Could not load image at {image_path}")
    sys.exit(1)

image = cv2.resize(image, (224, 224))
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = np.expand_dims(image, axis=0)
image = preprocess_input(image)

predictions = model.predict(image, verbose=0)
prob = predictions[0] if predictions.shape == (1,) else predictions[0][0]
predicted_class = int(prob > 0.5)
predicted_label = CLASS_NAMES[predicted_class]

print(predicted_label)
sys.exit(0)

if image is None:
    print(f"Error: Could not load image at {image_path}")
    sys.exit(1)

image = cv2.resize(image, (224, 224))
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
image = np.expand_dims(image, axis=0)
image = preprocess_input(image)

predictions = model.predict(image, verbose=0)
prob = predictions[0] if predictions.shape == (1,) else predictions[0][0]
predicted_class = int(prob > 0.5)
predicted_label = CLASS_NAMES[predicted_class]

print(predicted_label)
sys.exit(0)

