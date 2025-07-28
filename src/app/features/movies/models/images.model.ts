export interface MovieImage {
  aspect_ratio: number;
  file_path: string;
  height: number;
  width: number;
}

export interface MovieImagesResponse {
  backdrops: MovieImage[];
  posters: MovieImage[];
  id: string;
}
