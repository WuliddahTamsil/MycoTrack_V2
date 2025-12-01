import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { StatCard } from '../shared/StatCard';
import { SensorChart } from '../shared/SensorChart';
import { Thermometer, Droplets, Video, Square, Calendar as CalendarIcon, TrendingUp, Upload, Camera, Save } from 'lucide-react';
import { generateMockSensorData } from '../mockData';
import { useAuth } from '../AuthContext';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { toast } from 'sonner';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

export const FarmerMonitoring: React.FC = () => {
  const { user } = useAuth();
  const [isSimulationRunning] = useState(false);
  const [sensorData, setSensorData] = useState(generateMockSensorData(user?.id || 'f1', 1));

  // ML Detection states
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [saveForm, setSaveForm] = useState({
    title: '',
    description: '',
    baglogId: 'Baglog #1',
    tags: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Detection Mode: 'upload' or 'camera'
  const [detectionMode, setDetectionMode] = useState<'upload' | 'camera'>('upload');
  
  // Live Camera states
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Detected growth phase (sinkron dengan hasil deteksi)
  const [detectedPhase, setDetectedPhase] = useState<string | null>(null);

  // Historical data states
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [historicalData, setHistoricalData] = useState(() => {
    const days = 7;
    return generateMockSensorData(user?.id || 'f1', days);
  });

  useEffect(() => {
    if (isSimulationRunning) {
      const interval = setInterval(() => {
        const newData = generateMockSensorData(user?.id || 'f1', 1);
        setSensorData(prev => [...prev.slice(-24), ...newData]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isSimulationRunning, user?.id]);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const latestData = sensorData[sensorData.length - 1];

  const handleApplyDateFilter = () => {
    if (startDate && endDate) {
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const newHistoricalData = generateMockSensorData(user?.id || 'f1', diffDays);
      setHistoricalData(newHistoricalData);
    }
  };

  // ML Detection functions
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Stop camera if active when uploading
    if (isCameraActive) {
      stopCamera();
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageData = event.target?.result as string;
      setCurrentImage(imageData);
      setDetectionResults(null);
    };
    reader.readAsDataURL(file);
  };

  const captureFromWebcam = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      // Pastikan video sudah ready
      if (video.readyState < 2) {
        console.warn('Video not ready yet, readyState:', video.readyState);
        return;
      }
      
      // Set canvas dimensions to match video
      const videoWidth = video.videoWidth || 640;
      const videoHeight = video.videoHeight || 480;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Draw video frame to canvas
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        
        // Convert to base64
        const imageData = canvas.toDataURL('image/jpeg', 0.95);
        console.log('Frame captured, size:', imageData.length, 'bytes');
        setCurrentImage(imageData);
        setDetectionResults(null);
        return true;
      }
    } else {
      console.error('Video or canvas ref is null');
    }
    return false;
  };

  // Handle mode change
  const handleModeChange = (mode: 'upload' | 'camera') => {
    if (mode === detectionMode) return;
    
    // If switching from camera to upload, stop camera first
    if (detectionMode === 'camera' && isCameraActive) {
      stopCamera();
    }
    
    // If switching from upload to camera, clear uploaded image
    if (mode === 'camera' && currentImage && !isCameraActive) {
      setCurrentImage(null);
      setDetectionResults(null);
    }
    
    setDetectionMode(mode);
  };

  // Start camera
  const startCamera = async () => {
    try {
      console.log('Starting camera...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user' // Use front camera on desktop
        } 
      });
      
      console.log('Camera stream obtained:', stream);
      
      // Set state first
      setIsCameraActive(true);
      setCurrentImage(null); // Clear uploaded image when camera starts
      setDetectionResults(null);
      
      // Wait a bit for state to update and video element to be ready
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Setting video srcObject...');
          videoRef.current.srcObject = stream;
          
          // Force play
          videoRef.current.play()
            .then(() => {
              console.log('Video is playing');
              toast.success('Kamera berhasil diaktifkan');
            })
            .catch(err => {
              console.error('Error playing video:', err);
              toast.error('Gagal memutar video. Coba refresh halaman.');
            });
        } else {
          console.error('Video ref is null');
        }
      }, 100);
      
    } catch (error: any) {
      console.error('Error accessing camera:', error);
      setIsCameraActive(false);
      toast.error('Gagal mengakses kamera. Pastikan izin kamera sudah diberikan.');
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
      setCurrentImage(null);
      setDetectionResults(null);
    }
  };


  const runDetection = async () => {
    if (!currentImage) {
      console.error('No image to detect');
      toast.error('Pilih atau ambil foto terlebih dahulu');
      return;
    }

    console.log('Starting detection...');
    setIsDetecting(true);
    try {
      const formData = new FormData();
      
      // Convert base64 to blob
      console.log('Converting base64 to blob...');
      const response = await fetch(currentImage);
      const blob = await response.blob();
      console.log('Blob created, size:', blob.size, 'bytes, type:', blob.type);
      
      formData.append('image', blob, 'image.jpg');

      console.log('Sending to ML API:', 'http://localhost:3000/api/ml/detect');
      const res = await fetch('http://localhost:3000/api/ml/detect', {
        method: 'POST',
        body: formData
      });

      console.log('Response status:', res.status, res.statusText);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Detection API error:', errorData);
        throw new Error(errorData.error || errorData.details || `HTTP ${res.status}: Detection failed`);
      }

      const data = await res.json();
      console.log('Detection response:', data);
      
      if (!data.success) {
        console.error('Detection failed:', data.error);
        throw new Error(data.error || 'Detection failed');
      }
      
      console.log('Detection successful! Detections:', data.detections?.length || 0);
      
      setDetectionResults(data);
      
      // Update fase pertumbuhan berdasarkan hasil deteksi
      if (data.detections && data.detections.length > 0) {
        // Ambil fase dengan jumlah terbanyak
        const phaseCounts = {
          'Primordia': data.summary?.Primordia || 0,
          'Muda': data.summary?.Muda || 0,
          'Matang': data.summary?.Matang || 0
        };
        
        // Tentukan fase dominan berdasarkan jumlah terbanyak
        let dominantPhase = 'Pertumbuhan';
        const maxCount = Math.max(phaseCounts.Primordia, phaseCounts.Muda, phaseCounts.Matang);
        
        if (maxCount > 0) {
          // Prioritas: Matang > Muda > Primordia (jika jumlah sama)
          if (phaseCounts.Matang > 0 && phaseCounts.Matang >= phaseCounts.Muda && phaseCounts.Matang >= phaseCounts.Primordia) {
            dominantPhase = 'Matang (Siap Panen)';
          } else if (phaseCounts.Muda > 0 && phaseCounts.Muda >= phaseCounts.Primordia) {
            dominantPhase = 'Muda';
          } else if (phaseCounts.Primordia > 0) {
            dominantPhase = 'Primordia';
          }
        }
        
        setDetectedPhase(dominantPhase);
        
        // Update sensor data dengan fase terdeteksi (untuk konsistensi)
        if (sensorData.length > 0) {
          const updatedData = [...sensorData];
          updatedData[updatedData.length - 1] = {
            ...updatedData[updatedData.length - 1],
            phase: dominantPhase
          };
          setSensorData(updatedData);
        }
      } else {
        // Jika tidak ada deteksi, reset ke null agar pakai fase default
        setDetectedPhase(null);
      }
      
      toast.success(`Deteksi berhasil! Ditemukan ${data.total_detections || 0} jamur`);
    } catch (error: any) {
      console.error('Detection error:', error);
      const errorMessage = error.message || 'Gagal melakukan deteksi';
      
      // Handle network errors
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage.includes('ECONNREFUSED')) {
        toast.error(
          <div>
            <p className="font-bold">ML Service tidak berjalan!</p>
            <p className="text-sm">Jalankan: <code>python ml_api_service.py</code> di folder machine learning/Project</p>
          </div>,
          { duration: 5000 }
        );
      } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        toast.error('Endpoint tidak ditemukan. Pastikan backend berjalan di port 3000.');
      } else if (errorMessage.includes('500') || errorMessage.includes('Internal Server Error')) {
        toast.error('Error di ML service. Cek console backend untuk detail error.');
      } else {
        toast.error(`${errorMessage}. Pastikan ML service berjalan di port 5000 dan backend di port 3000.`);
      }
    } finally {
      setIsDetecting(false);
    }
  };

  const handleSaveToGallery = async () => {
    if (!currentImage || !detectionResults) {
      toast.error('Tidak ada hasil deteksi untuk disimpan');
      return;
    }

    setIsSaving(true);
    try {
      const formData = new FormData();
      const response = await fetch(currentImage);
      const blob = await response.blob();
      formData.append('image', blob, 'image.jpg');
      formData.append('farmerId', user?.id || '');
      formData.append('title', saveForm.title || `Deteksi Jamur - ${new Date().toLocaleDateString('id-ID')}`);
      formData.append('description', saveForm.description);
      formData.append('baglogId', saveForm.baglogId);
      formData.append('tags', saveForm.tags);

      const res = await fetch('http://localhost:3000/api/gallery/images', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        throw new Error('Failed to save');
      }

      toast.success('Foto berhasil disimpan ke galeri!');
      setSaveDialogOpen(false);
      setSaveForm({ title: '', description: '', baglogId: 'Baglog #1', tags: '' });
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error('Gagal menyimpan ke galeri');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[#B82601]">Dashboard Monitoring</h2>
        <p className="text-[#5A4A32]">
          Pantau kondisi budidaya jamur kuping Anda secara real-time
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Suhu Saat Ini"
          value={`${latestData?.temperature.toFixed(1)}°C`}
          icon={Thermometer}
          gradientClass="gradient-teal-violet"
          iconColor="var(--primary-orange)"
          trend={{ value: '2.5% dari kemarin', isPositive: true }}
        />
        <StatCard
          title="Kelembaban Saat Ini"
          value={`${latestData?.humidity.toFixed(1)}%`}
          icon={Droplets}
          gradientClass="gradient-cyan-blue"
          iconColor="var(--primary-orange)"
          trend={{ value: '1.2% dari kemarin', isPositive: false }}
        />
        <StatCard
          title="Fase Pertumbuhan"
          value={
            detectedPhase !== null && detectionResults && detectionResults.total_detections > 0
              ? detectedPhase 
              : (latestData?.phase === 'Inokulasi' ? '-' : (latestData?.phase || '-'))
          }
          icon={Video}
          gradientClass={
            detectedPhase !== null && detectionResults && detectionResults.total_detections > 0
              ? detectedPhase.includes('Matang') 
                ? 'gradient-teal-violet' 
                : detectedPhase === 'Muda'
                ? 'gradient-orange-warm'
                : 'gradient-yellow-gold'
              : 'gradient-purple-pink'
          }
          iconColor="var(--primary-orange)"
          trend={detectionResults && detectionResults.total_detections > 0 ? {
            value: `${detectionResults.total_detections} jamur terdeteksi`,
            isPositive: true
          } : undefined}
        />
      </div>

      {/* Camera Simulation & ML Detection */}
      <Card className="autumn-card autumn-card-hover border-[#FF7A00]/10">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <CardTitle className="text-[#B82601] font-bold text-xl flex items-center gap-2">
              <Camera className="h-6 w-6" />
              Deteksi Jamur dengan AI
            </CardTitle>
            <Badge className="bg-[#B82601] text-white text-sm px-4 py-1.5 font-semibold">
              {detectionMode === 'upload' ? '📤 Upload Foto' : '📹 Live Camera'}
            </Badge>
          </div>

          {/* Mode Selection - Horizontal Layout */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pilih Mode Deteksi:</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleModeChange('upload')}
                className={`flex-1 px-5 py-4 rounded-lg text-base font-semibold transition-all flex items-center justify-center gap-3 ${
                  detectionMode === 'upload'
                    ? 'bg-[#B82601] text-white shadow-lg border-2 border-[#B82601]'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                }`}
              >
                <Upload className="h-5 w-5" />
                <span>Upload Foto</span>
              </button>
              <button
                onClick={() => handleModeChange('camera')}
                className={`flex-1 px-5 py-4 rounded-lg text-base font-semibold transition-all flex items-center justify-center gap-3 ${
                  detectionMode === 'camera'
                    ? 'bg-[#B82601] text-white shadow-lg border-2 border-[#B82601]'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-300 dark:border-gray-600'
                }`}
              >
                <Video className="h-5 w-5" />
                <span>Live Camera</span>
              </button>
            </div>
          </div>

          {/* Upload Mode Controls */}
          {detectionMode === 'upload' && (
            <div className="flex flex-wrap gap-3 mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-[#FF7A00] text-[#B82601] hover:bg-orange-50 dark:hover:bg-orange-950/30 font-semibold"
              >
                <Upload className="h-4 w-4 mr-2" />
                Pilih Foto
              </Button>
              <Button
                onClick={runDetection}
                disabled={!currentImage || isDetecting}
                className="bg-[#B82601] hover:bg-[#C83611] text-white font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDetecting ? (
                  <>
                    <Square className="h-4 w-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Camera className="h-4 w-4 mr-2" />
                    Deteksi
                  </>
                )}
              </Button>
              {detectionResults && (
                <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-2 border-green-600 text-green-700 hover:bg-green-50 dark:hover:bg-green-950/30 font-semibold"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Simpan ke Galeri
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Simpan ke Galeri Pertumbuhan</DialogTitle>
                      <DialogDescription>
                        Simpan hasil deteksi ke galeri untuk dokumentasi
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Judul</Label>
                        <Input
                          id="title"
                          value={saveForm.title}
                          onChange={(e) => setSaveForm({ ...saveForm, title: e.target.value })}
                          placeholder="Contoh: Deteksi Jamur - Hari ke-7"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Deskripsi</Label>
                        <Textarea
                          id="description"
                          value={saveForm.description}
                          onChange={(e) => setSaveForm({ ...saveForm, description: e.target.value })}
                          placeholder="Catatan tentang kondisi pertumbuhan..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="baglogId">Baglog</Label>
                          <Select
                            value={saveForm.baglogId}
                            onValueChange={(value: string) => setSaveForm({ ...saveForm, baglogId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {['Baglog #1', 'Baglog #2', 'Baglog #3', 'Baglog #4', 'Baglog #5'].map(b => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tags">Tags</Label>
                          <Input
                            id="tags"
                            value={saveForm.tags}
                            onChange={(e) => setSaveForm({ ...saveForm, tags: e.target.value })}
                            placeholder="pertumbuhan, optimal"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleSaveToGallery}
                        disabled={isSaving}
                        className="w-full bg-[#B82601] hover:bg-[#C83611] text-white font-semibold"
                      >
                        {isSaving ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {/* Camera Mode - Activation Button */}
          {detectionMode === 'camera' && !isCameraActive && (
            <div className="mb-4 p-5 bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-300 dark:border-blue-700 rounded-lg">
              <div className="text-center mb-4">
                <Video className="h-12 w-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                  Aktifkan Live Camera
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Klik tombol di bawah untuk mengaktifkan kamera laptop Anda
                </p>
              </div>
              <Button
                onClick={async () => {
                  setDetectionMode('camera');
                  await new Promise(resolve => setTimeout(resolve, 50));
                  startCamera();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg shadow-lg"
                size="lg"
                style={{ color: '#ffffff' }}
              >
                <Video className="h-6 w-6 mr-3" style={{ color: '#ffffff' }} />
                <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Aktifkan Kamera Laptop</span>
              </Button>
            </div>
          )}

          {/* Camera Active Controls */}
          {isCameraActive && (
            <div className="mb-4 p-5 bg-green-50 dark:bg-green-950/30 border-2 border-green-300 dark:border-green-700 rounded-lg">
              <div className="flex items-center justify-center gap-2 mb-4 p-3 bg-green-100 dark:bg-green-900/40 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                  Kamera Aktif - Arahkan kamera ke jamur, lalu jepret foto
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  onClick={async () => {
                    if (!videoRef.current || videoRef.current.readyState < 2) {
                      toast.error('Video belum siap. Tunggu sebentar dan coba lagi.');
                      return;
                    }
                    const captured = captureFromWebcam();
                    if (captured) {
                      toast.success('Foto berhasil diambil! Klik "Deteksi Sekarang" untuk mendeteksi jamur.');
                    } else {
                      toast.error('Gagal mengambil foto dari kamera');
                    }
                  }}
                  disabled={isDetecting}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                  size="lg"
                  style={{ color: '#ffffff' }}
                >
                  <Camera className="h-5 w-5 mr-2" style={{ color: '#ffffff' }} />
                  <span style={{ color: '#ffffff', fontWeight: 'bold' }}>Jepret Foto</span>
                </Button>
                <Button
                  onClick={async () => {
                    if (!currentImage) {
                      toast.error('Jepret foto terlebih dahulu!');
                      return;
                    }
                    runDetection();
                  }}
                  disabled={!currentImage || isDetecting}
                  className="bg-[#B82601] hover:bg-[#C83611] text-white font-semibold shadow-md"
                  size="lg"
                >
                  {isDetecting ? (
                    <>
                      <Square className="h-5 w-5 mr-2 animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <Camera className="h-5 w-5 mr-2" />
                      Deteksi Sekarang
                    </>
                  )}
                </Button>
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="border-2 border-red-500 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold bg-white dark:bg-gray-800"
                  size="lg"
                >
                  <Square className="h-5 w-5 mr-2" />
                  Matikan Kamera
                </Button>
              </div>
              {currentImage && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-700 rounded-lg text-center">
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    ✅ Foto sudah diambil. Klik "Deteksi Sekarang" untuk mendeteksi jamur.
                  </p>
                </div>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700" style={{ minHeight: '450px' }}>
            {isCameraActive ? (
              <div className="relative w-full h-full bg-black" style={{ minHeight: '450px' }}>
                {/* Live camera feed */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-contain bg-black"
                  style={{ 
                    display: 'block', 
                    width: '100%',
                    height: '100%',
                    minHeight: '450px',
                    objectFit: 'contain',
                    backgroundColor: '#000'
                  }}
                  onLoadedMetadata={() => {
                    console.log('Video metadata loaded, videoWidth:', videoRef.current?.videoWidth, 'videoHeight:', videoRef.current?.videoHeight);
                    if (videoRef.current) {
                      videoRef.current.play().catch(err => {
                        console.error('Error playing video:', err);
                      });
                    }
                  }}
                  onPlay={() => {
                    console.log('Video is playing');
                  }}
                  onError={(e) => {
                    console.error('Video error:', e);
                    toast.error('Error memuat video kamera');
                  }}
                />
                
                {/* Loading indicator */}
                {videoRef.current && videoRef.current.readyState === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10 backdrop-blur-sm">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                      <p className="text-xl font-semibold">Memuat video kamera...</p>
                      <p className="text-sm mt-2 text-gray-300">Pastikan izin kamera sudah diberikan</p>
                    </div>
                  </div>
                )}
                
                {/* Live status indicator */}
                {videoRef.current && videoRef.current.readyState >= 2 && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold z-20 shadow-lg flex items-center gap-2 animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span className="hidden sm:inline">🎥 Live</span>
                    <span className="sm:hidden">🎥</span>
                  </div>
                )}
                
                {/* Display detection results overlay on video */}
                {detectionResults && detectionResults.detections && detectionResults.detections.length > 0 && (
                  <>
                    {/* Draw bounding boxes overlay */}
                    <div className="absolute inset-0 pointer-events-none z-10">
                      {detectionResults.detections.map((det: any, idx: number) => {
                        if (!videoRef.current || !canvasRef.current) return null;
                        const video = videoRef.current;
                        
                        // Get actual video dimensions
                        const videoWidth = video.videoWidth || 640;
                        const videoHeight = video.videoHeight || 480;
                        
                        // Get display dimensions
                        const displayWidth = video.clientWidth;
                        const displayHeight = video.clientHeight;
                        
                        // Calculate scale (bbox is relative to captured image which matches video dimensions)
                        const scaleX = displayWidth / videoWidth;
                        const scaleY = displayHeight / videoHeight;
                        
                        const [x1, y1, x2, y2] = det.bbox;
                        const color = det.class === 'Primordia' ? '#eab308' : 
                                     det.class === 'Muda' ? '#f97316' : '#22c55e';
                        return (
                          <div
                            key={idx}
                            className="absolute border-3 shadow-lg"
                            style={{
                              left: `${x1 * scaleX}px`,
                              top: `${y1 * scaleY}px`,
                              width: `${(x2 - x1) * scaleX}px`,
                              height: `${(y2 - y1) * scaleY}px`,
                              borderColor: color,
                              borderWidth: '3px',
                              pointerEvents: 'none'
                            }}
                          >
                            <div 
                              className="absolute -top-7 left-0 px-2 py-1 text-xs font-bold text-white rounded shadow-md"
                              style={{ backgroundColor: color }}
                            >
                              {det.class} {(det.confidence * 100).toFixed(0)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Detection Summary Overlay for Live Camera */}
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gray-900/98 backdrop-blur-sm text-white p-4 sm:p-5 rounded-lg min-w-[200px] sm:min-w-[240px] max-w-[280px] shadow-2xl border-2 border-gray-700 z-20">
                      <p className="font-bold mb-4 text-base flex items-center gap-2 text-white">
                        <Camera className="h-5 w-5 text-white" />
                        Hasil Deteksi
                      </p>
                      {detectionResults.summary && (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center py-2 px-3 rounded bg-yellow-500/20 border border-yellow-500/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                              <span className="text-white">Primordia:</span>
                            </div>
                            <span className="font-bold text-yellow-400 text-base">{detectionResults.summary.Primordia || 0}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded bg-orange-500/20 border border-orange-500/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                              <span className="text-white">Muda:</span>
                            </div>
                            <span className="font-bold text-orange-400 text-base">{detectionResults.summary.Muda || 0}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 px-3 rounded bg-green-500/20 border border-green-500/30">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-white">Matang:</span>
                            </div>
                            <span className="font-bold text-green-400 text-base">{detectionResults.summary.Matang || 0}</span>
                          </div>
                          <div className="border-t-2 border-gray-600 mt-3 pt-3 flex justify-between items-center bg-gray-800/50 px-3 py-2 rounded">
                            <span className="font-semibold text-white">Total:</span>
                            <span className="font-bold text-xl text-blue-400">{detectionResults.total_detections || 0}</span>
                          </div>
                        </div>
                      )}
                      {(!detectionResults.summary || detectionResults.total_detections === 0) && (
                        <div className="text-center py-4">
                          <p className="text-yellow-400 text-sm font-semibold">⚠️ Tidak ada jamur terdeteksi</p>
                          <p className="text-xs text-gray-300 mt-2">
                            Coba foto dengan pencahayaan lebih baik
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : currentImage ? (
              <div className="relative w-full h-full bg-black" style={{ minHeight: '450px' }}>
                {/* Display image with detections */}
                <img
                  src={detectionResults?.image_with_detections ? 
                    `data:image/jpeg;base64,${detectionResults.image_with_detections}` : 
                    currentImage}
                  alt="Mushroom detection"
                  className="w-full h-full object-contain"
                  style={{ minHeight: '450px' }}
                />
                
                {/* Draw bounding boxes overlay if we have detections but no annotated image */}
                {detectionResults && detectionResults.detections && detectionResults.detections.length > 0 && !detectionResults.image_with_detections && (
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {detectionResults.detections.map((det: any, idx: number) => {
                      const [x1, y1, x2, y2] = det.bbox;
                      const color = det.class === 'Primordia' ? '#eab308' : 
                                   det.class === 'Muda' ? '#f97316' : '#22c55e';
                      return (
                        <div
                          key={idx}
                          className="absolute border-3 shadow-lg"
                          style={{
                            left: `${x1}px`,
                            top: `${y1}px`,
                            width: `${x2 - x1}px`,
                            height: `${y2 - y1}px`,
                            borderColor: color,
                            borderWidth: '3px',
                            pointerEvents: 'none'
                          }}
                        >
                          <div 
                            className="absolute -top-7 left-0 px-2 py-1 text-xs font-bold text-white rounded shadow-md"
                            style={{ backgroundColor: color }}
                          >
                            {det.class} {(det.confidence * 100).toFixed(0)}%
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                {/* Detection Summary Overlay */}
                {detectionResults && (
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-gray-900/98 backdrop-blur-sm text-white p-4 sm:p-5 rounded-lg min-w-[200px] sm:min-w-[240px] max-w-[280px] shadow-2xl border-2 border-gray-700 z-20">
                    <p className="font-bold mb-4 text-base flex items-center gap-2 text-white">
                      <Camera className="h-5 w-5 text-white" />
                      Hasil Deteksi
                    </p>
                    {detectionResults.summary && (
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-2 px-3 rounded bg-yellow-500/20 border border-yellow-500/30">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                            <span className="text-white">Primordia:</span>
                          </div>
                          <span className="font-bold text-yellow-400 text-base">{detectionResults.summary.Primordia || 0}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 rounded bg-orange-500/20 border border-orange-500/30">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <span className="text-white">Muda:</span>
                          </div>
                          <span className="font-bold text-orange-400 text-base">{detectionResults.summary.Muda || 0}</span>
                        </div>
                        <div className="flex justify-between items-center py-2 px-3 rounded bg-green-500/20 border border-green-500/30">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-white">Matang:</span>
                          </div>
                          <span className="font-bold text-green-400 text-base">{detectionResults.summary.Matang || 0}</span>
                        </div>
                        <div className="border-t-2 border-gray-600 mt-3 pt-3 flex justify-between items-center bg-gray-800/50 px-3 py-2 rounded">
                          <span className="font-semibold text-white">Total:</span>
                          <span className="font-bold text-xl text-blue-400">{detectionResults.total_detections || 0}</span>
                        </div>
                      </div>
                    )}
                    {(!detectionResults.summary || detectionResults.total_detections === 0) && (
                      <div className="text-center py-4">
                        <p className="text-yellow-400 text-sm font-semibold">⚠️ Tidak ada jamur terdeteksi</p>
                        <p className="text-xs text-gray-300 mt-2">
                          Coba foto dengan pencahayaan lebih baik
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-800" style={{ minHeight: '450px' }}>
                <div className="text-center p-8 max-w-md">
                  {detectionMode === 'camera' ? (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                        <Video className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Mode Live Camera</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Klik tombol "Aktifkan Kamera Laptop" di atas untuk memulai</p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-sm text-blue-800 dark:text-blue-300 font-semibold mb-2">
                          💡 Setelah kamera aktif:
                        </p>
                        <ul className="text-xs text-blue-700 dark:text-blue-400 text-left space-y-1">
                          <li>• Jepret foto dari kamera laptop</li>
                          <li>• Klik "Deteksi Sekarang" untuk mendeteksi jamur</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                        <Upload className="h-10 w-10 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Mode Upload Foto</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Klik tombol "Pilih Foto" di atas untuk mengupload gambar</p>
                      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                        <p className="text-sm text-orange-800 dark:text-orange-300 font-semibold mb-2">
                          💡 Tips untuk hasil optimal:
                        </p>
                        <p className="text-xs text-orange-700 dark:text-orange-400 text-center">
                          Upload foto dengan pencahayaan yang baik dan fokus yang jelas
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {/* Hidden canvas for webcam capture */}
            <canvas ref={canvasRef} className="hidden" />
          </div>
          
          {/* Detection Details */}
          {detectionResults && detectionResults.detections && detectionResults.detections.length > 0 && (
            <div className="mt-6 p-5 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-orange-950/20 rounded-xl border-2 border-orange-200 dark:border-orange-800 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Camera className="h-5 w-5 text-[#B82601]" />
                <p className="font-bold text-lg text-[#B82601]">Detail Deteksi</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detectionResults.detections.map((det: any, idx: number) => {
                  const getBadgeStyle = () => {
                    if (det.class === 'Primordia') {
                      return { backgroundColor: '#eab308', color: '#ffffff' }; // yellow-500
                    } else if (det.class === 'Muda') {
                      return { backgroundColor: '#f97316', color: '#ffffff' }; // orange-500
                    } else {
                      return { backgroundColor: '#22c55e', color: '#ffffff' }; // green-500
                    }
                  };
                  
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <Badge 
                          className="border-transparent hover:opacity-90 font-semibold px-3 py-1"
                          style={getBadgeStyle()}
                        >
                          {det.class}
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Confidence: <span className="font-semibold text-gray-800 dark:text-gray-200">{(det.confidence * 100).toFixed(1)}%</span>
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-[#B82601] dark:text-orange-400">
                        {det.harvest_days > 0 ? `Panen: +${det.harvest_days} hari` : 'Siap Panen!'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <span>
                <span className="font-semibold">AI Computer Vision</span> mendeteksi fase pertumbuhan dan kondisi kesehatan jamur secara otomatis
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SensorChart
          data={sensorData}
          title="Grafik Suhu Real-Time"
          showTemperature={true}
          showHumidity={false}
        />
        <SensorChart
          data={sensorData}
          title="Grafik Kelembaban Real-Time"
          showTemperature={false}
          showHumidity={true}
        />
      </div>

      {/* Historical Data Section */}
      <Card className="autumn-card autumn-card-hover border-[#FF7A00]/10">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-autumn-hero flex items-center justify-center autumn-shadow">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-xl text-[#B82601] font-bold">Grafik Historis (Custom Range)</CardTitle>
              <p className="text-sm text-[#5A4A32] mt-1">Pilih rentang tanggal untuk melihat data historis suhu dan kelembaban</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Date Range Picker */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-gradient-to-r from-[#FF7A00]/5 to-[#E8A600]/5 rounded-xl border border-[#FF7A00]/10">
            <div className="flex-1">
              <label className="text-sm font-semibold text-[#B82601] mb-2 block">Tanggal Mulai</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-medium border-[#FF7A00]/20 hover:border-[#FF7A00] hover:bg-[#FF7A00]/5"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#FF7A00]" />
                    {startDate ? format(startDate, 'dd MMMM yyyy', { locale: id }) : 'Pilih tanggal'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={(date: Date) => date > new Date() || (endDate ? date > endDate : false)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1">
              <label className="text-sm font-semibold text-[#B82601] mb-2 block">Tanggal Akhir</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-medium border-[#FF7A00]/20 hover:border-[#FF7A00] hover:bg-[#FF7A00]/5"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#FF7A00]" />
                    {endDate ? format(endDate, 'dd MMMM yyyy', { locale: id }) : 'Pilih tanggal'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date: Date) => date > new Date() || (startDate ? date < startDate : false)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleApplyDateFilter}
                className="gradient-autumn-cta text-white hover-lift autumn-glow font-semibold w-full md:w-auto px-8"
                disabled={!startDate || !endDate}
              >
                Tampilkan Grafik
              </Button>
            </div>
          </div>

          {/* Historical Chart */}
          {startDate && endDate && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-4 p-3 bg-[#E8A600]/10 rounded-lg border border-[#E8A600]/20">
                <p className="text-sm font-semibold text-[#5A4A32]">
                  Menampilkan data dari <span className="text-[#B82601]">{format(startDate, 'dd MMM yyyy', { locale: id })}</span> hingga <span className="text-[#B82601]">{format(endDate, 'dd MMM yyyy', { locale: id })}</span>
                </p>
                <Badge className="bg-[#9A7400] text-white font-semibold">
                  {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} hari
                </Badge>
              </div>
              <SensorChart
                data={historicalData}
                title="Grafik Suhu & Kelembaban Historis"
                showTemperature={true}
                showHumidity={true}
              />
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};
