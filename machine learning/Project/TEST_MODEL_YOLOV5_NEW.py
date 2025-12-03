"""
Script untuk test model dari yolov5_new
Memastikan model bisa digunakan untuk deteksi
"""

import torch
from pathlib import Path
import cv2
import numpy as np

# Import config
try:
    from config import MODEL_PATH, CONFIDENCE_THRESHOLD
except ImportError:
    print("❌ config.py tidak ditemukan!")
    exit(1)

print("="*70)
print("TEST MODEL YOLOV5_NEW")
print("="*70)
print(f"\n📍 Model Path: {MODEL_PATH}")
print(f"📍 Confidence Threshold: {CONFIDENCE_THRESHOLD}")
print()

# Cek file model
if not Path(MODEL_PATH).exists():
    print(f"❌ Model tidak ditemukan di: {MODEL_PATH}")
    print("\nPastikan model sudah ada di folder tersebut!")
    exit(1)

print("✅ Model file ditemukan!")

# Load model
print("\n[INFO] Loading model...")
try:
    model = torch.hub.load('ultralytics/yolov5', 'custom', 
                          path=MODEL_PATH, force_reload=False)
    model.conf = CONFIDENCE_THRESHOLD
    print("✅ Model loaded successfully!")
    
    print(f"\n[INFO] Model Classes: {model.names}")
    print(f"[INFO] Confidence Threshold: {model.conf}")
    print(f"[INFO] Model Device: {next(model.parameters()).device}")
    
    # Verifikasi kelas
    expected_classes = ['primordia', 'Fase Muda', 'Matang']
    model_classes = list(model.names.values())
    
    print(f"\n[INFO] Expected classes: {expected_classes}")
    print(f"[INFO] Model classes: {model_classes}")
    
    # Test dengan gambar kosong (dummy test)
    print("\n" + "="*70)
    print("TEST DETECTION")
    print("="*70)
    
    # Buat dummy image (hitam)
    test_image = np.zeros((640, 640, 3), dtype=np.uint8)
    
    print("\n[INFO] Running test detection...")
    results = model(test_image)
    df = results.pandas().xyxy[0]
    
    print(f"[INFO] Test detection completed!")
    print(f"[INFO] Raw detections: {len(df)} detections")
    
    if len(df) > 0:
        print("\n[INFO] Detection details:")
        print(df[['name', 'confidence']].head())
    
    print("\n" + "="*70)
    print("✅ MODEL SIAP DIGUNAKAN!")
    print("="*70)
    print("\nModel dari yolov5_new sudah berhasil di-load dan siap digunakan.")
    print("Jika tidak ada deteksi saat live camera, kemungkinan:")
    print("  1. Tidak ada jamur di frame kamera")
    print("  2. Confidence threshold perlu diturunkan")
    print("  3. Pencahayaan kurang baik")
    print()
    
except Exception as e:
    print(f"\n❌ Error: {e}")
    import traceback
    traceback.print_exc()
    exit(1)

