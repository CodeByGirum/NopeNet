#!/usr/bin/env python3
"""
NopeNet - ML Ensemble for Network Intrusion Detection
This script demonstrates how to load and use the machine learning models
for network intrusion detection.
"""

import os
import pickle
import numpy as np
from sklearn.ensemble import VotingClassifier
from typing import Dict, List, Tuple, Union, Any

class IntrusionDetectionEnsemble:
    """Ensemble model for network intrusion detection using multiple ML models."""
    
    def __init__(self, model_paths: Dict[str, str]):
        """
        Initialize the ensemble with paths to different models.
        
        Args:
            model_paths: Dictionary with model names as keys and paths as values
        """
        self.models = {}
        self.load_models(model_paths)
        
    def load_models(self, model_paths: Dict[str, str]) -> None:
        """
        Load models from pickle files.
        
        Args:
            model_paths: Dictionary with model names as keys and paths as values
        """
        for name, path in model_paths.items():
            if os.path.exists(path):
                try:
                    with open(path, 'rb') as f:
                        self.models[name] = pickle.load(f)
                    print(f"Successfully loaded model: {name}")
                except Exception as e:
                    print(f"Error loading model {name}: {str(e)}")
            else:
                print(f"Model file not found: {path}")
    
    def get_model_info(self) -> Dict[str, Any]:
        """
        Get information about the loaded models.
        
        Returns:
            Dictionary with model information
        """
        info = {}
        for name, model in self.models.items():
            model_type = type(model).__name__
            if hasattr(model, 'feature_importances_'):
                top_features = np.argsort(model.feature_importances_)[-5:]
                info[name] = {
                    'type': model_type,
                    'top_features': top_features.tolist()
                }
            else:
                info[name] = {
                    'type': model_type
                }
        return info
    
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
        individual_preds = {}
        all_predictions = []
        
        # Get predictions from each model
        for name, model in self.models.items():
            try:
                pred = model.predict(features)
                individual_preds[name] = pred
                all_predictions.append(pred)
            except Exception as e:
                print(f"Error predicting with model {name}: {str(e)}")
        
        # Ensemble prediction (simple majority voting)
        if voting_method == 'hard':
            ensemble_pred = np.apply_along_axis(
                lambda x: np.bincount(x).argmax(), 
                axis=0, 
                arr=np.array(all_predictions)
            )
        else:
            # Average probabilities if models support predict_proba
            ensemble_pred = []
            
        return ensemble_pred, individual_preds
    
    def evaluate_confidence(self, features: np.ndarray) -> np.ndarray:
        """
        Evaluate prediction confidence based on model agreement.
        
        Args:
            features: Feature matrix for prediction
            
        Returns:
            Array of confidence scores between 0 and 1
        """
        _, individual_preds = self.predict(features)
        
        # Stack predictions from all models
        all_preds = np.array(list(individual_preds.values()))
        
        # Calculate agreement ratio for each sample
        n_models = len(individual_preds)
        if n_models == 0:
            return np.zeros(len(features))
            
        confidences = []
        for i in range(len(features)):
            # Extract predictions for sample i from all models
            sample_preds = all_preds[:, i]
            # Count occurrences of the most common prediction
            most_common_count = np.bincount(sample_preds).max()
            # Calculate confidence as ratio of models agreeing
            confidence = most_common_count / n_models
            confidences.append(confidence)
            
        return np.array(confidences)

def demo_ensemble():
    """Demonstrate how to use the ensemble model."""
    
    # Paths to model files
    model_paths = {
        'random_forest': 'models/intrusion_detection_model.pkl',
        'svm': 'models/svm_intrusion_model.pkl',
        'decision_tree': 'models/decision_tree_model.pkl'
    }
    
    # Create ensemble
    ensemble = IntrusionDetectionEnsemble(model_paths)
    
    # Display model information
    model_info = ensemble.get_model_info()
    print("\nModel Information:")
    for name, info in model_info.items():
        print(f"  {name}: {info['type']}")
        if 'top_features' in info:
            print(f"    Top 5 features: {info['top_features']}")
    
    print("\nEnsemble is ready for prediction!")
    print("To use for predictions, you would need to:")
    print("1. Preprocess network traffic data into feature vectors")
    print("2. Call ensemble.predict(features) to get predictions")
    print("3. Call ensemble.evaluate_confidence(features) to get confidence scores")

if __name__ == "__main__":
    demo_ensemble()