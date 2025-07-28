import { ConvertPercentPipe } from './convert-percent.pipe';
import { FormatDatePipe } from './format-date.pipe';
import { FormatTimePipe } from './format-time.pipe';
import { SafeYoutubeUrlPipe } from './safe-youtube-url.pipe';

export const pipes = [
  FormatDatePipe,
  FormatTimePipe,
  ConvertPercentPipe,
  SafeYoutubeUrlPipe,
];
