// Web Audio API Synthesizer playing a gentle Javanese Slendro/Pelog romantic melody

class JavaneseGamelanPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;

  // Traditional Javanese Slendro-inspired warm frequencies (Hz)
  // Soft metallophone / gender barung register
  private melody = [
    293.66, // D4 (Barang)
    329.63, // E4 (Gulu)
    392.00, // G4 (Dada)
    440.00, // A4 (Lima)
    523.25, // C5 (Nem)
    440.00, // A4
    392.00, // G4
    329.63, // E4
    293.66, // D4
    261.63, // C4
    293.66, // D4
    392.00, // G4
    329.63, // E4
    440.00, // A4
    392.00, // G4
    293.66, // D4
  ];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      this.playNextNote();
      this.timerId = window.setInterval(() => {
        if (this.isPlaying) {
          this.playNextNote();
        }
      }, 1150);
    } catch {
      // Fallback if audio context is blocked
      this.isPlaying = false;
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getPlayingState(): boolean {
    return this.isPlaying;
  }

  private playNextNote() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const freq = this.melody[this.step % this.melody.length];

    // Primary resonant sine wave (Gender / Bonang tone)
    const osc = this.ctx.createOscillator();
    const overtone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const overtoneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle bell harmonic
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2.75, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 2.1);

    overtoneGain.gain.setValueAtTime(0.001, now);
    overtoneGain.gain.exponentialRampToValueAtTime(0.012, now + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.7);

    osc.connect(gain);
    overtone.connect(overtoneGain);
    gain.connect(this.ctx.destination);
    overtoneGain.connect(this.ctx.destination);

    osc.start(now);
    overtone.start(now);
    osc.stop(now + 2.15);
    overtone.stop(now + 0.75);

    // Every 4th beat, play a deep soft Gong / Kenong bass note
    if (this.step % 4 === 0) {
      const gongOsc = this.ctx.createOscillator();
      const gongGain = this.ctx.createGain();
      gongOsc.type = 'sine';
      gongOsc.frequency.setValueAtTime(freq * 0.5, now);

      gongGain.gain.setValueAtTime(0.001, now);
      gongGain.gain.exponentialRampToValueAtTime(0.04, now + 0.12);
      gongGain.gain.exponentialRampToValueAtTime(0.0005, now + 3.4);

      gongOsc.connect(gongGain);
      gongGain.connect(this.ctx.destination);
      gongOsc.start(now);
      gongOsc.stop(now + 3.5);
    }

    this.step++;
  }
}

export const gamelanPlayer = new JavaneseGamelanPlayer();
