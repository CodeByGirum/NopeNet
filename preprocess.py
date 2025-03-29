#!/usr/bin/env python3
"""
NopeNet - Network Data Preprocessing
This script provides utilities to preprocess network traffic data for ML models.
Specifically designed to work with KDD Cup 1999 dataset features and our ensemble
of RF, CNN, and DNN models.
"""

import os
import numpy as np
from typing import List, Dict, Any, Union, Tuple

# Define KDD Cup 1999 dataset feature names
NETWORK_FEATURES = [
    # Basic features
    'duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
    'land', 'wrong_fragment', 'urgent',
    
    # Content features
    'hot', 'num_failed_logins', 'logged_in', 'num_compromised', 'root_shell',
    'su_attempted', 'num_root', 'num_file_creations', 'num_shells',
    'num_access_files', 'num_outbound_cmds', 'is_host_login', 'is_guest_login',
    
    # Traffic features
    'count', 'srv_count', 'serror_rate', 'srv_serror_rate', 'rerror_rate',
    'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate', 'srv_diff_host_rate',
    
    # Time-based traffic features
    'dst_host_count', 'dst_host_srv_count', 'dst_host_same_srv_rate',
    'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
    'dst_host_srv_diff_host_rate', 'dst_host_serror_rate',
    'dst_host_srv_serror_rate', 'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
]

# Define categorical features and their possible values
CATEGORICAL_FEATURES = {
    'protocol_type': ['tcp', 'udp', 'icmp'],
    'service': ['http', 'smtp', 'finger', 'domain_u', 'auth', 'telnet', 'ftp', 'eco_i', 
                'ntp_u', 'ecr_i', 'other', 'private', 'pop_3', 'ftp_data', 'rje', 'time', 
                'mtp', 'link', 'remote_job', 'gopher', 'ssh', 'name', 'whois', 'domain', 
                'login', 'imap4', 'daytime', 'ctf', 'nntp', 'shell', 'IRC', 'nnsp', 'http_443', 
                'exec', 'printer', 'efs', 'courier', 'uucp', 'klogin', 'kshell', 'echo', 
                'discard', 'systat', 'supdup', 'iso_tsap', 'hostnames', 'csnet_ns', 'pop_2', 
                'sunrpc', 'uucp_path', 'netbios_ns', 'netbios_ssn', 'netbios_dgm', 'sql_net', 
                'vmnet', 'bgp', 'Z39_50', 'ldap', 'netstat', 'urh_i', 'X11', 'urp_i', 'pm_dump', 
                'tftp_u', 'tim_i', 'red_i'],
    'flag': ['SF', 'S0', 'REJ', 'RSTO', 'RSTR', 'S1', 'S2', 'S3', 'OTH', 'RSTOS0', 'SH']
}

def normalize_numerical_features(data: np.ndarray, 
                               feature_indices: List[int],
                               clip_outliers: bool = True) -> np.ndarray:
    """
    Normalize numerical features to [0,1] range.
    
    Args:
        data: The input data array
        feature_indices: List of indices for numerical features
        clip_outliers: Whether to clip outliers before normalization
        
    Returns:
        Data with normalized numerical features
    """
    normalized_data = data.copy()
    
    for idx in feature_indices:
        feature_values = normalized_data[:, idx].astype(float)
        
        if clip_outliers:
            # Clip values beyond 3 standard deviations
            mean = np.mean(feature_values)
            std = np.std(feature_values)
            feature_values = np.clip(feature_values, mean - 3*std, mean + 3*std)
        
        # Min-max normalization
        min_val = np.min(feature_values)
        max_val = np.max(feature_values)
        
        if max_val > min_val:
            normalized_data[:, idx] = (feature_values - min_val) / (max_val - min_val)
        else:
            normalized_data[:, idx] = 0  # Handle constant features
            
    return normalized_data

def one_hot_encode_categorical(data: np.ndarray, 
                              categorical_features: Dict[int, List[str]]) -> np.ndarray:
    """
    One-hot encode categorical features.
    
    Args:
        data: The input data array
        categorical_features: Dictionary mapping feature indices to possible values
        
    Returns:
        Data with one-hot encoded categorical features
    """
    # Start with numerical features
    numerical_indices = [i for i in range(data.shape[1]) if i not in categorical_features]
    result = data[:, numerical_indices].astype(float)
    
    # Process each categorical feature
    for idx, possible_values in categorical_features.items():
        # Extract the categorical column
        cat_col = data[:, idx]
        
        # Create one-hot encoding
        for value in possible_values:
            # Create a new binary column for this category value
            new_col = (cat_col == value).astype(float)
            result = np.column_stack((result, new_col))
    
    return result

def extract_features_from_packet_capture(pcap_data: List[Dict]) -> np.ndarray:
    """
    Extract features from network packet capture data.
    
    Args:
        pcap_data: List of dictionaries containing packet information
        
    Returns:
        Feature matrix for ML model input
    """
    # Initialize empty feature array
    num_samples = len(pcap_data)
    num_features = len(NETWORK_FEATURES)
    features = np.zeros((num_samples, num_features), dtype=object)
    
    # Fill in the features based on packet data
    for i, packet in enumerate(pcap_data):
        for j, feature_name in enumerate(NETWORK_FEATURES):
            if feature_name in packet:
                features[i, j] = packet[feature_name]
            else:
                # Use appropriate default value based on feature type
                if feature_name in ['protocol_type', 'service', 'flag']:
                    features[i, j] = 'other'
                elif feature_name in ['land', 'wrong_fragment', 'urgent', 'hot', 
                                     'logged_in', 'is_host_login', 'is_guest_login']:
                    features[i, j] = 0
                else:
                    features[i, j] = 0.0
    
    return features

def preprocess_for_prediction(raw_data: np.ndarray) -> np.ndarray:
    """
    Preprocess raw network data for model prediction.
    
    Args:
        raw_data: Raw network traffic features
        
    Returns:
        Preprocessed data ready for ML model input
    """
    # Identify numerical and categorical feature indices
    numerical_indices = [i for i in range(raw_data.shape[1]) 
                        if i not in [1, 2, 3]]  # Indices of protocol_type, service, flag
    
    categorical_features = {
        1: CATEGORICAL_FEATURES['protocol_type'],
        2: CATEGORICAL_FEATURES['service'],
        3: CATEGORICAL_FEATURES['flag']
    }
    
    # Normalize numerical features
    normalized_data = normalize_numerical_features(raw_data, numerical_indices)
    
    # One-hot encode categorical features
    preprocessed_data = one_hot_encode_categorical(normalized_data, categorical_features)
    
    return preprocessed_data

def generate_sample_network_data(num_samples: int = 10) -> np.ndarray:
    """
    Generate sample network data for demonstration purposes.
    
    Args:
        num_samples: Number of samples to generate
        
    Returns:
        Sample network traffic data
    """
    # Initialize empty feature array
    features = np.zeros((num_samples, len(NETWORK_FEATURES)), dtype=object)
    
    # Generate random data
    for i in range(num_samples):
        # Categorical features
        features[i, 1] = np.random.choice(CATEGORICAL_FEATURES['protocol_type'])
        features[i, 2] = np.random.choice(CATEGORICAL_FEATURES['service'])
        features[i, 3] = np.random.choice(CATEGORICAL_FEATURES['flag'])
        
        # Numerical features - use appropriate distributions
        features[i, 0] = np.random.exponential(100)  # duration
        features[i, 4] = np.random.exponential(1000)  # src_bytes
        features[i, 5] = np.random.exponential(1000)  # dst_bytes
        
        # Binary features
        features[i, 6] = np.random.choice([0, 1], p=[0.99, 0.01])  # land
        features[i, 7] = np.random.choice([0, 1, 2, 3], p=[0.95, 0.03, 0.01, 0.01])  # wrong_fragment
        features[i, 8] = np.random.choice([0, 1, 2], p=[0.99, 0.007, 0.003])  # urgent
        
        # Other features with typical distributions
        for j in range(9, len(NETWORK_FEATURES)):
            if j in [11, 22]:  # logged_in, is_guest_login
                features[i, j] = np.random.choice([0, 1], p=[0.4, 0.6])
            elif j in [12, 13, 14, 15, 16, 17, 18, 19]:  # Rare events
                features[i, j] = np.random.choice([0, 1, 2, 3], p=[0.97, 0.02, 0.007, 0.003])
            else:
                # Continuous features
                features[i, j] = np.random.exponential(10)
    
    return features

if __name__ == "__main__":
    # Generate some sample data for testing
    print("Generating sample network traffic data...")
    sample_data = generate_sample_network_data(5)
    
    print("\nRaw sample data shape:", sample_data.shape)
    print("Sample data (first row):", sample_data[0])
    
    # Preprocess the data
    print("\nPreprocessing sample data...")
    preprocessed_data = preprocess_for_prediction(sample_data)
    
    print("Preprocessed data shape:", preprocessed_data.shape)
    print("Preprocessed data (first few features of first row):", preprocessed_data[0, :5])
    
    print("\nSimulating packet capture data...")
    packet_data = []
    for i in range(3):
        packet = {
            'src': f'192.168.1.{np.random.randint(1, 255)}',
            'dst': f'10.0.0.{np.random.randint(1, 255)}',
            'protocol_type': np.random.choice(['tcp', 'udp', 'icmp']),
            'service': np.random.choice(['http', 'ftp', 'ssh']),
            'duration': np.random.exponential(100),
            'src_bytes': np.random.exponential(1000),
            'dst_bytes': np.random.exponential(500)
        }
        packet_data.append(packet)
    
    print(f"Extracted {len(packet_data)} packets")
    features = extract_features_from_packet_capture(packet_data)
    print("Extracted feature shape:", features.shape)
    preprocessed = preprocess_for_prediction(features)
    print("Preprocessed feature shape:", preprocessed.shape)