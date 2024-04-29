import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'STL AngularPrimeSniper';

  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer2', { static: false }) videoPlayer2!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer3', { static: false }) videoPlayer3!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer4', { static: false }) videoPlayer4!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer5', { static: false }) videoPlayer5!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer6', { static: false }) videoPlayer6!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer7', { static: false }) videoPlayer7!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer8', { static: false }) videoPlayer8!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer9', { static: false }) videoPlayer9!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer10', { static: false }) videoPlayer10!: ElementRef<HTMLVideoElement>;
  @ViewChild('videoPlayer11', { static: false }) videoPlayer11!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    this.playVideos(
      this.videoPlayer,
      this.videoPlayer2,
      this.videoPlayer3,
      this.videoPlayer4,
      this.videoPlayer5,
      this.videoPlayer6,
      this.videoPlayer7,
      this.videoPlayer8,
      this.videoPlayer9,
      this.videoPlayer10,
      this.videoPlayer11
    );
  }

  private playVideos(...players: ElementRef<HTMLVideoElement>[]) {
    players.forEach(player => {
      if (player) {
        // Mute the video permanently
        player.nativeElement.muted = true;
        this.addVideoEndedListener(player);
        player.nativeElement.play();
      }
    });
  }


  private addVideoEndedListener(player: ElementRef<HTMLVideoElement>) {
    player.nativeElement.addEventListener('ended', () => {
      player.nativeElement.play();
    });
  }
}

