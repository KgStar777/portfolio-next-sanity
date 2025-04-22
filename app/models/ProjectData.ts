export interface ProjectData {
  title: string;
  titleRu: string;
  overview: string;
  overviewRu: string;
  link: string;
  _id: string;
  name: string;
  imageUrl: string;
}

export interface ProjectDataWuithGallery extends Omit<ProjectData, "imageUrl"> {
  imageUrl: string[];
  github: string;
  gallery: {
    images: Array<{
      _type: string
      _key: string
      asset: {
        url: string
      },
    }>,
  }
}