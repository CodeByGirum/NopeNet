#!/usr/bin/env python3
"""
NopeNet - ML Ensemble for Network Intrusion Detection
This script loads pre-trained models for KDD Cup 1999 dataset based network intrusion detection.
The ensemble combines Random Forest, CNN, and DNN models for improved accuracy and robustness.
"""

import os
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from typing import Dict, List, Any, Tuple

class IntrusionDetectionEnsemble:
    """Ensemble model for network intrusion detection using multiple ML models."""
    
    def __init__(self, model_paths: Dict[str, str]):
        """
        Initialize the ensemble with paths to different models.
        
        Args:
            model_paths: Dictionary with model names as keys and paths as values
        """
        self.models = {}
        self.model_info = {}
        
        # Load models from files
        self.load_models(model_paths)
        
        # Attack classes in KDD Cup 1999 dataset
        self.attack_classes = {
            0: 'normal',
            1: 'DoS',      # Denial of Service
            2: 'Probe',    # Surveillance/Scanning
            3: 'R2L',      # Remote to Local
            4: 'U2R'       # User to Root
        }
        
        print(f"Ensemble initialized with {len(self.models)} models")
    
    def load_models(self, model_paths: Dict[str, str]) -> None:
        """
        Load models from pickle files.
        
        Args:
            model_paths: Dictionary with model names as keys and paths as values
        """
        for model_name, path in model_paths.items():
            # Ensure directory exists
            os.makedirs(os.path.dirname(path), exist_ok=True)
            
            try:
                if os.path.exists(path):
                    # Load existing model
                    with open(path, 'rb') as f:
                        self.models[model_name] = pickle.load(f)
                    print(f"Loaded {model_name} model from {path}")
                else:
                    # Create a simpler placeholder model for demo purposes
                    print(f"Model file not found: {path}")
                    if model_name == 'random_forest':
                        self.models[model_name] = RandomForestClassifier(
                            n_estimators=10, max_depth=5, random_state=42)
                    else:
                        # For CNN and DNN, create a simple classifier that uses our SimpleClassifier class
                        from download_models import SimpleClassifier
                        self.models[model_name] = SimpleClassifier(model_name)
                    
                    print(f"Created placeholder {model_name} model")
                
                # Store model info
                self.model_info[model_name] = {
                    'type': model_name,
                    'path': path,
                    'loaded': True
                }
                
            except Exception as e:
                print(f"Error loading {model_name} model: {e}")
                self.model_info[model_name] = {
                    'type': model_name,
                    'path': path,
                    'loaded': False,
                    'error': str(e)
                }
    
    def get_model_info(self) -> Dict[str, Any]:
        """
        Get information about the loaded models.
        
        Returns:
            Dictionary with model information
        """
        return {
            'models': self.model_info,
            'ensemble_size': len(self.models),
            'attack_classes': self.attack_classes
        }
    
    def predict(self, features: np.ndarray, 
                voting_method: str = 'hard') -> Tuple[np.ndarray, Dict[str, np.ndarray]]:
        """
        Predict using all models and return ensemble prediction.
        
        Args:
            features: Feature matrix for prediction
            voting_method: 'hard' for majority voting, 'soft' for probability averaging
            
        Returns:
            Tuple of (ensemble predictions, individual model predictions)
        """
        if len(self.models) == 0:
            raise ValueError("No models available in the ensemble")
        
        # Initialize predictions
        individual_preds = {}
        ensemble_pred = None
        
        # Get predictions from each model
        for name, model in self.models.items():
            try:
                individual_preds[name] = model.predict(features)
            except Exception as e:
                print(f"Error predicting with {name} model: {e}")
                # Fill with default prediction if model fails
                individual_preds[name] = np.zeros(len(features))
        
        if voting_method == 'hard':
            # Hard voting (majority)
            all_preds = np.array([preds for preds in individual_preds.values()])
            ensemble_pred = np.zeros(len(features))
            
            for i in range(len(features)):
                # Get the most common prediction for this sample
                sample_preds = all_preds[:, i]
                values, counts = np.unique(sample_preds, return_counts=True)
                ensemble_pred[i] = values[np.argmax(counts)]
                
        elif voting_method == 'soft':
            # Soft voting (average probabilities)
            proba_preds = {}
            
            # Get probability predictions from each model
            for name, model in self.models.items():
                try:
                    if hasattr(model, 'predict_proba'):
                        proba_preds[name] = model.predict_proba(features)
                    else:
                        # Convert class predictions to one-hot encoded probabilities
                        n_classes = len(self.attack_classes)
                        probs = np.zeros((len(features), n_classes))
                        for i, pred in enumerate(individual_preds[name]):
                            probs[i, int(pred)] = 1.0
                        proba_preds[name] = probs
                except Exception as e:
                    print(f"Error getting probabilities from {name} model: {e}")
                    # Fill with uniform probabilities if model fails
                    proba_preds[name] = np.ones((len(features), len(self.attack_classes))) / len(self.attack_classes)
            
            # Average probabilities
            avg_proba = np.zeros((len(features), len(self.attack_classes)))
            for probs in proba_preds.values():
                avg_proba += probs
            avg_proba /= len(proba_preds)
            
            # Get class with highest probability
            ensemble_pred = np.argmax(avg_proba, axis=1)
        
        else:
            raise ValueError(f"Unknown voting method: {voting_method}")
            
        return ensemble_pred, individual_preds
    
    def evaluate_confidence(self, features: np.ndarray) -> np.ndarray:
        """
        Evaluate prediction confidence based on model agreement.
        
        Args:
            features: Feature matrix for prediction
            
        Returns:
            Array of confidence scores between 0 and 1
        """
        # Get predictions from all models
        ensemble_pred, individual_preds = self.predict(features)
        
        # Calculate agreement between models
        agreement = np.zeros(len(features))
        num_models = len(individual_preds)
        
        for i in range(len(features)):
            # Count how many models agree with the ensemble prediction for this sample
            agreement_count = sum(1 for preds in individual_preds.values() 
                                 if preds[i] == ensemble_pred[i])
            agreement[i] = agreement_count / num_models
        
        return agreement

def demo_ensemble():
    """Demonstrate how to use the ensemble model."""
    # Define model paths
    model_paths = {
        'random_forest': 'models/rf/rf_kdd99_model.pkl',
        'cnn': 'models/cnn/cnn_kdd99_model.pkl',
        'dnn': 'models/dnn/dnn_kdd99_model.pkl'
    }
    
    # Create ensemble
    ensemble = IntrusionDetectionEnsemble(model_paths)
    
    # Show model info
    info = ensemble.get_model_info()
    print(f"Ensemble info: {info}")
    
    # Generate some fake features for demonstration
    print("Generating example features...")
    n_features = 122  # Typical preprocessed feature count for KDD Cup dataset
    n_samples = 5
    features = np.random.rand(n_samples, n_features)
    
    # Make predictions
    print("Making predictions...")
    predictions, individual_preds = ensemble.predict(features)
    
    # Evaluate confidence
    confidences = ensemble.evaluate_confidence(features)
    
    # Display results
    print("\nPrediction results:")
    for i in range(n_samples):
        attack_type = ensemble.attack_classes[predictions[i]]
        print(f"Sample {i+1}: Prediction = {attack_type} (class {predictions[i]}), Confidence = {confidences[i]:.2f}")
        
        # Show individual model predictions
        model_preds = [f"{name}: {ensemble.attack_classes[pred[i]]}" 
                       for name, pred in individual_preds.items()]
        print(f"  Individual model predictions: {', '.join(model_preds)}")

if __name__ == "__main__":
    demo_ensemble()