#!/usr/bin/env python3
"""
NopeNet - Network Data Preprocessing
This script provides utilities to preprocess network traffic data for ML models.
"""

import numpy as np
from typing import Dict, List, Tuple, Union, Any

# Typical network traffic features that might be used in intrusion detection
NETWORK_FEATURES = [
    'duration', 'protocol_type', 'service', 'flag', 'src_bytes', 'dst_bytes',
    'land', 'wrong_fragment', 'urgent', 'hot', 'num_failed_logins', 'logged_in',
    'num_compromised', 'root_shell', 'su_attempted', 'num_root', 'num_file_creations',
    'num_shells', 'num_access_files', 'num_outbound_cmds', 'is_host_login',
    'is_guest_login', 'count', 'srv_count', 'serror_rate', 'srv_serror_rate',
    'rerror_rate', 'srv_rerror_rate', 'same_srv_rate', 'diff_srv_rate',
    'srv_diff_host_rate', 'dst_host_count', 'dst_host_srv_count',
    'dst_host_same_srv_rate', 'dst_host_diff_srv_rate', 'dst_host_same_src_port_rate',
    'dst_host_srv_diff_host_rate', 'dst_host_serror_rate', 'dst_host_srv_serror_rate',
    'dst_host_rerror_rate', 'dst_host_srv_rerror_rate'
]

# Map of categorical features to their possible values
CATEGORICAL_FEATURES = {
    'protocol_type': ['tcp', 'udp', 'icmp'],
    'service': [
        'http', 'ftp', 'smtp', 'ssh', 'telnet', 'dns', 'pop3', 'imap', 
        'ntp', 'irc', 'ssl', 'radius', 'snmp', 'domain_u', 'other'
    ],
    'flag': ['SF', 'S0', 'REJ', 'RSTO', 'RSTR', 'SH', 'S1', 'S2', 'S3', 'OTH']
}

# Mapping of attack types to broader categories
ATTACK_CATEGORIES = {
    'normal': 'normal',
    'neptune': 'DoS',
    'back': 'DoS',
    'land': 'DoS',
    'pod': 'DoS',
    'smurf': 'DoS',
    'teardrop': 'DoS',
    'mailbomb': 'DoS',
    'apache2': 'DoS',
    'processtable': 'DoS',
    'udpstorm': 'DoS',
    'satan': 'Probe',
    'ipsweep': 'Probe',
    'portsweep': 'Probe',
    'nmap': 'Probe',
    'mscan': 'Probe',
    'saint': 'Probe',
    'buffer_overflow': 'U2R',
    'loadmodule': 'U2R',
    'perl': 'U2R',
    'rootkit': 'U2R',
    'xterm': 'U2R',
    'ps': 'U2R',
    'sqlattack': 'U2R',
    'httptunnel': 'U2R',
    'ftp_write': 'R2L',
    'guess_passwd': 'R2L',
    'imap': 'R2L',
    'multihop': 'R2L',
    'phf': 'R2L',
    'spy': 'R2L',
    'warezclient': 'R2L',
    'warezmaster': 'R2L',
    'snmpguess': 'R2L',
    'worm': 'R2L',
    'snmpgetattack': 'R2L'
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
        feature_data = normalized_data[:, idx]
        
        # Handle outliers
        if clip_outliers:
            q1, q3 = np.percentile(feature_data, [25, 75])
            iqr = q3 - q1
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            feature_data = np.clip(feature_data, lower_bound, upper_bound)
        
        # Normalize to [0,1]
        min_val = np.min(feature_data)
        max_val = np.max(feature_data)
        
        if max_val > min_val:
            normalized_data[:, idx] = (feature_data - min_val) / (max_val - min_val)
        else:
            normalized_data[:, idx] = 0  # If all values are the same
            
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
    # First determine the output size
    num_samples = data.shape[0]
    num_features = data.shape[1]
    
    # Calculate how many columns we'll add
    additional_columns = sum(len(values) for values in categorical_features.values())
    
    # Create the output array
    encoded_data = np.zeros((num_samples, num_features + additional_columns))
    
    # Copy over the original non-categorical features
    categorical_indices = list(categorical_features.keys())
    non_categorical_indices = [i for i in range(num_features) if i not in categorical_indices]
    
    # Copy non-categorical features directly
    for i, orig_idx in enumerate(non_categorical_indices):
        encoded_data[:, i] = data[:, orig_idx]
    
    # Now add the one-hot encoded features
    current_col = len(non_categorical_indices)
    
    for feat_idx, possible_values in categorical_features.items():
        feature_data = data[:, feat_idx]
        
        for value in possible_values:
            matches = (feature_data == value)
            encoded_data[:, current_col] = matches.astype(int)
            current_col += 1
            
    return encoded_data

def extract_features_from_packet_capture(pcap_data: List[Dict]) -> np.ndarray:
    """
    Extract features from network packet capture data.
    
    Args:
        pcap_data: List of dictionaries containing packet information
        
    Returns:
        Feature matrix for ML model input
    """
    # This is a placeholder - in a real implementation, this would parse 
    # actual packet capture data and extract relevant features
    num_samples = len(pcap_data)
    num_features = len(NETWORK_FEATURES)
    
    features = np.zeros((num_samples, num_features))
    
    for i, packet in enumerate(pcap_data):
        # Extract each feature from the packet data
        for j, feature_name in enumerate(NETWORK_FEATURES):
            if feature_name in packet:
                # Convert categorical features to numeric codes
                if feature_name in CATEGORICAL_FEATURES:
                    # Get the index of the value in the possible values list
                    value = packet[feature_name]
                    possible_values = CATEGORICAL_FEATURES[feature_name]
                    if value in possible_values:
                        features[i, j] = possible_values.index(value)
                    else:
                        # Use the last index for 'other' or unknown values
                        features[i, j] = len(possible_values) - 1
                else:
                    # For numerical features, just use the value
                    features[i, j] = packet[feature_name]
    
    return features

def preprocess_for_prediction(raw_data: np.ndarray) -> np.ndarray:
    """
    Preprocess raw network data for model prediction.
    
    Args:
        raw_data: Raw network traffic features
        
    Returns:
        Preprocessed data ready for ML model input
    """
    # Identify numerical feature indices (assume all are numerical except known categorical)
    categorical_indices = {}
    for i, feature in enumerate(NETWORK_FEATURES):
        if feature in CATEGORICAL_FEATURES:
            categorical_indices[i] = CATEGORICAL_FEATURES[feature]
    
    numerical_indices = [i for i in range(len(NETWORK_FEATURES)) 
                        if i not in categorical_indices]
    
    # Normalize numerical features
    normalized_data = normalize_numerical_features(raw_data, numerical_indices)
    
    # One-hot encode categorical features
    preprocessed_data = one_hot_encode_categorical(normalized_data, categorical_indices)
    
    return preprocessed_data

def generate_sample_network_data(num_samples: int = 10) -> np.ndarray:
    """
    Generate sample network data for demonstration purposes.
    
    Args:
        num_samples: Number of samples to generate
        
    Returns:
        Sample network traffic data
    """
    # This is just for demonstration - real data would come from network traffic
    np.random.seed(42)  # For reproducibility
    
    # Create a sample data array
    data = np.zeros((num_samples, len(NETWORK_FEATURES)))
    
    # Fill with random values
    for i in range(len(NETWORK_FEATURES)):
        feature_name = NETWORK_FEATURES[i]
        
        if feature_name in CATEGORICAL_FEATURES:
            # For categorical features, assign random categories
            categories = CATEGORICAL_FEATURES[feature_name]
            category_indices = np.random.randint(0, len(categories), size=num_samples)
            data[:, i] = category_indices
        else:
            # For numerical features, assign random values
            if 'bytes' in feature_name:
                # Use larger range for byte counts
                data[:, i] = np.random.randint(0, 10000, size=num_samples)
            elif 'rate' in feature_name:
                # Use [0,1] for rates
                data[:, i] = np.random.random(size=num_samples)
            elif 'count' in feature_name:
                # Use moderate range for counts
                data[:, i] = np.random.randint(0, 100, size=num_samples)
            else:
                # Default range for other numerical features
                data[:, i] = np.random.randint(0, 10, size=num_samples)
    
    return data

if __name__ == "__main__":
    # Demonstrate preprocessing
    print("Generating sample network traffic data...")
    sample_data = generate_sample_network_data(5)
    
    print("\nSample raw data (first 5 features only):")
    for i in range(5):
        feature_values = sample_data[i, :5]
        print(f"Sample {i+1}: {feature_values}")
    
    print("\nPreprocessing data...")
    preprocessed_data = preprocess_for_prediction(sample_data)
    
    print(f"\nPreprocessed data shape: {preprocessed_data.shape}")
    print("After preprocessing, the data is ready for model input")