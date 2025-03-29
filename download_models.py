#!/usr/bin/env python3
"""
NopeNet - Download Pre-trained Models
This script downloads pre-trained models for the KDD Cup 1999 dataset from public sources.
"""

import os
import sys
import pickle
import zipfile
import requests
from pathlib import Path
from typing import Dict, List, Any, Union, Tuple

# Model storage directories
MODEL_DIRS = {
    'random_forest': 'models/rf',
    'cnn': 'models/cnn',
    'dnn': 'models/dnn',
    'svm': 'models/svm'
}

# URLs for pre-trained models (these are placeholders)
MODEL_URLS = {
    'random_forest': 'https://example.com/models/rf_kdd99_model.pkl.zip',
    'cnn': 'https://example.com/models/cnn_kdd99_model.pkl.zip',
    'dnn': 'https://example.com/models/dnn_kdd99_model.pkl.zip'
}

# Create placeholder models using scikit-learn
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Simple classifier for non-sklearn models that can be pickled
class SimpleClassifier:
    def __init__(self, model_type):
        self.model_type = model_type
        self.attack_classes = {
            0: 'normal',
            1: 'DoS',      # Denial of Service
            2: 'Probe',    # Surveillance/Scanning
            3: 'R2L',      # Remote to Local
            4: 'U2R'       # User to Root
        }
        # Pre-compute some random values for predictions to make pickling easier
        self._prediction_cache = {}
        
    def predict(self, X):
        # Use array length as a simple cache key
        length = len(X)
        if length not in self._prediction_cache:
            # Generate predictions with more normal and DoS, fewer of others
            classes = [0, 1, 2, 3, 4]  # normal, DoS, Probe, R2L, U2R
            probabilities = [0.4, 0.3, 0.2, 0.07, 0.03]  # Realistic distribution
            import random
            self._prediction_cache[length] = [random.choices(classes, probabilities)[0] for _ in range(length)]
        
        return self._prediction_cache[length]
        
    def predict_proba(self, X):
        length = len(X)
        # Simple random probabilities that add up to 1
        result = []
        import random
        for _ in range(length):
            # Generate 5 random values that sum to 1
            r = [random.random() for _ in range(5)]
            total = sum(r)
            probas = [v/total for v in r]
            result.append(probas)
        return result

def create_placeholder_model(model_type, output_path):
    """Create a simple placeholder model for demonstration purposes."""
    
    # Ensure directory exists
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    if model_type == 'random_forest':
        # Simple random forest model
        model = RandomForestClassifier(
            n_estimators=10, 
            max_depth=5, 
            random_state=42
        )
    else:
        # Use the simple classifier for non-sklearn models
        model = SimpleClassifier(model_type)
    
    # Save the model
    with open(output_path, 'wb') as f:
        pickle.dump(model, f)
    
    # Output to stderr instead of stdout for better compatibility with JSON
    sys.stderr.write(f"Created placeholder {model_type} model\n")
    sys.stderr.flush()
    return model

def download_model(model_name, url, output_path):
    """
    Download model from URL and save to output_path.
    For this demo, we'll create placeholder models instead of downloading.
    """
    try:
        # Ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # For demonstration, we'll create placeholder models
        # In a real application, you would download the model file like this:
        # 
        # response = requests.get(url, stream=True)
        # response.raise_for_status()
        # 
        # # Save zip file
        # zip_path = f"{output_path}.zip"
        # with open(zip_path, 'wb') as f:
        #     for chunk in response.iter_content(chunk_size=8192):
        #         f.write(chunk)
        # 
        # # Extract model
        # with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        #     zip_ref.extractall(os.path.dirname(output_path))
        # 
        # # Clean up
        # os.remove(zip_path)
        
        # Create placeholder model
        create_placeholder_model(model_name, output_path)
        
        return True
    except Exception as e:
        sys.stderr.write(f"Error downloading {model_name} model: {e}\n")
        sys.stderr.flush()
        return False

def main():
    """Main function to download all models."""
    # Create model directories
    for model_dir in MODEL_DIRS.values():
        os.makedirs(model_dir, exist_ok=True)
    
    # Download models
    success_count = 0
    for model_name, model_dir in MODEL_DIRS.items():
        output_path = os.path.join(model_dir, f"{model_name}_kdd99_model.pkl")
        
        # Skip if model already exists
        if os.path.exists(output_path):
            sys.stderr.write(f"{model_name.capitalize()} model already exists\n")
            success_count += 1
            continue
        
        if model_name in MODEL_URLS:
            url = MODEL_URLS[model_name]
            sys.stderr.write(f"Preparing {model_name} model...\n")
            if download_model(model_name, url, output_path):
                success_count += 1
        else:
            # Create placeholder for any model not in MODEL_URLS
            sys.stderr.write(f"Creating placeholder {model_name} model...\n")
            create_placeholder_model(model_name, output_path)
            success_count += 1
    
    sys.stderr.write(f"Model preparation completed: {success_count}/{len(MODEL_DIRS)} models ready.\n")
    sys.stderr.flush()
    
    # Create a models list file for reference
    with open('models/models_list.txt', 'w') as f:
        for model_name, model_dir in MODEL_DIRS.items():
            f.write(f"{model_name}: {os.path.join(model_dir, f'{model_name}_kdd99_model.pkl')}\n")
    
    return success_count == len(MODEL_DIRS)

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)