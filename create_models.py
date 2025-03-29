#!/usr/bin/env python3
"""
NopeNet - Create Sample ML Models
This script creates sample machine learning models for network intrusion detection
and saves them as pickle files for demonstration purposes.
"""

import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import make_classification

# Create a directory for models if it doesn't exist
os.makedirs('models', exist_ok=True)

# Generate a synthetic dataset for training demonstration models
# This would be replaced with real network traffic data in a production system
X, y = make_classification(
    n_samples=1000,
    n_features=41,  # Typical for network intrusion datasets like NSL-KDD
    n_informative=20,
    n_redundant=5,
    n_classes=5,  # normal, DoS, Probe, R2L, U2R
    n_clusters_per_class=2,
    random_state=42
)

# Train Random Forest model
print("Training Random Forest model...")
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X, y)

# Train SVM model
print("Training SVM model...")
svm_model = SVC(kernel='rbf', probability=True, random_state=42)
svm_model.fit(X, y)

# Train Decision Tree model
print("Training Decision Tree model...")
dt_model = DecisionTreeClassifier(max_depth=10, random_state=42)
dt_model.fit(X, y)

# Save the models
print("Saving models to pickle files...")

with open('models/intrusion_detection_model.pkl', 'wb') as f:
    pickle.dump(rf_model, f)
    
with open('models/svm_intrusion_model.pkl', 'wb') as f:
    pickle.dump(svm_model, f)
    
with open('models/decision_tree_model.pkl', 'wb') as f:
    pickle.dump(dt_model, f)

print("Models created and saved successfully!")
print("You can now run ml_ensemble.py to test the ensemble.")